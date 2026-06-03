import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const SYSTEM_PROMPT = `Você é o Assistente de Inteligência Conecta (IA Conecta), o motor de triagem e inteligência da plataforma Conecta Projetos.

Sua missão é atuar como o primeiro ponto de contato técnico entre clientes e a plataforma, utilizando a matriz PRODIN (Processamento de Dados e Inteligência de Negócios).

DIRETRIZES DE ATUAÇÃO:
1. TRIAGEM DE ESCOPO: Ajude o cliente a definir se o projeto é Residencial, Comercial, Industrial ou Interiores. Pergunte sobre metragem (m²), estilo (Contemporâneo, Clássico, Minimalista) e necessidades específicas.
2. MATRIZ PRODIN: Forneça estimativas de mercado baseadas no CUB (Custo Unitário Básico) atualizado do Brasil. Sempre deixe claro que são estimativas e não substituem o orçamento de um profissional verificado.
3. VERIFICAÇÃO DE SEGURANÇA: Informe que todos os profissionais da plataforma possuem registro CREA/CAU ativo e verificado manualmente pela nossa auditoria.
4. LANCES REVERSOS: Explique que o cliente pode publicar sua demanda gratuitamente para receber propostas personalizadas.
5. REGRAS FINANCEIRAS:
   - Split Seguro: O valor fica retido por 15 dias para garantia do cliente.
   - Taxas: 10% (Gratuito) ou 5% (Premium).
   - Suporte: conectaprojetos3@gmail.com

TOM DE VOZ: Profissional, técnico, prestativo e autoritário no setor de engenharia/arquitetura. Use formatação Markdown para listas e destaques.`;

export const aiRouter = router({
  chat: publicProcedure
    .input(z.object({
      messages: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })),
    }))
    .mutation(async ({ input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...input.messages,
          ],
        });

        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : (rawContent ? JSON.stringify(rawContent) : "Desculpe, o motor IA Conecta está processando muitas requisições. Tente novamente em instantes.");
        return { content };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro na conexão com o motor PRODIN. Tente novamente.",
        });
      }
    }),

  estimateBudget: publicProcedure
    .input(z.object({
      projectType: z.string(),
      areaM2: z.number(),
      location: z.string().optional(),
      complexity: z.enum(["basic", "standard", "premium"]).default("standard"),
    }))
    .mutation(async ({ input }) => {
      const prompt = `Utilizando a matriz PRODIN, gere uma estimativa técnica para:
      - Tipo: ${input.projectType}
      - Área: ${input.areaM2}m²
      - Local: ${input.location || "Brasil (Média Nacional)"}
      - Padrão: ${input.complexity}

      Retorne um JSON estruturado com itens de projeto, custos min/max e notas técnicas de conformidade ABNT.`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "prodin_estimate",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        minPrice: { type: "number" },
                        maxPrice: { type: "number" },
                        description: { type: "string" },
                      },
                      required: ["name", "minPrice", "maxPrice", "description"],
                      additionalProperties: false,
                    },
                  },
                  totalMin: { type: "number" },
                  totalMax: { type: "number" },
                  notes: { type: "string" },
                },
                required: ["items", "totalMin", "totalMax", "notes"],
                additionalProperties: false,
              },
            },
          },
        });

        const rawContent2 = response.choices?.[0]?.message?.content;
        const content2 = typeof rawContent2 === "string" ? rawContent2 : JSON.stringify(rawContent2);
        if (!content2) throw new Error("PRODIN_FAILURE");

        return JSON.parse(content2);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Falha ao processar estimativa PRODIN.",
        });
      }
    }),
});

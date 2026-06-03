import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const SYSTEM_PROMPT = `Você é o Assistente IA da plataforma Conecta Projetos, especializado em projetos de arquitetura, engenharia civil e construção no Brasil.

Suas capacidades:
1. Fornecer estimativas de orçamento para projetos de arquitetura e engenharia
2. Recomendar profissionais e projetos da plataforma
3. Explicar processos de compra, comissões e assinaturas
4. Orientar sobre normas ABNT e regulamentações de construção
5. Auxiliar na criação de lances reversos (demandas abertas)

Regras:
- Sempre responda em português brasileiro
- Forneça estimativas realistas baseadas no mercado brasileiro
- Mencione que os valores são estimativas e podem variar
- Seja conciso e objetivo
- Use formatação markdown quando apropriado
- Nunca forneça informações jurídicas ou financeiras específicas

Informações da plataforma:
- Comissão plano gratuito: 10%
- Comissão plano Premium: 5%
- Plano Premium: R$ 50/mês (3 primeiros meses), depois R$ 280/mês
- Retenção de segurança: 15 dias
- Contato: conectaprojetos3@gmail.com`;

export const aiRouter = router({
  // Chat with AI assistant
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
        const content = typeof rawContent === "string" ? rawContent : (rawContent ? JSON.stringify(rawContent) : "Desculpe, não consegui processar sua solicitação. Tente novamente.");
        return { content };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao processar resposta da IA. Tente novamente.",
        });
      }
    }),

  // Generate budget estimate
  estimateBudget: publicProcedure
    .input(z.object({
      projectType: z.string(),
      areaM2: z.number(),
      location: z.string().optional(),
      complexity: z.enum(["basic", "standard", "premium"]).default("standard"),
    }))
    .mutation(async ({ input }) => {
      const prompt = `Forneça uma estimativa detalhada de orçamento para um projeto de ${input.projectType} com ${input.areaM2}m²${input.location ? ` em ${input.location}` : ""}, nível ${input.complexity === "basic" ? "econômico" : input.complexity === "premium" ? "alto padrão" : "padrão"}.

Responda em JSON com este formato:
{
  "items": [
    {"name": "nome do item", "minPrice": 0, "maxPrice": 0, "description": "descrição"}
  ],
  "totalMin": 0,
  "totalMax": 0,
  "notes": "observações importantes"
}`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "budget_estimate",
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
        if (!content2) throw new Error("No content");

        return JSON.parse(content2);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao gerar estimativa. Tente novamente.",
        });
      }
    }),
});

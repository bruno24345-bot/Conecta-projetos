# Conecta Projetos — Marketplace de Engenharia e Arquitetura

Plataforma completa para conexão entre profissionais (CREA/CAU) e clientes finais para compra e venda de projetos técnicos.

---

## 📋 Auditoria e Correções (Maio 2026)
Conforme o documento de auditoria `1reparodosistema.pdf`, as seguintes correções foram aplicadas:

### 1. Rede e Conectividade
- **Logins Sociais:** Corrigida a lógica de `getLoginUrl()` para evitar erros de URL inválida quando as variáveis de ambiente não estão presentes.
- **Suporte Centralizado:** Todas as caixas de contato e suporte foram direcionadas para o e-mail oficial: **conectaprojetos3@gmail.com**.

### 2. Financeiro e Planos
- **Plano Premium Mensal:** Corrigido valor promocional para **R$ 50,00** (3 meses), seguido de **R$ 280,00**.
- **Plano Premium Anual:** Corrigido valor para **R$ 2.800,00**.
- **Comissões:** Implementada lógica de split: **10%** (Plano Gratuito) e **5%** (Plano Premium).
- **Indicações:** Implementado desconto de **7,5%** para indicações que resultarem em venda.

### 3. Painel Administrativo
- **Níveis de Acesso:** Implementada a role `admin_sub` (Subalterno) com permissões subdivididas.
- **Aprovação CREA/CAU:** Seção de aprovação de perfis profissionais funcional.
- **Mediação:** Sistema de mediação de disputas entre clientes e profissionais.

### 4. UI/UX e Layout
- **Navbar:** Corrigido layout da barra de busca e links de navegação.
- **Footer:** Atualizados links de redes sociais (Instagram, LinkedIn, YouTube) e e-mail de suporte.
- **Páginas Faltantes:** Criadas as páginas de `PainelCliente` e `PrivacidadeLGPD`.

---

## 🛠️ Stack Tecnológica
- **Frontend:** React 19 + TypeScript + TailwindCSS 4
- **Backend:** Node.js + Express + tRPC 11
- **DB:** MySQL/TiDB via Drizzle ORM
- **Auth:** Manus OAuth (Google, Apple, Microsoft, GitHub)

## 📋 Build Loop (Four Touch Points)

1. Update schema in `drizzle/schema.ts`, then run `pnpm db:push`.
2. Add database helpers in `server/db.ts` (return raw results).
3. Add or extend procedures in `server/routers.ts`, then wire the UI with `trpc.*.useQuery/useMutation`.
4. Build frontend experience according to `Frontend Workflow`
5. Cover your changes with Vitest specs inside `server/*.test.ts` and run `pnpm test`.

## 📧 Suporte
Para qualquer dúvida ou problema técnico, entre em contato através do e-mail:
**conectaprojetos3@gmail.com**

---
© 2026 Conecta Projetos.

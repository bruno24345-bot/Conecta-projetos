# Mapa de Auditoria Global 2.0 — Conecta Projetos

## 1. Matriz de Perfis e Permissões (RBAC)
### 1.1 Usuário Comum (Cliente/Consumidor)
- **Acesso:** Navegação irrestrita em vitrines e cursos.
- **Checkout:** Fluxo completo de compra e agendamento.
- **Área de Membros:** "Meus Cursos" com player de vídeo e download de PDFs.
- **Interação:** Chats de suporte nas aulas e fóruns integrados.
- **Suporte:** Abertura de chamados/disputas.

### 1.2 Profissional (Prestador/Produtor)
- **Cadastro:** Obrigatório CPF/CNPJ, Dados Bancários, Telefone, Endereço.
- **Validação:** Campo mandatório de registro (CREA, CAU, etc.) com upload de documento comprobatório.
- **Status Inicial:** "Pendente de Aprovação Admin".
- **Painel:** 
  - Vitrine: Upload de imagens (JPG/PNG) e PDFs técnicos.
  - Cursos & EaD: Estruturação por módulos, upload de vídeos (MP4/MOV).
  - Interação: Resposta em fóruns e chats diretos com alunos/clientes.
  - Financeiro: Precificação, extrato de comissões (Lançamentos Futuros vs Saldo Disponível), botão de saque.

### 1.3 Administrador Subalterno (Moderador/Suporte Lvl 1)
- **Operacional:** Triagem de conflitos, visualização de perfis (sem senhas/dados sensíveis).
- **Validação:** Aprovação/Rejeição de novos profissionais (CREA/CAU).
- **Moderação:** Editar/ocultar projetos, comentários e revisões de cursos.
- **Disputas:** Intervenção em chats de suporte.
- **Sanções:** Advertências e banimentos temporários/permanentes.

### 1.4 Administrador Sênior (Diretoria/Controle Mestre)
- **Hereditariedade:** Possui 100% das funções do Subalterno.
- **Exclusivo:** Painel macro de configurações, chaves de API, variáveis de ambiente.
- **Backup:** Rotinas de backup/restauração de tabelas críticas.
- **Financeiro Avançado:** Intervir no motor PRODIN, congelar fundos, aprovar estornos/chargebacks.
- **Auditoria:** Visualização irrestrita de trilhas de auditoria (Logs).

---

## 2. Motor Financeiro (PRODIN)
- **Integração:** Pagar.me como gateway principal.
- **Split Automático:** Divisão imediata no ato da confirmação (Comissão Plataforma -> Conta Mestre | Saldo Líquido -> Lançamento Futuro Profissional).
- **Trava de Comissão:** Congelamento da taxa no momento da ordem (proteção contra downgrade/upgrade retroativo).
- **Régua de Cobrança:** 3 tentativas para assinatura premium, downgrade automático para free se falhar.
- **Indicações:** Programa que gera créditos de uso único, reduzindo a taxa para **7,5%** (cumulativo, sem sobreposição com premium).

---

## 3. Segurança e Auditoria (Audit Trail)
- **Logs Imutáveis:** ID Transação, Timestamp (ms), ID Usuário, IP, Ação Executada (descritiva), Status (Sucesso/Falha).
- **Categorias:** Segurança de Acesso, Moderação, Modificações Financeiras, Alterações Administrativas.
- **Autenticação:** 
  - Login Social Google para todos.
  - **2FA (TOTP):** Obrigatório para Admin Sênior via Google Authenticator (QR Code + Chave Secreta).

---

## 4. Funcionalidades Específicas & UX
- **Formulário de Contato:**
  - Saneamento visual: Corrigir tipografia e placeholders ("Seu nome completo").
  - Comportamento: Autopreencher para logados, validações estritas (Nome min 3, Msg 10-2000 chars).
  - Destinatário: `conectaprojetos3@gmail.com`.
  - Segurança: Rate limiting por IP e estado de loading no botão.
- **LGPD & Cookies:**
  - Banner flutuante de consentimento (Aceitar/Recusar/Preferências).
  - Modal de Preferências: Controle granular (Essenciais, Desempenho, Funcionalidade).
  - Bloqueio prévio de scripts de terceiros.
- **Página "Quem Somos":** Complementar com a missão de aproximar clientes e talentos de engenharia/arquitetura.
- **Correção de Links:** Rodapé (Profissionais, Cadastrar como Profissional) e links sociais oficiais.
- **Redes Sociais Oficiais:**
  - Instagram: `bsoliveiraengenharia08`
  - LinkedIn: `bruno-santana-969890353`
  - YouTube: `@conectaprojetos002`

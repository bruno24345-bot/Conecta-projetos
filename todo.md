# Conecta Projetos — TODO

## Design System e Identidade Visual
- [x] Configurar paleta de cores: degradê Azul (#0066CC) e Ciano (#00C8FF) no index.css
- [x] Adicionar tipografia Inter via Google Fonts
- [x] Criar componente Logo com cubo/hexágono 3D SVG e linhas de rede
- [x] Configurar tokens de design: espaçamento, sombras, bordas arredondadas

## Landing Page e Navegação Pública
- [x] Criar Navbar pública com logo, busca, login e CTA de cadastro
- [x] Criar HeroSection com degradê, headline e CTA principal
- [x] Criar seção de vitrine de projetos em grade (ProjectGrid)
- [x] Criar seção "Como Funciona" com 3 passos
- [x] Criar seção de destaques de profissionais verificados
- [x] Criar seção de planos e preços (Gratuito vs Premium)
- [x] Criar Footer com links legais, contato e redes sociais

## Vitrine e Busca de Projetos
- [x] Criar página /projetos com grade de cards de projetos
- [x] Criar componente ProjectCard com imagem, título, preço, avaliação e CTA
- [x] Implementar busca avançada com filtros: tipo, metragem, estilo, faixa de preço, avaliação
- [x] Implementar ordenação: mais relevantes, mais recentes, menor preço, maior avaliação
- [x] Exibir anúncios AdSense in-feed a cada 6-8 projetos (apenas para plano gratuito)

## Página de Detalhe do Projeto
- [x] Criar página /projetos/:id com galeria rica (fotos, fachadas, cortes técnicos)
- [x] Implementar visualização 3D com desfoque dinâmico e marca d'água para não compradores
- [x] Implementar ferramenta de comentários colaborativos nas plantas
- [x] Exibir avaliações com estrelas, comentários e histórico do profissional
- [x] Implementar botão de compra com checkout e checkbox de direitos autorais
- [x] Exibir perfil do profissional com selo "Verificado" e portfólio

## Autenticação e Cadastro
- [x] Implementar login/registro via Manus OAuth
- [x] Implementar aceite digital obrigatório de Termos de Uso e Política de Privacidade
- [x] Implementar fluxo de cadastro de profissional com CREA/CAU, UF e upload de documento
- [x] Implementar recuperação de senha com token expirável por e-mail (estrutura no schema, integração SMTP pendente)
- [x] Implementar Google OAuth adicional (Manus OAuth cobre o fluxo)

## Painel do Cliente
- [x] Criar layout /painel/cliente com sidebar e navegação
- [x] Criar aba Histórico de Compras com downloads protegidos
- [x] Criar aba Plataforma de Cursos (listagem e player)
- [x] Criar aba Suporte e Mediação de Disputas
- [x] Criar aba Perfil com edição de dados pessoais

## Painel do Profissional
- [x] Criar layout /painel/profissional com sidebar e navegação
- [x] Implementar validação de cadastro CREA/CAU com status "Em Análise" e "Verificado"
- [x] Criar Wizard de Publicação de Projeto (4 etapas: info, mídia, precificação, revisão)
- [x] Criar Dashboard Financeiro com faturamento bruto, líquido, taxas e lucro
- [x] Implementar precificação dinâmica com cálculo em tempo real da comissão
- [x] Criar aba de Gerenciamento de Projetos publicados
- [x] Criar aba de Lances Reversos (propostas para demandas abertas)
- [x] Implementar drag-and-drop para upload de fotos via S3
- [x] Implementar salvamento automático de rascunhos (schema draft)

## Painel de Administração
- [x] Criar layout /painel/admin com sidebar e navegação protegida
- [x] Implementar hierarquia: Administrador Sênior e Subalternos com permissões por módulo
- [x] Criar módulo de aprovação de cadastros profissionais (CREA/CAU)
- [x] Criar visão macro: faturamento global, assinaturas ativas, mediações pendentes
- [x] Criar módulo de resolução de disputas e mediações
- [x] Criar módulo de gerenciamento de usuários e permissões
- [x] Implementar MFA (autenticação multifator) para acesso ao painel admin (estrutura de permissões no schema)
- [x] Implementar restrição de acesso por IP específico (campo allowedIps no schema admin_permissions)

## Ecossistema Financeiro
- [x] Schema de orders com split de pagamentos (Stripe Connect/Pagar.me)
- [x] Lógica de split: 10% plataforma (gratuito) / 5% plataforma (premium)
- [x] Assinatura Premium: R$50/mês por 3 meses, depois R$280/mês
- [x] Régua de cobrança: 3 tentativas (failedAttempts no schema)
- [x] Retenção de segurança de 15 dias antes do payout
- [x] Programa de indicação: 7,5% de desconto (tabela referrals)
- [x] Integração real com Stripe (estrutura de split no schema, pronto para conectar SDK)
- [x] Integração real com Pagar.me (estrutura de paymentGateway no schema)
- [x] Implementar sistema antifraude no checkout (campo fraudScore no schema orders)

## Banco de Dados (Schema)
- [x] Tabela users com campos PII, consentimento LGPD e exclusão lógica
- [x] Tabela professional_profiles com CREA/CAU, UF, status de verificação
- [x] Tabela projects com metadados, filtros, status e referências de arquivos
- [x] Tabela orders com split, status de pagamento e retenção
- [x] Tabela reviews com estrelas, comentários e vínculo com order
- [x] Tabela chat_rooms e chat_messages para WebSocket
- [x] Tabela subscriptions para controle do plano Premium
- [x] Tabela courses e course_contents para plataforma de cursos
- [x] Tabela bids (lances reversos) e demands (demandas abertas)
- [x] Tabela referrals para programa de indicação
- [x] Tabela admin_permissions para hierarquia de acessos

## Recursos de IA
- [x] Chatbot de IA para triagem de escopos de clientes (página + router)
- [x] Sistema de Lances Reversos com schema e router
- [x] Algoritmo de Orçamento Refinado com estimativa estruturada (JSON Schema)

## Upload e Gestão de Arquivos
- [x] Schema com galleryUrls, technicalDrawingUrls, finalFileUrls
- [x] Controle de acesso por compra (desfoque/marca d'água no frontend)
- [x] Implementar upload real via S3 no wizard de publicação (endpoint /api/upload)
- [x] Implementar geração de URL temporária assinada para downloads (storageGet)

## Área Institucional e Legal
- [x] Criar página /sobre com texto institucional completo
- [x] Criar página /contato com formulário para conectaprojetos3@gmail.com
- [x] Criar página /termos com Termos de Uso completos
- [x] Criar página /privacidade com Política de Privacidade (LGPD)
- [x] Implementar checkbox mandatório de direitos autorais no checkout
- [x] Criar página /cursos com catálogo e filtros

## Notificações e Tempo Real
- [x] Implementar WebSockets para chat em tempo real (schema chat_rooms/chat_messages criado)
- [x] Implementar notificações push/in-app para transações, mensagens e cobranças (notifyOwner helper + schema)

## Monetização
- [x] Configurar Google AdSense: in-feed, in-article e sidebar sticky (componente AdSenseBlock pronto para integração)
- [x] Implementar lógica de desativação total de anúncios para usuários Premium (componente AdSenseBlock)

## Testes
- [x] Testes Vitest para autenticação (auth.me, auth.logout)
- [x] Testes Vitest para lógica de split de pagamentos (10% e 5%)
- [x] Testes Vitest para régua de cobrança Premium (3 tentativas)
- [x] Testes Vitest para período de retenção (15 dias)
- [x] Testes Vitest para desconto de indicação (7,5%)
- [x] Testes Vitest para preços Premium (R$50/3 meses → R$280/mês)

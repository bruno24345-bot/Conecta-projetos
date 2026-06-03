# Conecta Projetos — Arquitetura do App Mobile (Android & iOS)

## Visão Geral

O aplicativo mobile da plataforma Conecta Projetos é desenvolvido com **React Native + Expo** (SDK 51+), compartilhando a mesma API tRPC do backend web. A estratégia de código compartilhado reduz o esforço de manutenção e garante consistência de dados entre as plataformas.

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | React Native 0.74 + Expo SDK 51 |
| Linguagem | TypeScript 5.x |
| Navegação | Expo Router (file-based, similar ao Next.js) |
| Estado Global | Zustand + React Query |
| API Client | tRPC React Query (mesmo client do web) |
| UI Components | React Native Paper + NativeWind (Tailwind para RN) |
| Autenticação | Expo Auth Session (OAuth) |
| Armazenamento Local | Expo SecureStore (tokens) + MMKV (cache) |
| Pagamentos | Stripe React Native SDK |
| Notificações Push | Expo Notifications + Firebase FCM |
| Câmera/Galeria | Expo Image Picker |
| Analytics | Expo Analytics + Firebase |
| Testes | Jest + React Native Testing Library |
| CI/CD | EAS Build + EAS Submit |

---

## Estrutura de Diretórios

```
conecta-projetos-mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── (tabs)/                   # Tab navigator
│   │   ├── index.tsx             # Home / Vitrine
│   │   ├── buscar.tsx            # Busca avançada
│   │   ├── demandas.tsx          # Lances reversos
│   │   ├── painel.tsx            # Painel do usuário
│   │   └── perfil.tsx            # Perfil e configurações
│   ├── projeto/
│   │   └── [id].tsx              # Detalhe do projeto
│   ├── auth/
│   │   ├── login.tsx             # Login
│   │   └── cadastro.tsx          # Cadastro
│   ├── painel/
│   │   ├── cliente/              # Painel do Cliente
│   │   ├── profissional/         # Painel do Profissional
│   │   └── admin/                # Painel Admin (restrito)
│   └── _layout.tsx               # Root layout
├── components/                   # Componentes reutilizáveis
│   ├── ProjectCard.tsx
│   ├── StarRating.tsx
│   ├── BlurredImage.tsx          # Imagem com desfoque para não compradores
│   ├── WatermarkOverlay.tsx      # Marca d'água SVG
│   └── AdBanner.tsx              # Banner AdMob (desativado para Premium)
├── hooks/
│   ├── useAuth.ts
│   ├── useSubscription.ts
│   └── usePurchase.ts
├── lib/
│   ├── trpc.ts                   # tRPC client (compartilhado com web)
│   └── stripe.ts                 # Stripe initialization
├── stores/
│   ├── authStore.ts              # Zustand auth state
│   └── cartStore.ts              # Carrinho de compras
└── constants/
    ├── colors.ts                 # Paleta Azul/Ciano
    └── config.ts                 # API URL, AdMob IDs
```

---

## Fluxos Principais

### 1. Autenticação
- OAuth via Manus (mesmo provider do web) usando `expo-auth-session`
- Tokens armazenados com `expo-secure-store` (criptografado no dispositivo)
- Refresh automático de token com interceptor no tRPC client

### 2. Vitrine de Projetos
- Lista paginada via `trpc.projects.list.useInfiniteQuery()`
- Cards com imagens otimizadas (`expo-image` com cache progressivo)
- Filtros persistidos no `MMKV` entre sessões

### 3. Visualização 3D com Proteção
```tsx
// BlurredImage.tsx — desfoque dinâmico para não compradores
import { BlurView } from "expo-blur";
import { Image } from "expo-image";

export function BlurredImage({ uri, isPurchased }: Props) {
  return (
    <View style={{ position: "relative" }}>
      <Image source={{ uri }} style={{ width: "100%", height: 300 }} />
      {!isPurchased && (
        <BlurView
          intensity={80}
          style={StyleSheet.absoluteFill}
        >
          <WatermarkOverlay />
        </BlurView>
      )}
    </View>
  );
}
```

### 4. Checkout e Pagamentos
- Integração com **Stripe React Native SDK** (`@stripe/stripe-react-native`)
- Suporte a Apple Pay (iOS) e Google Pay (Android)
- PIX via QR Code com `expo-camera` para leitura
- Checkbox obrigatório de direitos autorais antes da confirmação

### 5. Notificações Push
```ts
// Registro de token FCM via Expo Notifications
import * as Notifications from "expo-notifications";

async function registerPushToken(userId: number) {
  const token = await Notifications.getExpoPushTokenAsync();
  await trpc.users.updatePushToken.mutate({ token: token.data });
}
```

### 6. Anúncios (AdMob)
- **Google AdMob** para mobile (equivalente ao AdSense web)
- Banners desativados completamente para `accountType === "premium"`
- Formatos: Banner, Interstitial (entre navegações), Rewarded

---

## Configuração EAS Build

```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" },
      "ios": { "credentialsSource": "remote" }
    }
  },
  "submit": {
    "production": {
      "android": { "serviceAccountKeyPath": "./google-service-account.json" },
      "ios": { "appleId": "conectaprojetos@apple.com" }
    }
  }
}
```

---

## Comandos de Desenvolvimento

```bash
# Instalar dependências
npx create-expo-app conecta-projetos-mobile --template tabs
cd conecta-projetos-mobile
npx expo install expo-router expo-auth-session expo-secure-store
npx expo install @stripe/stripe-react-native expo-notifications
npx expo install expo-blur expo-image expo-camera

# Desenvolvimento
npx expo start

# Build Android (APK para testes)
eas build --platform android --profile preview

# Build iOS (TestFlight)
eas build --platform ios --profile preview

# Submit para lojas
eas submit --platform android --profile production
eas submit --platform ios --profile production
```

---

## Variáveis de Ambiente Mobile

```env
EXPO_PUBLIC_API_URL=https://api.conectaprojetos.com.br
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
EXPO_PUBLIC_ADMOB_ANDROID_APP_ID=ca-app-pub-...
EXPO_PUBLIC_ADMOB_IOS_APP_ID=ca-app-pub-...
EXPO_PUBLIC_FIREBASE_CONFIG={"apiKey":"..."}
```

---

## Conformidade LGPD no Mobile

- Solicitação explícita de permissões (câmera, notificações, localização) com justificativa
- Opção de exclusão de conta e anonimização diretamente no app
- Política de privacidade acessível antes do cadastro
- Dados biométricos (Face ID / Touch ID) tratados apenas localmente via `expo-local-authentication`
- Nenhum dado PII armazenado em logs ou analytics

---

## Estimativa de Desenvolvimento

| Fase | Duração | Entregável |
|------|---------|-----------|
| Setup + Design System | 1 semana | Expo app com NativeWind e paleta Azul/Ciano |
| Autenticação + Vitrine | 2 semanas | Login, listagem e detalhe de projetos |
| Checkout + Pagamentos | 2 semanas | Stripe, PIX, Apple Pay, Google Pay |
| Painéis (Cliente + Profissional) | 3 semanas | Histórico, downloads, wizard de publicação |
| IA + Lances Reversos | 1 semana | Chatbot e sistema de demandas |
| Notificações + AdMob | 1 semana | Push notifications e anúncios |
| Testes + QA | 2 semanas | Jest, E2E com Detox |
| **Total** | **~12 semanas** | Apps Android + iOS prontos para lojas |

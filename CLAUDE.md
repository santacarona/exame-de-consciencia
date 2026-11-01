# Exame de Consciência — CLAUDE.md

## Visão Geral

Webapp de exame de consciência para preparação à confissão católica. Criado originalmente no Google AI Studio e publicado em produção.

**Iniciativa:** Santa Carona  
**Público-alvo:** Fiéis católicos de diferentes perfis (crianças, jovens, adultos, sacerdotes)

---

## URLs

| Ambiente | URL |
|----------|-----|
| Produção | https://exame.santacarona.com.br |
| Vercel (provisório) | https://exame-de-consciencia-one.vercel.app |
| Local | http://localhost:3000 |

---

## Repositório e Deploy

| Item | Detalhe |
|------|---------|
| GitHub | https://github.com/santacarona/exame-de-consciencia |
| Plataforma | Vercel (plano gratuito) |
| Deploy | Automático — push na branch `main` dispara novo deploy |
| DNS | CNAME `exame` → `5ff92666c01b7017.vercel-dns-017.com.` (NapoleonHost) |

**Para publicar uma atualização:** basta fazer commit e push para `main`. O Vercel detecta e faz o deploy automaticamente.

---

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Estilização | Tailwind CSS (via CDN no `index.html`) |
| Animações | Framer Motion |
| Ícones | Lucide React |
| Estado | React `useState` / `useRef` |
| Persistência | `sessionStorage` (apagado ao fechar a aba) |

> **Atenção:** Tailwind está carregado via CDN (`<script src="https://cdn.tailwindcss.com">`), não como pacote npm. A configuração de tema fica inline no `index.html`.

---

## Estrutura do Projeto

```
/
├── App.tsx                  # Componente raiz, controla o fluxo de stages
├── types.ts                 # UserType, AppStage, Question
├── constants.ts             # Todas as perguntas por perfil de usuário
├── index.tsx                # Entry point React
├── index.html               # HTML base + config Tailwind + importmap ESM
├── vite.config.ts           # Config Vite
├── public/
│   └── favicon.svg          # Cruz laranja (#FF4F00)
└── components/
    ├── IntroSelection.tsx        # Tela inicial: seleção de perfil
    ├── InstructionsScreen.tsx    # Como usar o app
    ├── PreparationScreen.tsx     # Oração/preparação antes do exame
    ├── ExamCard.tsx              # Card swipeable com a pergunta
    ├── ConfessionGuideScreen.tsx # Guia para a confissão
    ├── ResultsScreen.tsx         # Lista de pecados acusados ao final
    ├── ConfirmationModal.tsx     # Modal de confirmação de saída
    ├── PrayerModal.tsx           # Modal de oração
    ├── AdBanner.tsx              # Banner Google AdSense (320×50)
    └── SantaCaronaSignature.tsx  # Assinatura "Uma iniciativa + logo SC"
```

---

## Fluxo do App

```
intro → (instructions | confession-guide)
intro → preparation → exam → results
```

**Stages (`AppStage`):**
- `intro` — seleção de perfil de usuário
- `instructions` — como usar o app
- `confession-guide` — guia para a confissão
- `preparation` — oração preparatória
- `exam` — cards de perguntas (swipe left = NEGO, swipe right = CONFESSO)
- `results` — lista de itens acusados

---

## Perfis de Usuário (`UserType`)

| Valor | Ícone | Fonte das Perguntas |
|-------|-------|---------------------|
| `child` | Baby | opusdei.org |
| `youth` | Leaf | opusdei.org |
| `adult` | Briefcase | opusdei.org |
| `priest` | Church | presbiteros.org.br |
| `seminarian` | GraduationCap | Pe. Dylan James, "An Examination of Conscience for Seminarians" (2005) |
| `general` | Scroll | padrepauloricardo.org |

---

## Design System

Redesenhado a partir do **Santa Carona design kit** (photography-first, dark-mode-first, laranja único). Sem "produto" literal, o app reinterpreta o símbolo sagrado de cada tela (cruz, chama, livro) como o elemento que recebe a única sombra do sistema.

**Paleta de cores (definida no `index.html`, tema Tailwind):**
- `primary` / `primary-focus` — `#FF4F00` (laranja Santa Carona — único acento interativo do app)
- `ink` — `#FFFFFF` (texto principal)
- `ink-muted-80` — `#E5E5E7` · `ink-muted-48` — `#8A8A8E` · `body-muted` — `#A8A8AC`
- `canvas` — `#000000` (fundo padrão) · `canvas-parchment` — `#1C1C1E` (tela alternada: preparação, resultados)
- `surface-pearl` — `#141416` (cards, modais, chips)
- `surface-tile-1/2/3` — `#272729` / `#2A2A2C` / `#252527` (variações raras de tile claro)
- `hairline` — `#38383A` (borda 1px dos cards) · `divider-soft` — `#2C2C2E`
- `chip-translucent` — `rgba(58,58,60,0.64)` (botões circulares flutuantes, ex. voltar/fechar)

**Border radius:** `none` 0 · `xs` 5px · `sm` 8px · `md` 11px · `lg` 18px (cards) · `pill` 9999px (botões de ação, a assinatura do sistema).

**Sombra:** uma única — `shadow-product` (`3px 5px 30px rgba(0,0,0,0.22)`), aplicada só ao ícone/símbolo central de cada tela, nunca em cards ou botões.

**Fontes:**
- `font-sans` / `font-display` — Inter (substituto open-source de SF Pro Display/Text, com `font-feature-settings: "ss03"` global pra aproximar o "a" arredondado)
- Sem serif. Corpo de texto em 17px/400, títulos em 600 com tracking negativo (`-0.2px` a `-0.374px`). Peso 500 nunca é usado (escala: 300/400/600/700).

**Componentes compartilhados:**
- `components/AppHeader.tsx` — header padrão das telas secundárias (botão circular translúcido de voltar + label central em caps/tracking largo).

Referência completa do kit (cores, tipografia, componentes, breakpoints) ficou fora do repo — pedir ao usuário se precisar reconsultar.

---

## Google AdSense

**Publisher ID:** `ca-pub-2560972696133896`  
**Status:** Script ativo no `index.html`. Aguardando aprovação do domínio `santacarona.com.br` pelo Google.

Banners posicionados em:
- Tela inicial (`IntroSelection`) — abaixo dos cards de perfil
- Como funciona (`InstructionsScreen`) — footer, acima do botão
- Guia de confissão (`ConfessionGuideScreen`) — footer, acima do botão
- Resultados (`ResultsScreen`) — entre a lista e os botões de ação

**Para ativar após aprovação:**
1. Criar blocos de anúncio no painel AdSense → obter os **Ad Slot IDs**
2. Em `components/AdBanner.tsx`: substituir `AD_SLOT` pelo valor real (linha 18)
3. O `AD_CLIENT` já está correto (`ca-pub-2560972696133896`)
4. Fazer build + push → deploy automático

---

## Assinatura Santa Carona

O componente `SantaCaronaSignature` exibe "Uma iniciativa" + logo branca do Santa Carona em todas as telas. A logo é carregada de:
```
https://santacarona.com.br/wp-content/uploads/2024/03/LOGO-SC-BRANCA.png
```
Tamanho atual: `w-[55%] max-w-[130px]`, opacidade `60%`.

---

## Comandos

```bash
npm install     # Instalar dependências
npm run dev     # Dev server em localhost:3000
npm run build   # Build de produção (dist/)
npm run preview # Preview do build
```

**Para publicar atualizações:**
```bash
git add .
git commit -m "descrição da mudança"
git push
# Vercel faz o deploy automaticamente
```

---

## Notas Importantes

- O app é **totalmente client-side**, sem backend. Nenhum dado sai do dispositivo do usuário.
- `sessionStorage` armazena a lista de pecados apenas durante a sessão — apagado ao fechar a aba.
- A função "Copiar" envia o texto apenas para a área de transferência local.
- Favicon: cruz SVG laranja em `public/favicon.svg`.
- O `README.md` menciona `GEMINI_API_KEY` — herança do template do AI Studio, ignorar.

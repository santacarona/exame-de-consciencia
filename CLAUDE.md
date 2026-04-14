# Exame de Consciência — CLAUDE.md

## Visão Geral

Webapp de exame de consciência para preparação à confissão católica. Criado originalmente no Google AI Studio. O objetivo atual é revisar a UI, aplicar melhorias e publicar o app.

**Iniciativa:** Santa Carona  
**Público-alvo:** Fiéis católicos de diferentes perfis (crianças, jovens, adultos, sacerdotes)

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
| Persistência | `localStorage` (sessão temporária) |

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
└── components/
    ├── IntroSelection.tsx        # Tela inicial: seleção de perfil
    ├── InstructionsScreen.tsx    # Como usar o app
    ├── PreparationScreen.tsx     # Oração/preparação antes do exame
    ├── ExamCard.tsx              # Card swipeable com a pergunta
    ├── ConfessionGuideScreen.tsx # Guia para a confissão
    ├── ResultsScreen.tsx         # Lista de pecados acusados ao final
    ├── ConfirmationModal.tsx     # Modal de confirmação de saída
    └── PrayerModal.tsx           # Modal de oração
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
| `adult` | Shield | opusdei.org |
| `priest` | Church | presbiteros.org.br |
| `general` | Scroll | padrepauloricardo.org |

---

## Design System

**Paleta de cores (definida no `index.html`):**
- `primary` — `#8B459E` (roxo)
- `primary-dim` — `#5E3A6C`
- `accent-light` — `#C7B4C8`
- `background-dark` — `#1A0A26`
- `parchment` — `#E0D8E8` (texto principal)
- `confess` — `#9E2B2B` (vermelho escuro)
- `deny` — `#5C5C5C` (cinza)

**Classes utilitárias customizadas (CSS global no `index.html`):**
- `.glass-panel` — painel com efeito vidro (backdrop-filter + border roxa translúcida)
- `.bg-noise` — textura de ruído SVG inline
- `.text-glow` — text-shadow roxa

**Fontes:**
- `font-sans` / `font-display` — Inter
- `font-serif` — Georgia / Times New Roman

---

## Comandos

```bash
npm install     # Instalar dependências
npm run dev     # Dev server em localhost:3000
npm run build   # Build de produção (dist/)
npm run preview # Preview do build
```

---

## Notas Importantes

- O `README.md` menciona `GEMINI_API_KEY`, mas o app não usa nenhuma API de IA. Essa referência é herança do template do AI Studio e pode ser ignorada.
- O `package-lock.json` está vazio — rodar `npm install` vai gerá-lo corretamente.
- O app é **totalmente client-side**, sem backend. Ideal para deploy estático.

---

## Publicação (Planejado)

O deploy será em plataforma estática. Candidatos:
- **Vercel** (recomendado — integração com git, deploy automático)
- **Netlify**
- **GitHub Pages**

Build output: `dist/` via `npm run build`.

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
└── components/
    ├── IntroSelection.tsx        # Tela inicial: seleção de perfil
    ├── InstructionsScreen.tsx    # Como usar o app
    ├── PreparationScreen.tsx     # Oração/preparação antes do exame
    ├── ExamCard.tsx              # Card swipeable com a pergunta
    ├── ConfessionGuideScreen.tsx # Guia para a confissão
    ├── ResultsScreen.tsx         # Lista de pecados acusados ao final
    ├── ConfirmationModal.tsx     # Modal de confirmação de saída
    ├── PrayerModal.tsx           # Modal de oração
    └── AdBanner.tsx              # Banner Google AdSense (320×50)
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
- `primary` — `#FF4F00` (laranja Santa Carona)
- `primary-dim` — `#CC3E00`
- `accent-light` — `#D4C5A9`
- `background-dark` / `obsidian` — `#0D0D0D`
- `obsidian-light` — `#161616`
- `parchment` — `#F0EAD6` (texto principal)
- `parchment-dim` — `#D4C5A9`
- `confess` — `#7A1C1C` (bordô escuro)
- `deny` — `#4A4A4A` (cinza chumbo)

**Classes utilitárias customizadas (CSS global no `index.html`):**
- `.glass-panel` — painel com efeito vidro (backdrop-filter + border translúcida)
- `.bg-noise` — textura de ruído SVG inline
- `.text-glow` — text-shadow laranja

**Fontes:**
- `font-sans` / `font-display` — Inter
- `font-serif` — EB Garamond (Google Fonts) — usar sem itálico (`font-normal`)

---

## Google AdSense

Estrutura já implementada em `components/AdBanner.tsx`. Banners posicionados em:
- Tela inicial (`IntroSelection`) — abaixo dos cards de perfil
- Como funciona (`InstructionsScreen`) — footer, acima do botão
- Guia de confissão (`ConfessionGuideScreen`) — footer, acima do botão
- Resultados (`ResultsScreen`) — entre a lista e os botões de ação

**Para ativar quando a conta AdSense for aprovada:**
1. Em `index.html`: descomentar o `<script>` do AdSense e substituir o Publisher ID
2. Em `components/AdBanner.tsx`: substituir `AD_CLIENT` e `AD_SLOT` pelos valores reais

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
- O `README.md` menciona `GEMINI_API_KEY` — herança do template do AI Studio, ignorar.

# nextjs-template

Next.js template with App Router, React Compiler, Tailwind CSS v4, design tokens, and ready-to-use UI components.

## Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + React Compiler |
| Styles | Tailwind CSS 4 + CSS variables (design tokens) |
| Components | shadcn/ui (Base UI / base-vega) + CVA |
| Forms | React Hook Form + Zod + next-safe-action |
| Auth | Auth.js (`next-auth` v5) |
| Icons | Lucide + custom icons in `shared/components/icons` |
| Quality | ESLint (Next, React, a11y, Prettier, React Compiler) + Prettier |
| Package manager | pnpm |

## Requirements

- Node.js 22+
- [pnpm](https://pnpm.io/) 11+

## Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Start development (Turbopack)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Development server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Production server (after `build`) |
| `pnpm lint` | Lint with cache |
| `pnpm lint:fix` | Lint and auto-fix |

No `.env` file is required to run the template.

## Structure

```text
src/
├── app/                 # Routes and layouts (App Router)
├── features/            # App domains / features (empty by design)
└── shared/
    ├── components/      # Reusable UI
    ├── lib/             # Utilities (e.g. `cn`)
    └── styles/          # Tokens, foundations, and component styles
```

### TypeScript aliases

| Alias | Path |
| --- | --- |
| `@/*` | `./src/*` |
| `@components/*` | `./src/shared/components/*` |
| `@styles/*` | `./src/shared/styles/*` |
| `@utils/*` | `./src/shared/utils/*` |

## What's included

### Components (`src/shared/components`)

- **Button** — CVA variants
- **Input** — base text field
- **Field** — label, control, description, and errors
- **Form** — React Hook Form integration
- **Heading** / **Text** — semantic typography
- **Toast** — notifications (Toaster in the layout)
- **Spinner** — loading state
- **Icons** — directional set (chevron, arrow)

### Design system (`src/shared/styles`)

- **Foundations** — color palette and fonts (`Space Grotesk`)
- **Semantic tokens** — semantic colors, typography, and text
- **Component styles** — per-component tokens/styles (button, input, toast, etc.)
- **globals.css** — Tailwind entry + tokens + base styles

### Next config

- React Compiler enabled
- `cacheComponents` enabled
- Full-URL fetch logging

### Tooling

- shadcn configured (`components.json`, `base-vega` style, `zinc` base color)
- ESLint with Next, React, hooks, a11y, imports, Prettier, and React Compiler rules
- Prettier + `prettier-plugin-tailwindcss`

## Start building

1. Edit `src/app/page.tsx` for the home page.
2. Add features under `src/features/<name>/`.
3. Reuse UI from `@/shared/components` or `@components/...`.
4. Extend tokens in `src/shared/styles` before hardcoding colors or typography.
5. To add shadcn components: `pnpm dlx shadcn@latest add <component>`.

## License

Private (`private: true` in `package.json`).

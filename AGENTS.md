# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`: routes under `app`, UI under `components`, hooks in `hooks`, utilities in `lib`, shared styles in `styles`. Tailwind is configured via `tailwind.config.ts`, and static assets belong in `public/`. Markdown posts sit in `posts/` and follow the `YYYY-MM-DD.md` naming pattern with front matter fields such as `title`, `date`, and `category`. Testing helpers and generators reside in `test/` (see `test/generator.js` for scaffolding demo content).

## Build, Test, and Development Commands
- `pnpm install` – install dependencies (pnpm 10+ is expected).
- `pnpm dev` – run `next dev --turbopack` for local development with hot reload.
- `pnpm build` – production build with `NODE_ENV=production` and the default browserslist.
- `pnpm build:modern` – build targeting modern browsers via `TARGET_BROWSERS=modern`.
- `pnpm start` – serve the prebuilt output.
- `pnpm lint` – run `next lint` (ESLint + Next.js rules).
- `pnpm analyze` – create a bundle report with `ANALYZE=true`.
- `pnpm gen` – execute `test/generator.js` to scaffold placeholder posts.

## Coding Style & Naming Conventions
Write TypeScript-first React components, defaulting to functional patterns and server components when data fetching is needed. Follow the existing four-space indentation and rely on the repo’s ESLint/Prettier defaults. Components (`ArticleCard.tsx`) use PascalCase filenames, hooks use `useX` camelCase, and utilities/functions stay lowerCamelCase. Keep Tailwind utility classes concise; push bespoke styles into `src/styles`. Markdown metadata drives routing, so keep keys lowercase and dates ISO-formatted.

## Testing Guidelines
There is no dedicated automated test suite yet; linting plus manual verification in `pnpm dev` act as the safety net. Before opening a PR, run `pnpm lint && pnpm build` to catch type and SSR issues. When adding content helpers, create sample input via `pnpm gen` and verify rendered output under `/posts/[slug]`. Prefer lightweight integration or visual regression tests only if you introduce new interactive flows—place them under `test/` and gate them behind an npm script.

## Commit & Pull Request Guidelines
History uses Conventional Commit prefixes (`feat:`, `fix:`, `perf:`) plus short Mandarin phrases; match that and keep subjects under 72 characters. Each PR should reference related issues (if any), describe UI changes with before/after screenshots or recordings, and list the commands you ran (`pnpm lint`, `pnpm build`). Keep PRs focused (content, UI, infra changes split across branches) and mention the affected slug whenever you edit markdown posts to simplify changelog generation.

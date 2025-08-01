# Code Style and Conventions

## TypeScript Configuration
- **Strict mode enabled** (`"strict": true`)
- **Target**: ES2020
- **Module resolution**: bundler
- **Path aliases**: `@/*` maps to `./src/*`
- **JSX**: preserve (handled by Next.js)

## ESLint Configuration
- Extends `next/core-web-vitals` and `next/typescript`
- Standard Next.js recommended rules

## File Organization
- `/posts/`: Markdown blog posts with frontmatter
- `/src/app/`: Next.js App Router pages and layouts
- `/src/components/`: Reusable UI components
- `/src/lib/`: Core utilities, constants, and data fetching
- `/src/hooks/`: Custom React hooks
- `/public/`: Static assets

## Naming Conventions
- **Components**: PascalCase (e.g., `ArticleCard`, `ThemeToggle`)
- **Files**: Match component names or use kebab-case for pages
- **Functions**: camelCase (e.g., `getAllPosts`, `formatDate`)
- **Constants**: camelCase or UPPER_CASE for exports

## Component Patterns
- Use React.memo for performance optimization where appropriate
- Functional components with TypeScript interfaces for props
- Custom hooks for reusable logic (e.g., `useHasMounted`)
- Server components for data fetching with `unstable_cache`

## Content Structure
- Blog posts use frontmatter with title, date, and category
- Categories defined in `src/lib/constants.ts`
- Markdown rendering with syntax highlighting
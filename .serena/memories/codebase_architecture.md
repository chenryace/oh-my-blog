# Codebase Architecture

## Directory Structure
```
oh-my-blog/
├── posts/                 # Markdown blog posts
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout with header/navigation/sidebar
│   │   ├── page.tsx      # Home page with post listings
│   │   ├── posts/[id]/   # Individual post pages
│   │   ├── category/[slug]/ # Category listing pages
│   │   ├── archive/      # Archive page
│   │   ├── about/        # About page
│   │   └── friends/      # Friends page
│   ├── components/       # Reusable UI components
│   │   ├── ArticleCard.tsx
│   │   ├── CategorySidebar.tsx
│   │   ├── Navigation/
│   │   ├── Pagination/
│   │   ├── ThemeToggle/
│   │   └── Loading/
│   ├── lib/              # Core utilities
│   │   ├── posts.server.ts  # Post fetching and processing
│   │   ├── constants.ts     # Site configuration
│   │   └── markdown-utils.ts # Markdown parsing utilities
│   └── hooks/            # Custom React hooks
│       └── useHasMounted.tsx
└── public/               # Static assets
```

## Data Flow
1. **Content Pipeline**: Markdown files → gray-matter parsing → markdown-it rendering → highlight.js syntax highlighting
2. **Caching**: Server-side caching with `unstable_cache` for performance
3. **Routing**: Next.js App Router with dynamic routes for posts and categories
4. **State Management**: Local state + next-themes for theme management

## Key Components
- **Layout**: Responsive design with header, navigation, content area, and sidebar
- **Posts Processing**: Server-side markdown processing with caching
- **Theme System**: Dark/light mode with system preference detection
- **Navigation**: Mobile-responsive with Framer Motion animations
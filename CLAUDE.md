# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

oh-my-blog is a personal blog system built with Next.js, developed as a replacement for the outdated firekylin blog system. It features a clean, responsive design with dark mode support, category organization, and Markdown-based content rendering.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server with turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Generate sample blog posts
pnpm gen
```

## Architecture

### Core Components

1. **Content Management**
   - Blog posts are stored as Markdown files in the `/posts` directory
   - Each post has frontmatter with title, date, and category
   - `src/lib/posts.server.ts` handles fetching, parsing, and caching of posts

2. **Rendering Pipeline**
   - Markdown parsing with markdown-it and syntax highlighting with highlight.js
   - Server-side rendering with Next.js App Router
   - Cached data fetching using `unstable_cache` for performance

3. **UI Components**
   - Layout structure in `src/app/layout.tsx` with header, navigation, content area and sidebar
   - Dark mode support via next-themes and ThemeToggle component
   - Responsive design with Tailwind CSS
   - Animations with Framer Motion

### Data Flow

1. Markdown files are read from the filesystem
2. Content is parsed using gray-matter to extract frontmatter and content
3. Content is rendered using markdown-it with syntax highlighting
4. Pages display posts with pagination or individual post views

### Key Features

- **Categories**: Posts are organized by categories defined in `src/lib/constants.ts`
- **Dark Mode**: Theme switching with localStorage persistence
- **Responsive Navigation**: Mobile-friendly navigation with animations
- **Pagination**: Support for paginated post lists
- **Archive View**: Historical view of all posts
- **Code Highlighting**: Syntax highlighting for code blocks

## File Organization

- `/posts/`: Contains all blog post Markdown files
- `/src/app/`: Next.js App Router pages and layouts
- `/src/components/`: Reusable UI components
- `/src/lib/`: Core utilities, constants, and data fetching functions
- `/src/hooks/`: Custom React hooks
- `/public/`: Static assets

## Development Notes

- New posts should be added to the `/posts` directory with proper frontmatter
- Categories are defined in `src/lib/constants.ts` and should be referenced in post frontmatter
- The blog uses tailwindcss for styling with some CSS modules for component-specific styles
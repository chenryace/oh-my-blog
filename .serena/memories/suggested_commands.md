# Development Commands

## Essential Commands (use pnpm)
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

# Bundle analysis 
pnpm analyze

# Modern browsers build
pnpm build:modern
```

## System Commands (Darwin/macOS)
```bash
# File operations
ls -la              # List files with details
find . -name "*.ts" # Find TypeScript files
grep -r "pattern"   # Search in files
cd /path/to/dir     # Change directory

# Git operations
git status          # Check repository status
git add .           # Stage all changes
git commit -m "msg" # Commit with message
git push            # Push to remote
```

## Important Notes
- Always use **pnpm** for package management (not npm or yarn)
- Use `pnpm dev` for development (includes turbopack for faster builds)
- Run `pnpm lint` before committing changes
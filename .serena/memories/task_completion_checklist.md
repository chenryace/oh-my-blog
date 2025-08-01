# Task Completion Checklist

## Required Steps Before Task Completion

### 1. Code Quality Checks
```bash
# Run linting (required)
pnpm lint

# Fix any linting errors before proceeding
```

### 2. Build Verification
```bash
# Ensure production build works
pnpm build

# Check for TypeScript errors during build
```

### 3. Development Testing
```bash
# Test in development mode
pnpm dev

# Verify functionality works as expected
# Check responsive design and dark mode if UI changes made
```

### 4. Code Review Checklist
- [ ] Follow existing code patterns and conventions
- [ ] Use TypeScript properly with proper typing
- [ ] Components are properly optimized (React.memo where needed)
- [ ] No console.logs or debug code left behind
- [ ] Responsive design considerations for mobile
- [ ] Dark mode compatibility if UI changes

### 5. Content Considerations (if blog posts modified)
- [ ] Markdown frontmatter is properly formatted
- [ ] Categories match those defined in constants.ts
- [ ] Dates follow YYYY-MM-DD format

## Important Notes
- **Never commit without explicit user request**
- **Never include Claude or qfdk information in commits**  
- **Always use pnpm for package management**
- **Test both light and dark themes for UI changes**
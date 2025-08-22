# 开发命令指南

## 开发环境
```bash
# 安装依赖
pnpm install

# 启动开发服务器 (使用 turbopack)
pnpm dev

# 生成示例博客文章
pnpm gen
```

## 构建和部署
```bash
# 生产构建
pnpm build

# 启动生产服务器
pnpm start

# 分析构建包大小
pnpm analyze

# 现代浏览器构建
pnpm build:modern
```

## 代码质量
```bash
# 运行 ESLint
pnpm lint

# TypeScript 类型检查
npx tsc --noEmit
```

## 监控和测试
```bash
# 监控冷启动性能
node monitor-cold-start.js

# 健康检查
curl https://blog.qfdk.me/api/health
```

## 系统命令 (macOS)
```bash
# 文件操作
ls -la              # 列出文件
find . -name "*.md" # 查找 markdown 文件
grep -r "搜索内容"   # 递归搜索

# Git 操作
git status
git add .
git commit -m "提交信息"
git push
```

## 重要提醒
- 使用 pnpm 而不是 npm
- 不要自动 commit/push
- 提交信息不要包含 claude 相关信息
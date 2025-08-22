# Oh My Blog - 项目概览

## 项目简介
oh-my-blog 是一个用 Next.js 构建的个人博客系统，用于替代已过时的 firekylin 博客系统。采用现代化设计，支持深色模式、分类组织和基于 Markdown 的内容渲染。

## 技术栈
- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + CSS Modules
- **内容**: Markdown + gray-matter + markdown-it
- **代码高亮**: highlight.js
- **主题**: next-themes
- **包管理**: pnpm
- **部署**: Vercel

## 项目结构
- `/posts/`: 博客文章 Markdown 文件
- `/src/app/`: Next.js App Router 页面和布局
- `/src/components/`: 可复用 UI 组件
- `/src/lib/`: 核心工具、常量和数据获取函数
- `/src/hooks/`: 自定义 React hooks
- `/public/`: 静态资源

## 核心功能
- 响应式设计
- 深色模式切换
- 分类系统
- 文章分页
- 代码语法高亮
- 归档视图
- 友情链接页面

## 性能特性
- 静态生成 (SSG)
- 服务端渲染 (SSR)
- 图片优化
- Bundle 分割
- 缓存策略
- DNS 预解析
- 资源预连接
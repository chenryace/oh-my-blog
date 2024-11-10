# oh-my-blog

在寻找个人博客解决方案的过程中,我一直在使用 firekylin (https://github.com/firekylin/firekylin) 作为博客系统。

然而,由于项目长期未更新维护,逐渐出现了一些问题。

例如某次后台登录突然失效,需要通过修改源码来解决,这种情况让我感到困扰。

于是我决定利用空闲时间,基于 Next.js 框架开发了一个简洁的博客系统 - oh-my-blog。

这个项目源于一个即兴的想法,旨在打造一个稳定可靠、便于维护的个人博客。

## 项目结构

```bash
.
├── README.md                 # 项目说明文档
├── next-env.d.ts            # Next.js 环境类型声明
├── next.config.ts           # Next.js 配置文件
├── package.json             # 项目配置和依赖管理
├── pnpm-lock.yaml           # pnpm 依赖版本锁定文件
├── postcss.config.mjs       # PostCSS 配置文件
├── posts/                   # 博客文章存放目录
│   ├── hello-world.md      # 示例文章
│   └── ...                 # 其他文章
├── src/                     # 源代码目录
│   ├── app/                # 应用主目录
│   ├── components/         # 可复用组件
│   ├── hooks/             # 自定义 React Hooks
│   └── lib/               # 工具函数和通用库
├── test/                   # 测试相关文件
│   └── generator.js       # 测试数据生成器
└── tsconfig.json          # TypeScript 配置文件
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 本地开发

```bash
pnpm dev
```

### 3. 生产环境构建

```bash
pnpm build
```
**注意: 初次使用时可以删除 posts 目录下的示例文章,替换为自己的内容。**

### 待实现列表
- [ ] 暗黑主题模式
- [ ] 加密某些指定文章

export const categoryNames: Record<string, string> = {
    'life': '生活随笔',
    'tech': '技术分享',
    'reading': '读书笔记',
    'travel': '旅行见闻',
}

// src/lib/constants.ts
export const siteConfig = {
    title: `我是一个博客`,
    author: 'qfdk',
    description: '非主流黑科技自留地...',
    footer: '© 2024 qfdk | 保留所有权利',

    // 导航菜单
    nav: [
        {href: '/', icon: 'Home', label: '首页'},
        {href: '/archive', icon: 'Archive', label: '归档'},
        // {href: '/tags', icon: 'Tag', label: '标签'},
        {href: '/about', icon: 'User', label: '关于'},
        {href: '/friends', icon: 'Link', label: '友链'}
    ],

    // 分类
    categories: [
        {slug: 'life', name: '生活随笔'},
        {slug: 'tech', name: '技术分享'},
        {slug: 'reading', name: '读书笔记'},
        {slug: 'travel', name: '旅行见闻'}
    ],

    // 友情链接
    friends: [
        {name: 'Xiaodu博客', url: 'https://t.du9l.com/', description: ' 鼓捣黑科技的小杜'},
        {
            name: 'GitHub',
            url: 'https://github.com',
            description: '全球最大的代码托管平台'
        },
        {
            name: 'Next.js',
            url: 'https://nextjs.org',
            description: 'React 框架，用于生产环境的全栈开发'
        }
    ]
}

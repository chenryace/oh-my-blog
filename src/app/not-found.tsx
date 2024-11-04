import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="error-page">
            <h1>404</h1>
            <h2>页面未找到</h2>
            <p>抱歉，您访问的页面不存在。</p>
            <Link href="/" className="back-home">
                返回首页
            </Link>
        </div>
    )
}

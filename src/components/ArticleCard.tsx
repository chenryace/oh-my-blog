import Link from "next/link";
import {categoryNames} from "@/lib/constants";
import {memo} from "react";

interface ArticleProps {
    id: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
}

// 使用备忘录模式优化组件，避免不必要的重渲染
function ArticleCard({id, title, date, category, excerpt}: ArticleProps) {
    return (
        <article className="article">
            <h2 style={{fontSize:"x-large",fontWeight:"bold"}}>
                <Link href={`/posts/${id}`} prefetch={false}>{title}</Link>
            </h2>
            <div className="meta">发布于 {date} | 分类：{categoryNames[category]}</div>
            <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt}}/>
            <div className="read-more">
                <Link href={`/posts/${id}`} prefetch={false}>继续阅读</Link>
            </div>
        </article>
    );
}

// 使用memo优化，只有当props变化时才重新渲染
export default memo(ArticleCard);

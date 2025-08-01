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

// 添加自定义比较函数，避免不必要的重渲染
function arePropsEqual(prevProps: ArticleProps, nextProps: ArticleProps) {
    return (
        prevProps.id === nextProps.id &&
        prevProps.title === nextProps.title &&
        prevProps.date === nextProps.date &&
        prevProps.category === nextProps.category &&
        prevProps.excerpt === nextProps.excerpt
    );
}

// 使用memo优化并添加自定义比较函数
export default memo(ArticleCard, arePropsEqual);

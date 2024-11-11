import Link from "next/link";
import {categoryNames} from "@/lib/constants";

interface ArticleProps {
    id: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
}

export default function ArticleCard({id, title, date, category, excerpt}: ArticleProps) {
    return (
        <article className="article">
            <h2>
                <Link href={`/posts/${id}`}>{title}</Link>
            </h2>
            <div className="meta">发布于 {date} | 分类：{categoryNames[category]}</div>
            <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt}}/>
            <div className="read-more">
                <Link href={`/posts/${id}`}>继续阅读</Link>
            </div>
        </article>
    );
}

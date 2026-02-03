interface PostsListLoadingProps {
    count?: number;
}

export default function PostsListLoading({count = 3}: PostsListLoadingProps) {
    const placeholders = Array.from({length: count}, (_, index) => index + 1);
    return (
        <div className="posts-loading-list">
            {placeholders.map((item) => (
                <article key={item} className="article posts-loading-card">
                    <h2 className="posts-loading-title">
                        <span className="posts-loading-line posts-loading-title-line" aria-hidden="true" />
                    </h2>
                    <div className="posts-loading-meta">
                        <span className="posts-loading-line posts-loading-meta-line" aria-hidden="true" />
                    </div>
                    <div className="posts-loading-excerpt">
                        <span className="posts-loading-line posts-loading-excerpt-line" aria-hidden="true" />
                        <span className="posts-loading-line posts-loading-excerpt-line" aria-hidden="true" />
                        <span className="posts-loading-line posts-loading-excerpt-line posts-loading-excerpt-short" aria-hidden="true" />
                    </div>
                    <div className="read-more">
                        <span className="posts-loading-line posts-loading-readmore" aria-hidden="true" />
                    </div>
                </article>
            ))}
        </div>
    );
}

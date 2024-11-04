export default function ArchivePage() {
    const posts = [
        {id: 'hello-world', title: 'Hello World', date: '2024-03-15'},
        {id: 'hello-world-233', title: 'Hello World 233', date: '2024-03-14'},
        {id: '2222', title: '2222', date: '2024-03-13'}
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    };

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">归档</h1>

            <div className="border rounded-lg overflow-hidden">
                {posts.map((post, index) => (
                    <article
                        key={post.id}
                        className={`
              flex items-center justify-between p-4
              hover:bg-gray-50 transition-colors
              ${index !== posts.length - 1 ? 'border-b' : ''}
            `}
                    >
                        <a
                            href={`/posts/${post.id}`}
                            className="text-lg hover:text-blue-600 transition-colors"
                        >
                            {post.title}
                        </a>
                        <time className="text-sm text-gray-500">
                            {formatDate(post.date)}
                        </time>
                    </article>
                ))}
            </div>
        </main>
    );
}

// components/Loading/index.tsx

export default function Loading() {
    return (
        <div className="loading-skeleton" style={{
            minHeight: '200px',
            borderRadius: '4px',
            margin: '20px 0'
        }}>
            {/* 使用内联样式避免额外CSS文件加载 */}
        </div>
    );
}

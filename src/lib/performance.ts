// 性能优化工具集

// 1. 预加载关键资源
export const preloadCriticalResources = () => {
    // 预加载下一页
    if (typeof window !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = entry.target as HTMLAnchorElement;
                    const href = link.href;
                    if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                        const prefetchLink = document.createElement('link');
                        prefetchLink.rel = 'prefetch';
                        prefetchLink.href = href;
                        prefetchLink.as = 'document';
                        document.head.appendChild(prefetchLink);
                    }
                }
            });
        }, { rootMargin: '50px' });

        // 观察所有文章链接
        document.querySelectorAll('a[href^="/posts/"]').forEach(link => {
            observer.observe(link);
        });
    }
};

// 2. 延迟加载非关键JavaScript
export const lazyLoadScripts = () => {
    if (typeof window !== 'undefined') {
        // 使用requestIdleCallback延迟加载分析脚本
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // 延迟加载第三方脚本
                const scripts = document.querySelectorAll('script[data-lazy]');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.src = script.getAttribute('data-src')!;
                    newScript.async = true;
                    document.body.appendChild(newScript);
                });
            }, { timeout: 2000 });
        }
    }
};

// 3. 优化图片加载 - 使用Intersection Observer
export const optimizeImageLoading = () => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, { rootMargin: '100px' });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};


// 5. 内存缓存管理
const memoryCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5分钟

export const getCachedData = <T>(key: string): T | null => {
    const cached = memoryCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data as T;
    }
    memoryCache.delete(key);
    return null;
};

export const setCachedData = <T>(key: string, data: T): void => {
    memoryCache.set(key, { data, timestamp: Date.now() });
    
    // 限制缓存大小
    if (memoryCache.size > 50) {
        const firstKey = memoryCache.keys().next().value;
        memoryCache.delete(firstKey);
    }
};

// 6. 连接状态优化
export const optimizeConnections = () => {
    if (typeof window !== 'undefined' && 'connection' in navigator) {
        const connection = (navigator as Navigator & { connection?: { effectiveType: string; saveData: boolean; addEventListener: (event: string, handler: () => void) => void } }).connection;
        
        // 根据网络状况调整预加载策略
        if (connection) {
            const updateStrategy = () => {
                const effectiveType = connection.effectiveType;
                const saveData = connection.saveData;
                
                if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
                    // 慢速网络：禁用预加载
                    document.querySelectorAll('link[rel="prefetch"]').forEach(link => {
                        link.remove();
                    });
                } else if (effectiveType === '4g') {
                    // 快速网络：激进预加载
                    preloadCriticalResources();
                }
            };
            
            connection.addEventListener('change', updateStrategy);
            updateStrategy();
        }
    }
};

// 7. 使用Web Workers处理繁重计算
export const offloadToWorker = <T, R>(fn: (data: T) => R, data: T): Promise<R> => {
    return new Promise((resolve, reject) => {
        const workerCode = `
            self.onmessage = function(e) {
                const fn = ${fn.toString()};
                const result = fn(e.data);
                self.postMessage(result);
            };
        `;
        
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));
        
        worker.onmessage = (e) => {
            resolve(e.data);
            worker.terminate();
        };
        
        worker.onerror = reject;
        worker.postMessage(data);
    });
};

// 8. 批量DOM更新优化
export const batchDOMUpdates = (updates: (() => void)[]) => {
    if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
        requestAnimationFrame(() => {
            updates.forEach(update => update());
        });
    } else {
        updates.forEach(update => update());
    }
};

// 初始化所有优化
export const initPerformanceOptimizations = () => {
    if (typeof window !== 'undefined') {
        // DOM加载完成后初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                preloadCriticalResources();
                optimizeImageLoading();
                optimizeConnections();
                lazyLoadScripts();
            });
        } else {
            // DOM已加载
            preloadCriticalResources();
            optimizeImageLoading();
            optimizeConnections();
            lazyLoadScripts();
        }
        
    }
};
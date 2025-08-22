// src/components/Providers.tsx
"use client";

import {ThemeProvider} from "next-themes";
import {type ReactNode, useEffect} from "react";
import {initPerformanceOptimizations} from "@/lib/performance";

export function Providers({children}: { children: ReactNode }) {
    useEffect(() => {
        // 初始化性能优化
        initPerformanceOptimizations();
    }, []);

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}

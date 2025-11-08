'use client';

import { useEffect } from 'react';

export default function CodeBlock() {
    useEffect(() => {
        // 为所有代码块添加复制按钮
        const codeBlocks = document.querySelectorAll('.content pre.shiki');

        codeBlocks.forEach((block) => {
            // 检查是否已经添加过按钮
            if (block.querySelector('.copy-button')) return;

            const button = document.createElement('button');
            button.className = 'copy-button';
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
            `;
            button.title = '复制代码';

            button.addEventListener('click', async () => {
                const code = block.querySelector('code')?.textContent || '';
                try {
                    await navigator.clipboard.writeText(code);
                    button.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    `;
                    button.classList.add('copied');

                    setTimeout(() => {
                        button.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        `;
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });

            block.appendChild(button);
        });
    }, []);

    return null;
}

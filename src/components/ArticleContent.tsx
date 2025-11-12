'use client';

import { useEffect } from 'react';

interface ArticleContentProps {
    content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
    useEffect(() => {
        const codeBlocks = document.querySelectorAll<HTMLElement>('.content pre');

        codeBlocks.forEach((block) => {
            const existingWrapper = block.closest<HTMLElement>('.code-block-wrapper');
            let wrapper = existingWrapper;

            if (!wrapper) {
                if (!block.parentElement) return;
                wrapper = document.createElement('div');
                wrapper.className = 'code-block-wrapper';
                block.parentElement.insertBefore(wrapper, block);
                wrapper.appendChild(block);
            }

            let button = wrapper.querySelector<HTMLButtonElement>('.copy-button');
            if (!button) {
                const legacyButton = block.querySelector<HTMLButtonElement>('.copy-button');
                if (legacyButton) {
                    button = legacyButton;
                }
            }

            if (!button) {
                button = document.createElement('button');
                button.type = 'button';
                button.className = 'copy-button';
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                `;
                button.title = '复制代码';
            }

            if (button.dataset.bound !== 'true') {
                button.dataset.bound = 'true';
                button.addEventListener('click', async () => {
                    const code = block.querySelector('code')?.textContent || '';
                    try {
                        await navigator.clipboard.writeText(code);
                        button!.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        `;
                        button!.classList.add('copied');

                        setTimeout(() => {
                            button!.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            `;
                            button!.classList.remove('copied');
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy:', err);
                    }
                });
            }

            if (button.parentElement !== wrapper) {
                wrapper.appendChild(button);
            }
        });
    }, [content]); // 依赖 content，内容变化时重新添加按钮
    return (
        <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
            suppressHydrationWarning
        />
    );
}

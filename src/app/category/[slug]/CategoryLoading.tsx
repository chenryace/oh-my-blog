"use client";

import {useParams} from "next/navigation";
import styles from "./category.module.css";
import loadingStyles from "./loading.module.css";
import {categoryNames} from "@/lib/constants";

const placeholders = [1, 2, 3, 4, 5];

export default function CategoryLoading() {
    const params = useParams();
    const slug = params?.slug as string | undefined;
    const title = slug && categoryNames[slug] ? categoryNames[slug] : "分类";

    return (
        <article className={styles.article}>
            <h1 className={styles.title}>
                <span>{title}</span>
                <span className={styles.count}>
                    <span className={`${loadingStyles.line} ${loadingStyles.countLine}`} aria-hidden="true" />
                </span>
            </h1>

            <div className={styles.list}>
                {placeholders.map((item) => (
                    <div key={item} className={loadingStyles.itemSkeleton}>
                        <span className={`${loadingStyles.line} ${loadingStyles.itemLine}`} aria-hidden="true" />
                        <span className={`${loadingStyles.line} ${loadingStyles.dateLine}`} aria-hidden="true" />
                    </div>
                ))}
            </div>
        </article>
    );
}

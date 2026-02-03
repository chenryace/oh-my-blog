"use client";

import {usePathname} from "next/navigation";
import PostsListLoading from "@/components/PostsListLoading";

export default function Loading() {
    const pathname = usePathname();

    if (pathname === "/") {
        return <PostsListLoading count={4} />;
    }

    return null;
}

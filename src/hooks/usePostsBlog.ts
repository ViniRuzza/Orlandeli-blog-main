import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizePostBlog } from "@/lib/strapi";
import type { PostBlog } from "@/lib/types";

export function usePostsBlog() {
    return useQuery<PostBlog[]>({
        queryKey: ["post-blogs"],
        queryFn: async () => {
            const res = await fetchStrapi("/post-blogs?populate=*&sort=data:desc");
            return res.data.map((item) =>
                normalizePostBlog(item as unknown as { id: number; [key: string]: unknown })
            );
        },
    });
}

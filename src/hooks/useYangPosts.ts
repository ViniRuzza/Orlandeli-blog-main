import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeYangPost } from "@/lib/strapi";
import type { YangPost } from "@/lib/types";

export function useYangPosts() {
    return useQuery<YangPost[]>({
        queryKey: ["yang-posts"],
        queryFn: async () => {
            const res = await fetchStrapi("/yang-posts?populate=*&sort=ordem:asc");
            return res.data.map((item) =>
                normalizeYangPost(item as unknown as { id: number;[key: string]: unknown })
            );
        },
    });
}

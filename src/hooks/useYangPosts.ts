import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeYangPost } from "@/lib/strapi";
import type { YangPost } from "@/lib/types";

export function useYangPosts() {
    return useQuery<YangPost[]>({
        queryKey: ["yang-posts"],
        queryFn: async () => {
            const res = await fetchStrapi("/yang-posts?populate=*&sort=ordem:asc&pagination[pageSize]=100");
            const seen = new Set<number>();
            return res.data
                .filter((item) => {
                    if (seen.has(item.id)) return false;
                    seen.add(item.id);
                    return true;
                })
                .map((item) =>
                    normalizeYangPost(item as unknown as { id: number;[key: string]: unknown })
                );
        },
    });
}

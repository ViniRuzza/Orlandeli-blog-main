import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeNoticiaHome } from "@/lib/strapi";
import type { NoticiaHome } from "@/lib/types";

export function useNoticiasHome() {
    return useQuery<NoticiaHome[]>({
        queryKey: ["noticias-home"],
        queryFn: async () => {
            const res = await fetchStrapi("/noticias-home?populate=*&sort=ordem:asc&pagination[pageSize]=100");
            const seen = new Set<number>();
            return res.data
                .filter((item) => {
                    if (seen.has(item.id)) return false;
                    seen.add(item.id);
                    return true;
                })
                .map((item) =>
                    normalizeNoticiaHome(item as unknown as { id: number; [key: string]: unknown })
                );
        },
    });
}

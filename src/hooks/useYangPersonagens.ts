import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeYangPersonagem } from "@/lib/strapi";
import type { YangPersonagem } from "@/lib/types";

export function useYangPersonagens() {
    return useQuery<YangPersonagem[]>({
        queryKey: ["yang-personagens"],
        queryFn: async () => {
            const res = await fetchStrapi("/yang-personagens?populate=*&sort=ordem:asc");
            return res.data.map((item) =>
                normalizeYangPersonagem(item as unknown as { id: number;[key: string]: unknown })
            );
        },
    });
}

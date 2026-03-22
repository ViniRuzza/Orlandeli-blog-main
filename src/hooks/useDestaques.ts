import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeDestaque } from "@/lib/strapi";
import type { Destaque } from "@/lib/types";

export function useDestaques() {
    return useQuery<Destaque[]>({
        queryKey: ["destaques"],
        queryFn: async () => {
            const res = await fetchStrapi("/destaques?populate=*");
            return res.data.map((item) =>
                normalizeDestaque(item as unknown as { id: number; [key: string]: unknown })
            );
        },
    });
}

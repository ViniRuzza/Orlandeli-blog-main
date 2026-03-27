import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeQuadrinho } from "@/lib/strapi";
import type { Quadrinho } from "@/lib/types";

export function useQuadrinhos() {
    return useQuery<Quadrinho[]>({
        queryKey: ["quadrinhos"],
        queryFn: async () => {
            const res = await fetchStrapi("/quadrinhos?populate=*&sort=ano:desc");
            return res.data.map((item) =>
                normalizeQuadrinho(item as unknown as { id: number;[key: string]: unknown })
            );
        },
    });
}

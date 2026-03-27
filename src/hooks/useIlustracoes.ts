import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeIlustracao } from "@/lib/strapi";
import type { Ilustracao } from "@/lib/types";

export function useIlustracoes() {
    return useQuery<Ilustracao[]>({
        queryKey: ["ilustracoes"],
        queryFn: async () => {
            const res = await fetchStrapi("/ilustraca0s?populate=*&sort=createdAt:desc");
            return res.data.map((item) =>
                normalizeIlustracao(item as unknown as { id: number;[key: string]: unknown })
            );
        },
    });
}

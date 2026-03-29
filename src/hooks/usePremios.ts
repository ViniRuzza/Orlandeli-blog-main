import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizePremio } from "@/lib/strapi";
import type { Premio } from "@/lib/types";

export function usePremios() {
    return useQuery<Premio[]>({
        queryKey: ["premios"],
        queryFn: async () => {
            const res = await fetchStrapi("/premios?populate=*&sort=ordem:asc");
            return res.data.map((item) =>
                normalizePremio(item as unknown as { id: number;[key: string]: unknown })
            );
        },
    });
}

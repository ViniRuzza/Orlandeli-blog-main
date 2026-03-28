import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeYangLivro } from "@/lib/strapi";
import type { YangLivro } from "@/lib/types";

export function useYangLivros() {
    return useQuery<YangLivro[]>({
        queryKey: ["yang-livros"],
        queryFn: async () => {
            const res = await fetchStrapi("/yang-livros?populate=*&sort=ordem:asc");
            return res.data.map((item) =>
                normalizeYangLivro(item as unknown as { id: number;[key: string]: unknown })
            );
        },
    });
}

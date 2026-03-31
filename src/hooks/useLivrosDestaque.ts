import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeLivroDestaque } from "@/lib/strapi";
import type { LivroDestaque } from "@/lib/types";

export function useLivrosDestaque() {
    return useQuery<LivroDestaque[]>({
        queryKey: ["livros-destaque"],
        queryFn: async () => {
            const res = await fetchStrapi("/livros-destaque?populate=*&sort=ordem:asc");
            return res.data.map((item) =>
                normalizeLivroDestaque(item as unknown as { id: number; [key: string]: unknown })
            );
        },
    });
}

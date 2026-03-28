import { useQuery } from "@tanstack/react-query";
import { fetchStrapi, normalizeTrajetoria } from "@/lib/strapi";
import type { TrajetoriaItem } from "@/lib/types";

export function useTrajetoria() {
    return useQuery<TrajetoriaItem[]>({
        queryKey: ["trajetoria"],
        queryFn: async () => {
            const res = await fetchStrapi("/trajetoria-items?populate=*&sort=ordem:asc");
            return res.data.map((item) =>
                normalizeTrajetoria(item as unknown as { id: number;[key: string]: unknown })
            );
        },
    });
}

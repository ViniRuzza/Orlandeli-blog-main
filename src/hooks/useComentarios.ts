import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchStrapi, enviarComentario, normalizeComentario } from "@/lib/strapi";
import type { Comentario } from "@/lib/types";

export function useComentarios(postId: string) {
    return useQuery<Comentario[]>({
        queryKey: ["comentarios", postId],
        queryFn: async () => {
            if (!postId) return [];
            // Busca apenas os aprovados
            const res = await fetchStrapi(`/comentarios?filters[postId][$eq]=${postId}&filters[aprovado][$eq]=true&sort=createdAt:desc`);
            if (!res.data) return [];
            return res.data.map((item: any) => normalizeComentario(item));
        },
        enabled: !!postId, // só executa a query se tiver o ID
    });
}

export function useEnviarComentario() {
    return useMutation({
        mutationFn: enviarComentario,
    });
}

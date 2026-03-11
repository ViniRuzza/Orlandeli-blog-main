import type { StrapiResponse, StrapiMedia, Quadrinho, Ilustracao } from "./types";

export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

/**
 * Constrói a URL completa de uma mídia do Strapi.
 * Se a URL já for absoluta (começa com http), retorna como está.
 */
export function strapiMediaUrl(media: StrapiMedia | null | undefined): string {
    if (!media) return "";
    const url = media.url;
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${STRAPI_URL}${url}`;
}

/**
 * Função genérica para buscar dados da API do Strapi.
 */
export async function fetchStrapi<T>(endpoint: string): Promise<StrapiResponse<T>> {
    const res = await fetch(`${STRAPI_URL}/api${endpoint}`);
    if (!res.ok) {
        throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

/**
 * Extrai a mídia de um campo do Strapi (compatível com v4 e v5).
 */
function extractMedia(field: unknown): StrapiMedia | null {
    if (!field) return null;
    // Strapi v4: { data: { id, attributes: { url, ... } } }
    if (typeof field === "object" && field !== null && "data" in field) {
        const data = (field as { data: unknown }).data;
        if (!data) return null;
        if (typeof data === "object" && "attributes" in (data as object)) {
            return (data as { attributes: StrapiMedia }).attributes;
        }
        return data as StrapiMedia;
    }
    // Strapi v5: campo direto
    return field as StrapiMedia;
}

/**
 * Extrai array de mídias (para campo paginas).
 */
function extractMediaArray(field: unknown): StrapiMedia[] {
    if (!field) return [];
    // Strapi v4: { data: [{ id, attributes: {...} }] }
    if (typeof field === "object" && field !== null && "data" in field) {
        const data = (field as { data: unknown[] }).data;
        if (!Array.isArray(data)) return [];
        return data.map((item) => {
            if (typeof item === "object" && item !== null && "attributes" in item) {
                return (item as { attributes: StrapiMedia }).attributes;
            }
            return item as StrapiMedia;
        });
    }
    // Strapi v5: array direto
    if (Array.isArray(field)) return field as StrapiMedia[];
    return [];
}

/**
 * Normaliza um item de Quadrinho do Strapi para o tipo usado no frontend.
 */
export function normalizeQuadrinho(item: { id: number;[key: string]: unknown }): Quadrinho {
    // Suporte a Strapi v4 (attributes) e v5 (campos diretos)
    const attrs = (item.attributes as { [key: string]: unknown }) ?? item;

    const capa = extractMedia(attrs.capa);
    const paginas = extractMediaArray(attrs.paginas);

    return {
        id: item.id,
        titulo: (attrs.titulo as string) || "",
        sinopse: (attrs.sinopse as string) || "",
        ano: (attrs.ano as number) || 0,
        stats: (attrs.stats as string) || "",
        capaUrl: strapiMediaUrl(capa),
        paginasUrls: paginas.map(strapiMediaUrl).filter(Boolean),
    };
}

/**
 * Normaliza um item de Ilustração do Strapi para o tipo usado no frontend.
 */
export function normalizeIlustracao(item: { id: number;[key: string]: unknown }): Ilustracao {
    const attrs = (item.attributes as { [key: string]: unknown }) ?? item;

    // image é campo múltiplo no Strapi, pega o primeiro item do array
    const imagens = extractMediaArray(attrs.image);
    const imagem = imagens.length > 0 ? imagens[0] : null;

    // Tags pode ser array de strings ou string separada por vírgulas
    let tags: string[] = [];
    if (Array.isArray(attrs.tags)) {
        tags = attrs.tags as string[];
    } else if (typeof attrs.tags === "string" && attrs.tags) {
        tags = attrs.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
    }

    return {
        id: item.id,
        titulo: (attrs.titulo as string) || "",
        tags,
        imagemUrl: strapiMediaUrl(imagem),
    };
}

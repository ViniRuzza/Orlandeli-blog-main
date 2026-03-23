import type { StrapiResponse, StrapiMedia, Quadrinho, Ilustracao, PostBlog, Destaque } from "./types";

export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";

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
 * Extrai categorias de um campo (suporta relação Strapi, array JSON ou string).
 */
function extractCategories(field: unknown): string[] {
    if (!field) return [];

    // Caso 1: Relação Strapi (pode vir como { data: [...] } ou direto conforme a versão)
    let items: any[] = [];
    if (typeof field === "object" && field !== null) {
        if ("data" in field && Array.isArray((field as any).data)) {
            items = (field as any).data;
        } else if (Array.isArray(field)) {
            items = field;
        }
    }

    if (items.length > 0) {
        return items.map((item) => {
            // Extrai o nome/titulo do atributo ou do nível superior (v4 vs v5)
            const source = item.attributes ?? item;
            return source.nome || source.title || source.name || source.label || "";
        }).filter(Boolean);
    }

    // Caso 2: Array de strings (JSON)
    if (Array.isArray(field)) {
        return field.map(c => typeof c === "string" ? c : "").filter(Boolean);
    }

    // Caso 3: String separada por vírgula
    if (typeof field === "string") {
        return field.split(",").map(c => c.trim()).filter(Boolean);
    }

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
        categorias: extractCategories(attrs.categorias),
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
/**
 * Normaliza um item de PostBlog do Strapi para o tipo usado no frontend.
 */
export function normalizePostBlog(item: { id: number;[key: string]: unknown }): PostBlog {
    const attrs = (item.attributes as { [key: string]: unknown }) ?? item;

    const imagem = extractMedia(attrs.imagem);

    return {
        id: item.id,
        titulo: (attrs.titulo as string) || "",
        conteudo: (attrs.conteudo as string) || "",
        imagemUrl: strapiMediaUrl(imagem),
        data: (attrs.data as string) || "",
        categorias: extractCategories(attrs.categorias),
    };
}

/**
 * Normaliza um item de Destaque (Carrossel) do Strapi para o tipo usado no frontend.
 */
export function normalizeDestaque(item: { id: number;[key: string]: unknown }): Destaque {
    const attrs = (item.attributes as { [key: string]: unknown }) ?? item;
    const rawImagem = attrs.imagem || attrs.Imagem;
    const imagem = extractMedia(rawImagem);

    return {
        id: item.id,
        titulo: (attrs.titulo as string) || (attrs.Titulo as string) || "",
        legenda: (attrs.legenda as string) || (attrs.Legenda as string) || "",
        imagemUrl: strapiMediaUrl(imagem),
        link: (attrs.link as string) || (attrs.Link as string) || "",
        textoBotao: (attrs.textoBotao as string) || (attrs.texto_botao as string) || (attrs.TextoBotao as string) || "Saiba mais",
    };
}

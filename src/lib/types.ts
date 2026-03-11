// Tipos para as respostas do Strapi REST API

export interface StrapiMediaFormat {
    url: string;
    width: number;
    height: number;
}

export interface StrapiMedia {
    id: number;
    url: string;
    alternativeText: string | null;
    formats?: {
        thumbnail?: StrapiMediaFormat;
        small?: StrapiMediaFormat;
        medium?: StrapiMediaFormat;
        large?: StrapiMediaFormat;
    };
}

export interface StrapiItem<T> {
    id: number;
    documentId: string;
    attributes?: T; // Strapi v4
    // Strapi v5 retorna campos direto no objeto
    [key: string]: unknown;
}

export interface StrapiResponse<T> {
    data: StrapiItem<T>[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// Content Type: Quadrinho
export interface StrapiQuadrinho {
    titulo: string;
    sinopse: string;
    ano: number;
    stats: string;
    capa: StrapiMedia | { data: StrapiMedia } | null;
    paginas: StrapiMedia[] | { data: StrapiMedia[] } | null;
}

// Content Type: Ilustracao
export interface StrapiIlustracao {
    titulo: string;
    tags: string[] | string | null;
    imagem: StrapiMedia | { data: StrapiMedia } | null;
}

// Tipos normalizados para uso nos componentes
export interface Quadrinho {
    id: number;
    titulo: string;
    sinopse: string;
    ano: number;
    stats: string;
    capaUrl: string;
    paginasUrls: string[];
}

export interface Ilustracao {
    id: number;
    titulo: string;
    tags: string[];
    imagemUrl: string;
}

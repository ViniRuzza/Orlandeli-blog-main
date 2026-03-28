// Tipos para as respostas do Strapi REST API
// Gerado automaticamente — não editar manualmente as interfaces Strapi*

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
    secao: "quadrinhos_autorais" | "literatura_infantil" | null;
    botaoTexto: string | null;
    botaoLink: string | null;
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
    secao: "quadrinhos_autorais" | "literatura_infantil";
    botaoTexto: string;
    botaoLink: string;
}

export interface Ilustracao {
    id: number;
    titulo: string;
    tags: string[];
    imagemUrl: string;
}

// Content Type: YangPost
export interface StrapiYangPost {
    titulo: string;
    descricao: string;
    conteudo: string | null;
    imagemCapa: StrapiMedia | { data: StrapiMedia } | null;
    imagensConteudo: StrapiMedia[] | { data: StrapiMedia[] } | null;
    data: string | null;
    ordem: number | null;
}

export interface YangPost {
    id: number;
    titulo: string;
    descricao: string;
    conteudo: string;
    imagemCapaUrl: string;
    imagensConteudoUrls: string[];
    data: string;
    ordem: number;
}

// Content Type: PostBlog
export interface StrapiPostBlog {
    titulo: string;
    conteudo: string | null;
    imagem: StrapiMedia | { data: StrapiMedia } | null;
    data: string | null;
    categorias: string[] | null;
}

export interface PostBlog {
    id: number;
    titulo: string;
    conteudo: string;
    imagemUrl: string;
    data: string;
    categorias: string[];
}

// Content Type: TrajetoriaItem
export interface StrapiTrajetoria {
    ano: string;
    titulo: string;
    descricao: string;
    imagem: StrapiMedia | { data: StrapiMedia } | null;
    ordem: number | null;
}

export interface TrajetoriaItem {
    id: number;
    ano: string;
    titulo: string;
    descricao: string;
    imagemUrl: string;
    ordem: number;
}

// Content Type: Destaque / Banner (Carrossel)
export interface StrapiDestaque {
    titulo: string;
    legenda: string;
    imagem: StrapiMedia | { data: StrapiMedia } | null;
    link: string;
    textoBotao: string;
}

export interface Destaque {
    id: number;
    titulo: string;
    legenda: string;
    imagemUrl: string;
    link: string;
    textoBotao: string;
}

// Content Type: Comentario
export interface StrapiComentario {
    nome: string;
    email: string;
    conteudo: string;
    aprovado: boolean;
    postId: string;
}

export interface Comentario {
    id: number;
    nome: string;
    conteudo: string;
    data: string;
}


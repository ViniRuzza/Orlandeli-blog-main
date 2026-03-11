# ======== Stage 1: Build do Frontend ========
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar manifests e instalar dependências de forma determinística
COPY package.json package-lock.json ./
RUN npm ci

# Copiar restante do código fonte
COPY . .

# Variável de build: URL do Strapi (vazia = mesmo origin, proxy via Nginx)
ARG VITE_STRAPI_URL=""
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL

# Build de produção
RUN npm run build

# ======== Stage 2: Servir com Nginx ========
FROM nginx:alpine

# Copiar build gerado no stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine

WORKDIR /app

# Copiar dependências
COPY package.json package-lock.json ./

# Instalar TODAS as dependências (incluindo devDeps necessárias para o build do TypeScript)
RUN npm install --legacy-peer-deps

# Copiar código fonte
COPY . .

# Build do Strapi (compila TypeScript e painel admin)
# NODE_OPTIONS aumenta heap — o admin panel consome bastante memória durante o build
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Remover devDependências após o build para reduzir tamanho da imagem
RUN npm prune --production

EXPOSE 1337

CMD ["npm", "run", "start"]

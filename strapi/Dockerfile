FROM node:20-alpine

WORKDIR /app

# Copiar dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build do Strapi (aumenta memória do Node.js para VMs com pouca RAM)
ENV NODE_OPTIONS=--max-old-space-size=1024
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]

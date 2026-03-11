# ======== Servir com Nginx ========
FROM nginx:alpine

# Copiar build do Vite pre-compilado (enviado via Git)
COPY dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

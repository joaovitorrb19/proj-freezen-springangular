From node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM nginx:alpine

COPY --from=build /app/dist/frontend /usr/share/nginx/html

COPY chave-privada.key /etc/nginx/ssl/nginx.key
COPY certificado.crt /etc/nginx/ssl/nginx.crt

EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
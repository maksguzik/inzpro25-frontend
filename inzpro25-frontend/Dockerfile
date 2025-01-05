FROM node:16.13.2-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.21.5-alpine as release
COPY --from=build /app/build /usr/share/nginx/html/
ADD ssl/cert.crt /etc/ssl/certs/cert.crt
ADD ssl/cert.key /etc/ssl/private/cert.key
ADD nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 443
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

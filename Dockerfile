# Angular
FROM node:latest as app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# Nginx
FROM nginx:latest as nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=app /app/dist/light-store /usr/share/nginx/html

EXPOSE 80

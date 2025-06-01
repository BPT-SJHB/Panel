FROM node:18.20.8 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
FROM nginx:stable
COPY --from=build /app/dist/bpt-sjhb-panel /usr/share/nginx/html
EXPOSE 80
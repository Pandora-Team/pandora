FROM docker.io/library/node:lts-alpine AS build
ARG VUE_APP_API_URL=http://localhost:5000/
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM docker.io/library/nginx:alpine
EXPOSE 80
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

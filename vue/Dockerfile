FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine
RUN npm install -g http-server
EXPOSE 8080
COPY --from=build /app/dist /app
CMD [ "http-server", "/app" ]

FROM docker.io/library/node:lts-alpine AS build
ARG VUE_APP_API_URL=http://localhost:5000/
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM docker.io/library/node:lts-alpine
RUN npm install -g http-server
EXPOSE 8080
COPY --from=build /app/dist /app
CMD [ "http-server", "/app", "--proxy", "http://localhost:8080?" ]

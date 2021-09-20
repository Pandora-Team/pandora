FROM node:lts-alpine AS build-stage
# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app
# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./
# устанавливаем зависимости проекта
RUN npm install
# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .
# собираем приложение для production с минификацией
RUN npm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
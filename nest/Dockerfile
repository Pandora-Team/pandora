FROM node:14.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000
CMD ["node", "dist/main"]
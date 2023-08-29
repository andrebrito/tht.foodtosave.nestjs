FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --frozen-file

RUN yarn prisma generate

COPY . .


EXPOSE 3000

CMD ["node", "dist/src/main.js"]
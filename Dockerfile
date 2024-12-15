FROM node:18 as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ARG CONTENTFUL_SPACE_ID
ENV CONTENTFUL_SPACE_ID=${CONTENTFUL_SPACE_ID}

ARG CONTENTFUL_ACCESS_TOKEN
ENV CONTENTFUL_ACCESS_TOKEN=${CONTENTFUL_ACCESS_TOKEN}

RUN npm run build

FROM node:18

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/public ./public

RUN npm install -g gatsby-cli

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["gatsby", "serve", "-p", "3000", "-H", "0.0.0.0"]
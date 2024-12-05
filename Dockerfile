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

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
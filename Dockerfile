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
COPY --from=builder /usr/src/app/package*.json ./

RUN npm install --only=production

ENV PORT=9000
ENV HOSTNAME="0.0.0.0"

EXPOSE 9000

CMD ["npm", "run", "serve"]

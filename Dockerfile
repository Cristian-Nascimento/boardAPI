# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine

ENV BABEL_DISABLE_CACHE=1

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install -f

# Copiar o restante dos arquivos
COPY . .

COPY .env.example .env

CMD ["npm", "start"]

# Expor a porta usada pela aplicação
EXPOSE 9000

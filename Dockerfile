######################
# BASE CONFIGURATION #
######################
FROM node:14.15-alpine AS base

WORKDIR /app

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost:8080/ping || exit 1

ENV PATH=/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run compile

############################
# PRODUCTION CONFIGURATION #
############################
FROM base AS production

ENV NODE_ENV=production

CMD ["npm", "start"]



#############################
# DEVELOPMENT CONFIGURATION #
#############################
FROM base AS development

ENV NODE_ENV=development

RUN \
  npm install --only=development

CMD ["npm", "run", "dev"]

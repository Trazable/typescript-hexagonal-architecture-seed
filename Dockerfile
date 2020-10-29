######################
# BASE CONFIGURATION #
######################
FROM node:14.15-alpine AS base

WORKDIR /app

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

ARG SOMETHING

ENV \
  SOMETHING=$SOMETHING \
  PATH=/app/node_modules/.bin:$PATH

EXPOSE 8080

COPY package*.json ./

RUN npm install --only=production

COPY . /app




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

ENV GOOGLE_APPLICATION_CREDENTIALS="/app/google_service_account.json"

RUN \
  npm install --only=development && \
  npm run test:unit

CMD ["npm", "run", "dev"]

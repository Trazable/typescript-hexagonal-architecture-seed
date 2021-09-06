######################
# BASE CONFIGURATION #
######################
FROM node:14-alpine AS base

WORKDIR /app

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost:8080/ping || exit 1

ENV PATH=/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run test && \
  npm run test:unit && \
  npm run compile


############################
# PRODUCTION CONFIGURATION #
############################
FROM node:14-alpine AS production

WORKDIR /app

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost:8080/ping || exit 1

ENV \
  PATH=/app/node_modules/.bin:$PATH \
  NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

# Copy the dist build
COPY --from=base /app/dist /app/dist

USER node

CMD ["npm", "start"]


#############################
# DEVELOPMENT CONFIGURATION #
#############################
FROM base AS development

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]

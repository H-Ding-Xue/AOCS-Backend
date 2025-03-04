# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 20 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
# 
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:20-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /app

# COPY addon/ addon/

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build && npm prune --omit=dev

# ---

FROM node:20-alpine as runner

ENV NODE_ENV production

USER node
WORKDIR /app

# COPY --from=builder --chown=node:node /app/addon ./addon
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/ ./dist/

ENV PORT=3000
EXPOSE $PORT

CMD ["node", "dist/main.js"]
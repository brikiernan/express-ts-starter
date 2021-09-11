FROM node:14.17.0-alpine as base

ARG _NPM_TOKEN
ENV NODE_ENV=production
WORKDIR /opt/node/app
COPY package*.json ./
COPY .npmrc ./
RUN npm ci && npm cache clean --force

## 
FROM base as build

ARG _NPM_TOKEN
WORKDIR /opt/node/app
COPY --from=base /opt/node/app/package*.json ./
COPY --from=base /opt/node/app/node_modules ./node_modules
RUN npm install --only=development
COPY /src ./src
COPY modules.d.ts ./
COPY tsconfig.json ./
RUN npm run build

##
FROM base as prod

ENV NODE_ENV=production
WORKDIR /opt/node/app

COPY --from=build /opt/node/app/dist ./dist
RUN rm package*.json
RUN rm .npmrc

# set node user with least permissions
USER node

# start server with binary
CMD ["node", "dist/start.js"]


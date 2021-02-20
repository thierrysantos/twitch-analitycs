FROM node:12-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node ./package.json ./yarn*.lock ./tsconfig.json ./babel.config.js ./

RUN yarn

COPY --chown=node ./src ./src

RUN yarn build

CMD yarn start
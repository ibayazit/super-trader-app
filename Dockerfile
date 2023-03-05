FROM node:latest
WORKDIR /usr/src/app

# ENV NODE_ENV=development
# ENV APP_ENV=development
# ENV APP_PORT=3000
# ENV DATABASE_DIALECT=postgres
# ENV DATABASE_HOST=host.docker.internal
# ENV DATABASE_PORT=5432
# ENV DATABASE_NAME=super_traders
# ENV DATABASE_USER=root
# ENV DATABASE_PASSWORD=12345678

COPY package*.json ./
COPY .sequelizerc ./
RUN npm install
COPY . .
# RUN npm run migrate && npm run db:seed

# EXPOSE 3000

# CMD [ "node", "index.js" ]
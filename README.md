# SUPER TRADERS

## Local Installation

```bash
cp .env.example .env
#and set your properties

npm install

#migrate tables & seed
npm run migrate
npm run db:seed

npm run start:dev
#or
npm run start:prod
```

## Docker Installation

```bash
docker-compose up
```
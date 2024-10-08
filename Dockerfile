FROM node:21.7.3-alpine3.20

WORKDIR /app

ENV DATABASE_URL="postgresql://futsalNeo_owner:d7he2oMDxRVg@ep-dawn-meadow-a5whs8q2.us-east-2.aws.neon.tech/futsalNeo?sslmode=require"

COPY package*.json package-lock.json ./

COPY prisma ./prisma

RUN npm install 

RUN npx prisma generate

COPY . .


CMD ["npm" , "start"]
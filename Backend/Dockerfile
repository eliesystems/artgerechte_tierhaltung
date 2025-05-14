# Step 1: Build the Node.js application
FROM node:22 AS build-stage
WORKDIR /app

COPY Backend/. ./

RUN npm install

RUN npx prisma generate

FROM node:22

WORKDIR /app

COPY --from=build-stage /app /app

EXPOSE 3000

CMD ["npm", "start"]

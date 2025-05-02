# Step 1: Build the Node.js application
FROM node:22 AS build-stage
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY Backend/prisma ./Backend/prisma

# Generate Prisma client
RUN npx prisma generate --schema=./Backend/prisma/schema.prisma

FROM node:22

WORKDIR /app

COPY --from=build-stage /app /app

EXPOSE 3000

CMD ["npm", "start"]

# Step 1: Build the Node.js application
FROM node:22 AS build-stage
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# Step 2: Run the backend service
FROM node:22

WORKDIR /app

COPY --from=build-stage /app /app

EXPOSE 3000

CMD ["npm", "start"]
# Stage 1: Build the Vue.js app
FROM node:22 AS build-stage

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf


# Copy the build output from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
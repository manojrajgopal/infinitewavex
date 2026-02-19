# Step 1: Build React app
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built React app

COPY --from=build /app/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

# Nginx starts automatically
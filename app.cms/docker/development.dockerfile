FROM node:10.0
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean
RUN npm install strapi -g
WORKDIR /app
CMD ["npm", "start"]

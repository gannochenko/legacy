FROM node:10.0
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean
WORKDIR /app
CMD ["npm", "run", "dev"]

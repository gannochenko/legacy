FROM node:8.9.3
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean
WORKDIR /usr/src/app
#RUN groupadd -r owner && useradd -m -r -g owner owner && chown -R owner:owner /usr/src/app
#USER owner
ENV NODE_ENV=production
#ENV PORT=<PORT>
#ENV MONGO_URL=<MONGO_URL>
#ENV ROOT_URL=<ROOT_URL>
#EXPOSE <PORT>
COPY package*.json ./
COPY . /usr/src/app
RUN cd /usr/src/app/programs/server && npm install --production
CMD [ "npm", "start" ]

FROM node:latest
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/public/
RUN mkdir /usr/src/app/content/
RUN groupadd -r owner && useradd -m -r -g owner owner && chown -R owner:owner /usr/src/app
USER owner
RUN printf "alias ll=\"ls -alh\"\n" >> /home/owner/.bashrc
ENV NODE_ENV=production

RUN chown -R owner:owner /usr/src/app

# copy server
COPY ./build/bundle.js ./index.js
COPY ./package*.json ./
RUN npm install

# copy client
COPY ./src/content/ ./content/
COPY ./public/ ./public/

CMD [ "npm", "start" ]

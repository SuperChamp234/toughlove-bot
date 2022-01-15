FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Bundle app source
COPY . /app

CMD [ "node", "index.js" ]

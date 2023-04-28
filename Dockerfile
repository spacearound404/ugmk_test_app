FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000 3001

CMD ["sh", "-c", "npm run start-server & serve -n -s build -l 3000"]
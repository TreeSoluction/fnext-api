FROM node:21

WORKDIR /src/

COPY . .

RUN npm install 

EXPOSE 3001

CMD npm run start:dev
FROM node:16

WORKDIR /code
COPY . /code

RUN npm install
RUN export API_URL=http://localhost:8080/

EXPOSE 3000

CMD [ "npm", "start" ]

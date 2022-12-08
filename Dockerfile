FROM node:16

WORKDIR /code
COPY . /code

RUN npm install
RUN export API_URL=${API_URL}


EXPOSE 3000

CMD [ "npm", "start" ]

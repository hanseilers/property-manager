FROM node

RUN mkdir /src

RUN npm install nodemon -g

# stupid solution. It should work with package.json. 
RUN npm install should -g

RUN npm install nodemon -g

WORKDIR /src
ADD . /src
RUN npm install

EXPOSE 3000

CMD npm start
FROM node:14.15.1-alpine3.10
COPY ./services/graphql/init.sh /scripts/init.sh
RUN npm install -g nodemon
WORKDIR /app
CMD ["/scripts/init.sh"]
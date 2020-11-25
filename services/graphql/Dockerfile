FROM node:14.15.1-alpine3.10
RUN npm config set proxy http://mcafeemwglb.poad.patent.gov.uk:9090 
RUN npm config set https-proxy http://mcafeemwglb.poad.patent.gov.uk:9090 
RUN npm config set noproxy .patent.gov.uk
COPY ./services/graphql/init.sh /scripts/init.sh
WORKDIR /app
CMD ["/scripts/init.sh"]
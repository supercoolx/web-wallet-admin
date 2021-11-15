# build the source code
FROM node:14-alpine as builder

RUN apk update; apk add --no-cache git

WORKDIR /opt/walletadmin

COPY . .

RUN yarn install

RUN yarn generate:version

RUN yarn build

# create the nginx image and copy the build folder
FROM nginx:alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in build folder to default nginx public folder
COPY --from=builder /opt/walletadmin/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

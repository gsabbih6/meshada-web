#FROM node:16-alpine3.14 As builder
#
#WORKDIR /usr/src/app
#
#RUN npm i -g @angular/cli
#
#
#COPY package.json package-lock.json ./
#
#RUN npm install
#
#COPY . .
#
#EXPOSE 4200
#
#RUN npm run build --prod
#
#FROM nginx:alpine
#
#COPY --from=builder /usr/src/app/dist/stylsAngular/ /usr/share/nginx/html
## Expose port 80
#EXPOSE 4200
#

#FROM beeman/scully-docker
#FROM node:16-alpine3.14 As builder

#WORKDIR /usr/src/app

#RUN npm i -g @angular/cli

#RUN apk add --no-cache \
#      chromium \
#      nss \
#      freetype \
#      freetype-dev \
#      harfbuzz \
#      ca-certificates \
#      ttf-freefont
#
##ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
#ENV SCULLY_PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

#COPY package.json package-lock.json ./

#RUN npm install

#COPY . .

#EXPOSE 4200

#RUN npm run build --prod

#RUN npx scully

#FROM nginx:alpine
##
#COPY --from=builder /usr/src/app/dist/static /usr/share/nginx/html
### Expose port 80


# FROM node:16-alpine as node
# WORKDIR /app
# #COPY package.json package-lock.json ./
# #RUN yarn install
# COPY . .
# RUN npm install
# RUN npm run build


# FROM nginx:latest
# COPY --from=node /app/dist/static /usr/share/nginx/html

# EXPOSE 80
# CMD [ "nginx", "-g", "daemon off;" ]
# #EXPOSE 1864
# WORKDIR /app
# COPY ./package.json /app/
# RUN npm install
# COPY . /app/
# EXPOSE 4000
# RUN npm run build:ssr
# CMD npm run serve:ssr


FROM node:lts-alpine3.17 AS build
WORKDIR /app
COPY ./package.json /app/
RUN npm install --force
COPY . /app/
# this will build the browser and server files:
RUN npm run build:ssr

FROM nginx:latest AS client-browser
COPY --from=build /app/dist/meshada-web/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

FROM node:lts-alpine3.17 AS ssr-server
COPY --from=build /app/dist /app/dist/
COPY ./package.json /app/package.json
WORKDIR /app
EXPOSE 4000
CMD npm run serve:ssr

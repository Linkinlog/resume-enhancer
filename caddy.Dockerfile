FROM node:23-alpine AS build

WORKDIR /frontend

COPY frontend /frontend

RUN npm install
RUN npm run build

FROM caddy:2.9.1-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /frontend/out /srv

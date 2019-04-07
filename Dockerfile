FROM node:10-alpine as builder

WORKDIR /tmp/atlasdemo
COPY . /tmp/atlasdemo
# use of --max-old-space to prevent `JavaScript heap out of memory` on docker-hub
RUN npm ci && node --max-old-space-size=4096 `which npm` run build

FROM node:10-alpine
WORKDIR /opt/atlasdemo
COPY --from=builder /tmp/atlasdemo/dist /opt/atlasdemo
EXPOSE 8000
ENTRYPOINT ["node", "server.js"]

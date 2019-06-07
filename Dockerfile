FROM node:10-alpine as builder

COPY . /builder
WORKDIR /builder
# use of --max-old-space to prevent `JavaScript heap out of memory` on docker-hub
RUN npm ci && node --max-old-space-size=8192 `which npm` run build

FROM node:10-alpine
WORKDIR /app
COPY --from=builder /builder/dist /app/dist
COPY --from=builder /builder/@data /app/@data
EXPOSE 8000
ENTRYPOINT ["node", "dist/server.js"]
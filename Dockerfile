FROM node:10
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci
COPY . .
RUN npx tsc --project .

FROM node:10
WORKDIR /app
COPY --from=0 /app/package.json .
COPY --from=0 /app/package-lock.json .
RUN npm ci --production
COPY --from=0 /app/dist ./dist
EXPOSE 8080
ENTRYPOINT [ "node","dist/bin/main.js" ]

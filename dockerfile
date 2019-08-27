FROM node:10
WORKDIR /root/app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci
COPY . .
RUN npx tsc --project .

FROM node:10
WORKDIR /root/app
COPY --from=0 /root/app/package.json .
COPY --from=0 /root/app/package-lock.json .
RUN npm ci --production
COPY --from=0 /root/app/dist ./dist
EXPOSE 80
ENTRYPOINT [ "node","dist/bin/main.js" ]

FROM node:10
WORKDIR /root/app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY . .
RUN npx tsc --project .

FROM node:10
WORKDIR /root/app
COPY --from=0 /root/app/package.json .
COPY --from=0 /root/app/package-lock.json .
RUN npm install --production
COPY --from=0 /root/app/dist ./dist
ENTRYPOINT [ "node","dist/bin/main.js" ]

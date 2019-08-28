FROM node:10
RUN ls -al && pwd
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN ls -al && pwd
RUN npm ci
RUN ls -al && pwd
COPY . .
RUN ls -al && pwd
RUN npx tsc --project .
RUN ls -al && pwd

FROM node:10
COPY --from=0 /app/package.json .
COPY --from=0 /app/package-lock.json .
RUN npm ci --production
COPY --from=0 /app/dist ./dist
EXPOSE 8080
ENTRYPOINT [ "node","dist/bin/main.js" ]

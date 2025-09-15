FROM node:18-alpine

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs
RUN adduser -S bookinator -u 1001

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production && npm cache clean --force

COPY src/ ./src/

RUN chown -R bookinator:nodejs /app
USER bookinator

EXPOSE 8080

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "src/index.js"]

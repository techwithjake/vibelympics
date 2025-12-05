FROM cgr.dev/chainguard/node:latest-dev as builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY index.js .

FROM cgr.dev/chainguard/node:latest

WORKDIR /app
COPY --from=builder /app .

USER 65532:65532
EXPOSE 8080
ENTRYPOINT ["/usr/bin/node", "index.js"]

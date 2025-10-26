FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

WORKDIR /app/packages/backend
RUN pnpm build

FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=builder /app/packages/backend/package.json ./packages/backend/package.json

WORKDIR /app/packages/backend

EXPOSE 4000 8080

ENV PORT=4000

CMD ["node", "dist/index.js"]
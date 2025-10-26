FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages/backend/package.json ./packages/backend/

RUN pnpm install --frozen-lockfile

COPY packages/backend ./packages/backend

WORKDIR /app/packages/backend
RUN pnpm build

FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/backend/package.json ./packages/backend/

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/packages/backend/dist ./packages/backend/dist

WORKDIR /app/packages/backend

EXPOSE 4000

CMD ["node", "dist/index.js"]
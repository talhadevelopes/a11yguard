FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

ARG VITE_PUBLIC_BACKEND_URL=http://localhost:4000
ENV VITE_PUBLIC_BACKEND_URL=$VITE_PUBLIC_BACKEND_URL

WORKDIR /app/apps/platform
RUN pnpm build

FROM nginx:alpine

COPY --from=builder /app/apps/platform/dist /usr/share/nginx/html

RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
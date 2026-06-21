FROM node:22-alpine AS builder
RUN npm i -g turbo
WORKDIR /app
COPY . .
RUN turbo prune @hobbies-dashboard/web --docker

FROM node:22-alpine AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci
COPY --from=builder /app/out/full/ .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npx turbo run build --filter=@hobbies-dashboard/web

FROM nginx:alpine AS runner
RUN rm -rf /usr/share/nginx/html/*
COPY --from=installer /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
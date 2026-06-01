FROM node:22-alpine AS builder
RUN npm install -g turbo
WORKDIR /app
COPY . .
RUN turbo prune api --docker

FROM node:22-alpine AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci
COPY --from=builder /app/out/full/ .
RUN npx prisma generate --schema=apps/api/prisma
RUN npx turbo run build --filter=api

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=installer /app/apps/api/dist ./dist
COPY --from=installer /app/apps/api/package.json .
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/api/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/main.js"]
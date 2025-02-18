FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/server/package.json packages/server/
COPY prisma/ prisma/
RUN corepack enable && pnpm install --frozen-lockfile
COPY packages/server/ packages/server/
RUN npx prisma generate
EXPOSE 3001
CMD ["pnpm", "--filter", "@consult-track/server", "dev"]

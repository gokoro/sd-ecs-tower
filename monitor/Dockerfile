# CAUTION: Build command should be run outside this package directory, meaning project root directory.
# This is because this package is referencing `attached` package outside here.
# You can check `.github/workflows/ci.yml` for details.

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app/monitor

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prefix ../attached --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/monitor/node_modules /app/monitor/node_modules
COPY --from=build /app/monitor/dist /app/monitor/dist

CMD [ "pnpm", "start" ]
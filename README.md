# sveltekit todoapps api

this repo is an example implementation to create restfull api with svelkit and add integration testing

## what in this repo ?

- svelkit (js framework)
- playwright (test package)
- drizzle-orm (orm)
- drizzle-kit (orm cli helper)
- mysql2 (mysql driver)
- joi (validation package)
- bcrypt (hash package)
- winston (logger package)
- uuid (for generate token)

## Developing

```bash
pnpm install
cp .env.example .env
pnpm migration:generate
pnpm migration:push #choose env development
pnpm run dev
```

notes:

- check .env and create database according to your development environment
- check .env.test before running test and create database according test environment
- recommended to use different database for development and testing

## Testing

```bash
pnpm migration:generate
pnpm migration:push #choose env test
pnpm run test
```

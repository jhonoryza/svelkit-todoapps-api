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

## Developing

```bash
pnpm install
cp .env.example .env
pnpm migrate
pnpm run dev
```

notes:

- check .env and create database according to your development environment
- check .env.test before running test and create database according test environment

## Testing

```bash
pnpm run migrate:test
pnpm run test
```

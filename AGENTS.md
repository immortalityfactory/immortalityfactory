# Repository Guidelines

## Project Structure & Module Organization
- `src/app` hosts the Next.js App Router pages, layouts, and route handlers. Co-locate page-specific hooks and styles inside the route segment to keep boundaries clear.
- `src/components` contains shared UI primitives; prefer composition and export via index files to avoid deep import paths.
- `src/lib` stores cross-cutting utilities (API clients, helpers). Keep each module framework-agnostic.
- `src/i18n` provides locale definitions used by `next-intl`; add new language bundles here and wire them through the middleware.
- `public` holds static assets, while `Docs/` captures reference architecture notes and research artifacts.

## Build, Test, and Development Commands
- `pnpm dev` spins up the Next.js development server with hot reloading on http://localhost:3000.
- `pnpm build` creates the production bundle; run before deploying to confirm the route tree compiles cleanly.
- `pnpm start` serves the output of `pnpm build` for smoke-testing production behavior.
- `pnpm lint` executes `next lint` with the repo ESLint config; fix or document any warnings before review.

## Coding Style & Naming Conventions
- TypeScript is the default; use `strict`-friendly patterns and prefer explicit return types for libraries in `src/lib`.
- Follow the ESLint + `eslint-config-next` rules; rely on editor integrations to auto-fix trivial issues.
- Tailwind CSS powers styling—prefer utility classes and extract shared patterns into typed components.
- Use lower-kebab for route segment folders, PascalCase for React components, and camelCase for functions and variables.

## Testing Guidelines
- Add component and integration tests with `@testing-library/react` under `src/__tests__` or alongside components as `<name>.test.tsx`.
- Include locale-sensitive assertions when touching `src/i18n` to prevent regression.
- Target key user journeys (routing, form flows) and aim for meaningful coverage rather than a numeric quota.

## Commit & Pull Request Guidelines
- Write imperative, scope-focused commit messages (e.g., `Add hero CTA analytics`). Squash incidental fixes into the related change.
- Open PRs only after `pnpm build` and `pnpm lint` pass; summarize intent, list key changes, and link issues or product briefs.
- Attach screenshots or short clips for UI-visible updates, and note any follow-up tasks in a checklist.

## Security & Configuration Tips
- Keep secrets out of the repo; define runtime configuration via `.env.local` and document required keys in `Docs/TECH_DESIGN.md`.
- Review middleware and API handlers for localization or authentication changes to ensure they degrade gracefully for unauthenticated users.

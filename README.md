# ai-agent-demo-app

A small, deliberately minimal demo application used to test
automation-impact-agent. This repo plays the role of the "Development"
repository: a real app whose Pull Requests get analyzed for automation
impact.

It's a genuinely runnable app - a React (Vite) frontend with a small
Express backend behind `/api/users/login` - so the Playwright/Cucumber
suite in `ai-agent-demo-automation` can actually execute against it, not
just be diffed as static source.

## Running locally

```bash
npm install
npm run dev
```

This starts the Vite dev server on http://localhost:3000 and the Express
API on http://localhost:4000 (Vite proxies `/api/*` to it). Log in with:

- Email: `test.user@example.com`
- Password: `SuperSecret123`

## Structure

```
src/
  pages/       Login and Dashboard pages
  components/  Reusable Button, InputField
  services/    AuthService (business logic + validation before the API call)
  api/         userApi (fetch wrapper for the backend)
  validation/  Login input validation rules
  types/       Shared TypeScript types
server/        Express backend (in-memory single test user)
```

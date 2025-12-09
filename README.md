# Expert Dashboard

This repository contains the Expert Dashboard Next.js application (dashboard/). The project includes a polished UI, animations, and several management pages (users, payments, inbox, calendar, search, settings, projects).

This root README provides quick instructions for preparing and publishing the repository to GitHub without modifying project behavior.

---

## Quick start (development)

```powershell
cd dashboard
npm install
npm run dev
# open http://localhost:3000 (or port reported by Next)
```

## Build (production)

```powershell
cd dashboard
npm run build
npm start
```

## What I changed (non-functional, professionalizing)

- Created a top-level `.gitignore` to exclude build artifacts and env files.
- Added this README with clear instructions and recommended workflow.
- Added comments and a small constant to `dashboard/hooks/use-auth.tsx` (no runtime changes).

## Recommended GitHub publish steps

1. Initialize a repository and commit all files:

```powershell
git init
git add .
git commit -m "chore: initial commit - Expert Dashboard"
```

2. Create a repository on GitHub and add it as remote, then push:

```powershell
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
git branch -M main
git push -u origin main
```

3. Optionally enable GitHub Pages / Vercel for deployment (recommended: Vercel for Next.js).

## Notes

- I did not modify any runtime logic or APIs. All changes are documentation and small stylistic improvements.
- If you want a full `.github/workflows/ci.yml` to run lint/build on push, tell me and I will scaffold a CI workflow.

---

If you want the project prepared with a LICENSE, CONTRIBUTORS, or CI pipeline before pushing, I can add those as well.

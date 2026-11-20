# inamjadoon.github.io

Academic portfolio of **Inam Ullah Khan** — live at **https://inamjadoon.github.io**

React + Vite + TypeScript + Tailwind, deployed free on GitHub Pages. All content lives in `content/` as small Markdown/JSON files, so updating the site never requires touching code.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # checks content, type-checks, builds to dist/
```

## Add something new
Copy a template from `content/_templates/`, rename it, fill it in, then push to `main`. The site rebuilds and goes live in about a minute.

| I want to add…                         | Copy template      | Into folder              |
| -------------------------------------- | ------------------ | ------------------------ |
| A project                              | `project.md`       | `content/projects/`      |
| A research area (filter card)          | edit `areas.json`  | `content/`               |
| A hackathon or programming contest     | `hackathon.md`     | `content/hackathons/`    |
| An award, contest rank, scholarship    | `honor.md`         | `content/honors/`        |
| A course certificate                   | `certificate.md`   | `content/certificates/`  |
| A job / internship / training          | `experience.md`    | `content/experience/`    |
| A paper (adds a Publications section)  | `publication.md`   | `content/publications/`  |

- File name = URL: `content/projects/my-app.md` → `/projects/my-app`
- Images go in `public/images/<folder>/<name>/` and are referenced as `/images/...`
- `featured: true` puts a project on the home page; `order: 1` pins it first
- If you make a mistake (missing field, wrong date format), `npm run build` tells you the file and the field

Profile text, links, photo and headline numbers: `content/profile.json`. Skills: `content/skills.json`.

**New CV:** put it in the root as `Inam__CV.pdf` (never committed), then run `python scripts/redact-cv.py` to create the public, phone-free `public/cv.pdf`.
**New photo:** `python scripts/process-photo.py path/to/photo.jpg`.

## Deploy (one-time setup)
1. Create a **public** repo named exactly `inamjadoon.github.io` on GitHub.
2. Push this folder to it (`main` branch).
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` now deploys automatically (`.github/workflows/deploy.yml`).

Project rules and design decisions: see `CLAUDE.md`.

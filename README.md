# YUZ Atlas — MVP 0.1

**Follow the sound.** A minimal interactive atlas of connected subgenres and scenes.

## Deploy with GitHub + Vercel
1. Create a private GitHub repository named `yuz-atlas`.
2. Upload `index.html`, `genres.json`, and `README.md` to the **repository root** (not inside a nested folder). Commit the files.
3. In your **existing** Vercel project `atlas-mvp`, open Settings → Git and connect this repository. Do **not** create a separate Vercel project.
4. Use Framework Preset **Other** (static); no build command. The deploy should serve `index.html` from the project root.
5. Check the existing project production URL. Future commits to the production branch should automatically deploy.

## Contents
- `index.html`: complete self-contained website including the live embedded dataset and scripts.
- `genres.json`: structured copy of the data for later development; not fetched by the static site.

## Notes
Initial graph: 55 entries and 72 interpretive connections. This is an editorial prototype, not a definitive genealogy. Submissions, profiles, follows, payments and label spotlights are future stages, not in this release.

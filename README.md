# YUZ Atlas — MVP 0.3

**Follow the sound.** A monochrome interactive map of underground music, now expanded beyond post-internet music.

## What's included
- 169 connected genres, subgenres, scenes, approaches and descriptive labels in eight overlapping musical territories.
- 241 interpretive links. These are not definitive genealogies.
- Search, territory filters, drag, zoom, related-genre details and shareable `#genre=...` links.
- Mobile-friendly display. On the full map, major names appear first; selecting a territory reveals more labels.
- Distinct **Atlas** (indexed catalogue) and **Editorial** (planned selective review/feature area) concepts. No fake editorial catalogue is shown.

## Upload to your existing GitHub repository
1. Open the **existing** `yuz-atlas` GitHub repository.
2. Upload/replace the files from this folder at the **repository root**: `index.html`, `atlas-data.js`, `README.md`.
3. If GitHub asks, confirm **Replace** for `index.html` and `README.md`. `atlas-data.js` is a new file.
4. If the old `genres.json` file remains from a previous release, it is now unused and can be deleted separately to avoid confusion.
5. Commit changes to the branch Vercel uses for production (usually `main`).
6. The **existing** connected Vercel `atlas-mvp` project should deploy the new commit automatically. Check deployments and visit `https://yuz.media`. Do NOT create another Vercel project.

## Technical layout
- `index.html` — the complete app, styling and interaction logic.
- `atlas-data.js` — the one authoritative dataset as `window.YUZ_DATA`. Edit this to add future nodes or links.
- `README.md` — guidance.

No build command, framework or Supabase required for this static MVP. Works through ordinary static hosting and when opened locally (both HTML and data JS must stay in the same folder).

## Editorial notes
This is a **draft taxonomy** requiring verification before being described as a reference archive. Some entries are scenes, musical techniques, sonic descriptors or umbrella labels instead of formal genres; a `type` field distinguishes them. “Glitch folk” is marked provisional. “Soundscape” is marked as a sonic characteristic. Dates are approximate.

Cataloguing a sound is **not the same as reviewing or endorsing artists** in it. Paid spots, if introduced later, should be clearly marked and editorially separate. Artist and recording listings, user accounts, follows, submissions, and paid spotlights are NOT in this build.

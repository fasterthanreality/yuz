# YUZ development

Business owner: fasterthanreality, the user's limited company and umbrella for their projects.

Source: https://github.com/fasterthanreality/yuz
Local project: /Users/avw-macbook/Documents/Codex/YUZ
Vercel: fasterthanreality / yuz (prj_0fLWvCMIuXuiG0k20hKbDRbMaEiE).

## Edit and review

1. Fetch current main and create a change branch. Preserve uncommitted work.
2. Edit index.html and atlas-data.js; genres.json is legacy, unused data.
3. Run `node scripts/check.mjs` (Node 24). Serve locally with `python3 -m http.server 8000`.
4. Check desktop and mobile: each territory, search, genre selection, related links, zoom and shared genre URLs.
5. Commit the change branch. Push and open a pull request when GitHub write access is available.
6. Verify Vercel creates a preview from that branch, and test the preview. Branch preview automation has not yet been verified.
7. Review checks and preview before merging. Treat merging main as a production release; the current deployment was built from main via Git.
8. Verify production after release and record its commit and deployment ID. Keep the previous working deployment available for rollback.

Never replace production using ZIP uploads. Compare proposed release files against source on a branch. Atlas 0.4 remains unavailable locally; this navigation change is based on 0.3 and is not the artist-discovery release.

## Verified baseline, 29 October 2026

Production deployment dpl_4UhHEAKpyLMXVyZSrXYvYGtiQdB8, commit d5aa9e73fdc54435eb3b9715e20abd27f9eb808a, state READY, Git source main. Aliases include yuz.media and www.yuz.media. Preview URLs require Vercel authentication. No branch protections or required checks have been verified/configured.

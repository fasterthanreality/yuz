# YUZ Atlas

A music discovery platform owned by fasterthanreality.

## Development and Releases

- Working source: this repository, https://github.com/fasterthanreality/yuz.
- Current development: artist discovery pilot with eight overlapping entrances.
- Release register and recovery instructions: [releases/README.md](releases/README.md).
- Local release packages: `/Users/avw-macbook/Documents/Codex/YUZ-Releases`.
- Hosting: existing Vercel project fasterthanreality / yuz. Never create a replacement project to release an update.

Run `node scripts/check.mjs` to validate source and catalogue references. Serve locally with `python3 -m http.server 8000`.

`index.html` contains the interface; `atlas-data.js` contains the map; `artists-data.js` contains the pilot artist selection. `genres.json` is legacy unused data.

The taxonomy and artist associations are editorial suggestions. They express connections and possible listening routes rather than exclusive or definitive classifications.

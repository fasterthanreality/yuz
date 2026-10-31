# YUZ Releases

Owner: fasterthanreality. The Git repository is the source of truth.

## Development

Use a change branch, commit completed work, and push that branch to GitHub. Test a Vercel preview before approving a production release. Preview deployment alone does not back up the source or publish a release. Never merge main solely to make a backup.

## Releases and backups

Keep immutable numbered snapshots under `/Users/avw-macbook/Documents/Codex/YUZ-Releases` (outside the working repository). Each contains:

- source.zip: the complete tracked source at the recorded commit.
- history.bundle: all local Git branches, tags and their history at snapshot time.
- manifest.json: exact source commit and SHA-256 checksums.

Create a snapshot only from committed work:

`python3 scripts/snapshot.py VERSION --ref REF --output /Users/avw-macbook/Documents/Codex/YUZ-Releases`

Use `v0.4.0-rc.1` for a proposed release and `v0.4.0` only after release approval and production verification. Never overwrite an existing snapshot. A candidate is not a live release.

Record each version in releases/versions.json, including source commit, status, preview URL and production deployment when applicable. Pin it with an annotated Git tag. Push branches and tags explicitly; do not push main without release approval.

## Recovery

For individual files: extract source.zip into a new folder, never over working files.

For full history: `git clone /absolute/path/history.bundle recovered-yuz`, then check out the commit in manifest.json. Run source checks and a preview before any production restoration.

Local copies protect against editing mistakes, not loss of this computer. GitHub provides an off-device copy once pushes succeed. An optional Google Drive YUZ / Releases folder can hold copies of the entire snapshot folders. Never store credentials or .env files there. Cloud backup is only confirmed after an upload is verified.

## Historical gap

The original ChatGPT-generated Atlas 0.4 ZIP was never recovered. The current 0.4 pilot was built in this repository and is independently recoverable; it is not asserted to match that missing ZIP.

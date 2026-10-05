# OMNI Guard Web — Malwarebytes for Devs

24/7 guard for GitHub repos against supply-chain injection.

**Status:** v0 scaffold — clean public repo, signed history from commit 1.

## What it does (v1, $0 stack)
- `POST /api/scan` — read-only scanner: blob sizes + marker grep + 1500-space padding detector. No `contents:write`.
- Cloudflare Worker cron (free) calls scanner every 15 min — replaces frozen Actions as active detection.
- Dormant `malware-tripwire.yml` in-repo as last line (auto-enables when billing resumes).

## Markers guarded
`GSkqNNyuJw`, `BLOCK_MULTIPLE`, `NONCE_FANOUT`, `INDEXER_URL`, `global.r=require`, `_$jsoToArr`
+ oversize `postcss.config.*>2KB`, `eslint.config.*>2KB`, `tailwind.config.*>8KB`, banned `dist/setup.js`, `fa-solid-500.woff2`.

## Quick start
1. Install GitHub App (read + issues only) on this repo
2. `npm i && npm run dev` → open `/` → Connect → Scan
3. Deploy to Vercel Hobby (1 project free) + set `GITHUB_APP_*`

Engine spec: `sourcenode-dev/omni` — `docs/security-incident-2026-09-supply-chain-injection.md`

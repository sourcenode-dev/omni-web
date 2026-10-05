import { NextResponse } from "next/server";

const MARKERS = [
  "GSkqNNyuJw",
  "BLOCK_MULTIPLE",
  "NONCE_FANOUT",
  "INDEXER_URL",
  "global.r=require",
  "_$jsoToArr",
];

export async function POST(req: Request) {
  const { owner, repo, branch = "main" } = await req.json().catch(() => ({}));
  if (!owner || !repo) {
    return NextResponse.json({ error: "owner, repo required" }, { status: 400 });
  }
  // v0: fetch tree + blob sizes via public API (no token). Full grep needs App token — phase 2.
  const treeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!treeRes.ok) {
    return NextResponse.json({ error: `tree fetch failed: ${treeRes.status}` }, { status: 502 });
  }
  const tree = await treeRes.json();
  const findings: string[] = [];
  for (const t of tree.tree ?? []) {
    const p: string = t.path ?? "";
    const s: number = t.size ?? 0;
    if (/^postcss\.config\..*/.test(p) && s > 2000) findings.push(`OVERSIZE ${p} (${s}B)`);
    if (/^eslint\.config\..*/.test(p) && s > 2000) findings.push(`OVERSIZE ${p} (${s}B)`);
    if (/^tailwind\.config\..*/.test(p) && s > 8000) findings.push(`OVERSIZE ${p} (${s}B)`);
    if (p === "dist/setup.js" || p === "public/fonts/fa-solid-500.woff2")
      findings.push(`BANNED ${p}`);
  }
  return NextResponse.json({
    repo: `${owner}/${repo}@${branch}`,
    markers: MARKERS,
    findings,
    clean: findings.length === 0,
    note: "v0 size/banned check only. Content grep + merge-rewrite check needs GitHub App token (phase 2).",
  });
}

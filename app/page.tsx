export default function Home() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui" }}>
      <h1>OMNI Guard</h1>
      <p>24/7 guard for GitHub repos. Connect → Scan → Guard.</p>
      <ul>
        <li>Read-only scan: markers + sizes + padding-hide</li>
        <li>Merge-rewrite check: parents vs tree</li>
        <li>No auto-push in v1 — report + PR only</li>
      </ul>
      <p>Status: scaffold clean. API: POST /api/scan</p>
    </main>
  );
}

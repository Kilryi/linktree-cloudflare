/**
 * GET /qr
 * Renders a minimal HTML page with a QR code for vulkyri.com.
 * Uses the free QR API (no external JS dependency on the main page).
 * Visitors can long-press / right-click the image to save it.
 */
export async function onRequestGet() {
  const url = 'https://vulkyri.com';
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&format=png&color=6aa3ff&bgcolor=0f0f0e&margin=2`;
  const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>QR Code · vulkyri.com</title>
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin />
  <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,600,700&display=swap" />
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{
      min-height:100dvh;display:flex;flex-direction:column;
      align-items:center;justify-content:center;gap:1.5rem;
      background:#0f0f0e;color:#e8e7e4;
      font-family:'Satoshi',system-ui,sans-serif;padding:2rem;
    }
    h1{font-size:1.1rem;font-weight:700;color:#e8e7e4;letter-spacing:-0.02em}
    p{font-size:0.8rem;color:#7a7876;text-align:center;max-width:22ch;line-height:1.6}
    .qr-wrap{
      padding:1rem;background:#fff;border-radius:16px;
      box-shadow:0 12px 32px rgba(0,0,0,0.4);
    }
    .qr-wrap img{display:block;width:300px;height:300px;border-radius:4px}
    a.btn{
      display:inline-block;padding:0.7rem 1.4rem;
      background:#6aa3ff;color:#0f0f0e;
      border-radius:999px;font-weight:700;font-size:0.85rem;
      text-decoration:none;transition:filter 150ms ease;
    }
    a.btn:hover{filter:brightness(1.1)}
    a.back{font-size:0.8rem;color:#7a7876;text-decoration:none}
    a.back:hover{color:#6aa3ff}
  </style>
</head>
<body>
  <h1>vulkyri.com QR Code</h1>
  <div class="qr-wrap">
    <img src="${qrApiUrl}" alt="QR code for vulkyri.com" width="300" height="300" loading="lazy" />
  </div>
  <p>Scan to visit vulkyri.com · Long-press or right-click the image to save it</p>
  <a class="btn" href="${qrApiUrl}" download="vulkyri-qr.png">Download QR</a>
  <a class="back" href="/">&larr; Back to vulkyri.com</a>
</body>
</html>`;
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=86400' }
  });
}

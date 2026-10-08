HostGPU website (hostgpu.online)
================================
Static site: index.html, style.css, app.js. No build step.

Deploy: upload all files to your web host's public_html / www folder
(or drag the folder into Netlify, Cloudflare Pages or Vercel), then point
hostgpu.online to it in your DNS settings.

Edit: rate card + fees in pricing.js (CONFIG). Sample listings in app.js.
Colors are CSS variables at the top of style.css.
The Login / Sign up / Rent buttons need a backend (accounts, billing, provisioning).

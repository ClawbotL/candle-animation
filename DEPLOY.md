# Deploy Guide

This is a static site — a single `index.html` file. Deploy it anywhere that serves static files.

---

## Netlify

**Option 1: Drag & Drop**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `candle-animation` folder onto the page
3. Done — your site is live at a Netlify subdomain

**Option 2: GitHub Integration**
1. Push your project to a GitHub repository
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import from Git"
3. Connect your repository
4. Deploy settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `.` or `candle-animation`
5. Click "Deploy site"

**Custom Domain:**
1. Netlify → Site settings → Domain management → Add custom domain
2. Configure DNS as instructed

---

## Vercel

**Option 1: Vercel CLI**
```bash
npm i -g vercel
cd candle-animation
vercel
```
Follow prompts — your site is deployed in seconds.

**Option 2: GitHub Integration**
1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Framework Preset: "Other"
5. Deploy

**Custom Domain:**
1. Vercel → Project → Settings → Domains
2. Add your domain and follow DNS instructions

---

## GitHub Pages

1. Push your project to a GitHub repository
2. Go to **Settings** → **Pages** (under "Code and automation")
3. Source: **Deploy from a branch**
4. Branch: `main` / root (or `gh-pages` branch)
5. Click **Save**
6. Wait 1-2 minutes — your site will be at: `https://<username>.github.io/<repo-name>/`

**Note:** If your repository is named `<username>.github.io`, it will serve at the root URL directly.

---

## Cloudflare Pages

1. Push to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Create a project → Connect GitHub
4. Select repository
5. Build settings:
   - **Build command:** (leave empty)
   - **Build output directory:** `.` or `/candle-animation`
6. Deploy

---

## Generic Static Host (Nginx/Apache/VPS)

1. Upload `index.html` to your web server
2. Point your web server to serve the file

**Nginx example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/candle-animation;
    index index.html;
}
```

**Apache (`.htaccess`):**
```apache
DirectoryIndex index.html
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Fonts not loading | Check internet connection — Google Fonts CDN required |
| Animations janky | Enable hardware acceleration (GPU) in browser settings |
| Mobile layout broken | Ensure `<meta name="viewport">` is present in `<head>` |
| Blank page | Check browser console for errors — likely a path issue |

---

## Performance

This site is extremely lightweight:
- **Total size:** ~14KB (HTML + CSS + JS)
- **No build step required**
- **No JavaScript frameworks**
- **Fonts loaded async** via `preconnect` hints

Load time should be near-instant on any connection.

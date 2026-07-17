# Burrec launch checklist

Work top to bottom; check things off as you go. Reference docs: `nakama/DEPLOY.md`.
Domain: **burrec.com** (registered at Namecheap, DNS on Cloudflare).

---

## 0. Decisions / prerequisites

- [x] Domain: `burrec.com`
- [x] Droplet exists on DigitalOcean (Docker Marketplace image — Docker +
      compose plugin preinstalled)
- [ ] Confirm SSH access: `ssh root@<droplet-ip>` — **need the droplet's
      IP/hostname to proceed**

## 1. Git

- [x] Feature branch merged into `master` and pushed to GitHub

## 2. DNS (Cloudflare)

- [ ] Add **A record**: `burrec.com` (apex, `@`) → droplet IP, **DNS only
      (grey cloud)**
      *(Grey cloud = Caddy gets Let's Encrypt certs with zero config. If you
      later want the orange cloud: SSL/TLS mode "Full (strict)" and keep
      port 80 open.)*
- [ ] Optional: `www` → same droplet IP if you want `www.burrec.com` to also
      resolve (not required — Caddy in this repo only serves the apex)
- [ ] Verify propagation: `dig burrec.com +short` shows the droplet IP

## 3. Email — Resend (registration + password-reset emails)

- [ ] Create account at resend.com (free: 3,000 emails/month)
- [ ] Domains → Add domain → `burrec.com`
- [ ] Copy the DKIM/SPF/MX records it shows into Cloudflare — all **DNS
      only**
- [ ] Wait until Resend shows **Verified**
- [ ] API Keys → Create (sending access only) → save it for step 5's
      `.env.prod`

## 4. Google sign-in (free)

- [ ] console.cloud.google.com → APIs & Services → OAuth consent screen →
      External, app name + support email → Publish
- [ ] Credentials → Create credentials → OAuth client ID → **Web
      application**
- [ ] Authorized JavaScript origins: `https://burrec.com` **and**
      `http://localhost:3000` (dev)
- [ ] No redirect URIs needed (popup flow)
- [ ] Copy the client ID for step 6's `.env.production`

## 5. Droplet: server stack

- [ ] `mkdir -p /opt/burrec-nakama` on the droplet
- [ ] Copy from `nakama/`: `docker-compose.prod.yml`, `Caddyfile`, `local.yml`
- [ ] Build + copy the server bundle: `pnpm nakama:build` → `scp -r
      nakama/build root@<droplet-ip>:/opt/burrec-nakama/`
- [x] Create `/opt/burrec-nakama/.env.prod` (done 2026-07-17 — all secrets
      generated with `openssl rand -hex 24`):
      ```
      NAKAMA_DOMAIN=burrec.com
      NAKAMA_SERVER_KEY=<generated>
      SESSION_REFRESH_KEY=<generated>
      RUNTIME_HTTP_KEY=<generated>
      CONSOLE_USERNAME=<generated>
      CONSOLE_PASSWORD=<generated>
      CONSOLE_SIGNING_KEY=<generated>
      POSTGRES_PASSWORD=<generated>
      RESEND_API_KEY=            # empty until step 3 is done
      EMAIL_FROM=Burrec <noreply@burrec.com>
      APPLE_BUNDLE_ID=
      ```
- [ ] Start: `cd /opt/burrec-nakama && docker compose -f
      docker-compose.prod.yml --env-file .env.prod up -d`
- [ ] Check module loaded: `docker compose -f docker-compose.prod.yml logs
      nakama | grep "ludo module"`

## 6. Client build + site deploy

- [ ] Edit `.env.production` at the repo root:
      ```
      VITE_NAKAMA_HOST=burrec.com
      VITE_NAKAMA_PORT=443
      VITE_NAKAMA_SSL=true
      VITE_NAKAMA_KEY=<same NAKAMA_SERVER_KEY as .env.prod>
      VITE_GOOGLE_CLIENT_ID=<from step 4>
      VITE_APPLE_CLIENT_ID=
      ```
- [ ] `pnpm build` (regenerates `docs/` — keep `docs/ROADMAP.md`)
- [ ] Copy site to droplet: `rsync -av --delete docs/
      root@<droplet-ip>:/opt/burrec-nakama/site/`
      *(no container restart needed — Caddy serves the files directly)*
- [ ] Commit the rebuilt `docs/` if you also keep the GitHub Pages mirror

## 7. Smoke test (production)

- [ ] `https://burrec.com` loads the game
- [ ] Guest: enter name → Play now → reaches a lobby
- [ ] Register with a real email → verification email arrives **from
      burrec.com** (check spam the first time)
- [ ] Click the verify link → "Email verified"
- [ ] Sign out → Forgot password → reset email arrives → set new password →
      sign in with it
- [ ] "Continue with Google" works on the prod domain
- [ ] Two devices/browsers: create private room + join by code → play a few
      turns

## 8. Apple sign-in (later — needs $99/yr Developer Program)

The button stays hidden until these are set, so this can wait.

- [ ] Join the Apple Developer Program
- [ ] Identifiers → create **App ID** (e.g. `com.burrec.app`) with "Sign in
      with Apple" enabled
- [ ] Identifiers → create **Services ID** (e.g. `com.burrec.web`) with Sign
      in with Apple: domain `burrec.com`, return URL `https://burrec.com/`
      (verify the domain when prompted)
- [ ] Set the Services ID in `.env.production` → `VITE_APPLE_CLIENT_ID` →
      `pnpm build` + redeploy site (step 6)
- [ ] Set the same value in droplet `.env.prod` → `APPLE_BUNDLE_ID` →
      `docker compose ... up -d` again
- [ ] Smoke test "Continue with Apple" on the prod domain

---

**Later updates cheat-sheet**

| What changed | Do |
|---|---|
| Server code (`nakama/src/`) | `pnpm nakama:build` → scp `build/` → restart nakama container |
| Client code (`src/`) | `pnpm build` → rsync `docs/` → droplet `site/` |
| `.env.prod` values | edit on droplet → `docker compose ... up -d` |
| `.env.production` values | rebuild client (Vite bakes them in) |

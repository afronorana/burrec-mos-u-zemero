# Burrec launch checklist

Work top to bottom; check things off as you go. Reference docs: `nakama/DEPLOY.md`.
Domain: **burrec.com** (registered at Namecheap, DNS on Cloudflare).

---

## 0. Decisions / prerequisites

- [x] Domain: `burrec.com`
- [x] Droplet exists on DigitalOcean (Docker Marketplace image — Docker +
      compose plugin preinstalled)
- [x] SSH access confirmed: `146.190.25.250` (key-based, `ssh-copy-id` done
      2026-07-17)

## 1. Git

- [x] Feature branch merged into `master` and pushed to GitHub

## 2. DNS (Cloudflare) — **currently the only thing blocking go-live**

- [ ] burrec.com's nameservers still point at Namecheap's default parking
      service (confirmed 2026-07-17: `dig burrec.com +short` →
      `162.255.119.95`, Namecheap's parking IP, not the droplet). If the
      domain hasn't been added to a Cloudflare zone yet, do that first and
      update the nameservers at Namecheap to the ones Cloudflare assigns.
- [ ] Add **A record**: `burrec.com` (apex, `@`) → `146.190.25.250`, **DNS
      only (grey cloud)**
      *(Grey cloud = Caddy gets Let's Encrypt certs with zero config. If you
      later want the orange cloud: SSL/TLS mode "Full (strict)" and keep
      port 80 open.)*
- [ ] Optional: `www` → same droplet IP if you want `www.burrec.com` to also
      resolve (not required — Caddy in this repo only serves the apex)
- [ ] Verify propagation: `dig burrec.com +short` shows `146.190.25.250`
- [ ] Once it resolves, restart Caddy to force an immediate retry against
      Let's Encrypt **production** (it's currently backed off to the
      staging CA after failing against the parking page — harmless, but
      won't self-heal instantly): `ssh root@146.190.25.250 'docker compose
      -f /opt/burrec-nakama/docker-compose.prod.yml --env-file
      /opt/burrec-nakama/.env.prod restart caddy'`

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

## 5. Droplet: server stack — **done 2026-07-17**

- [x] `/opt/burrec-nakama` provisioned, `docker-compose.prod.yml` +
      `Caddyfile` + `local.yml` copied
- [x] Server bundle built + copied (`pnpm nakama:build` → scp)
- [x] `.env.prod` created with generated secrets (`openssl rand -hex 24`
      each): `NAKAMA_SERVER_KEY`, `SESSION_REFRESH_KEY`, `RUNTIME_HTTP_KEY`,
      `CONSOLE_USERNAME`, `CONSOLE_PASSWORD`, `CONSOLE_SIGNING_KEY`,
      `POSTGRES_PASSWORD` — all server-only, never left the droplet/this
      machine, not in git (`.env.prod` is gitignored). `RESEND_API_KEY`
      empty until step 3.
- [x] Stack started (`docker compose ... up -d`), all 3 containers healthy
- [x] `"burrec ludo module loaded"` confirmed in nakama logs, zero
      "insecure default parameter" warnings
- [x] ufw opened for 80/443; unused 2375/2376 (docker API) rules removed

## 6. Client build + site deploy — **done 2026-07-17, except Google**

- [x] `.env.production` updated: `VITE_NAKAMA_HOST=burrec.com`,
      `VITE_NAKAMA_KEY=<the real NAKAMA_SERVER_KEY>` (committed to git —
      intentional, Vite bakes `VITE_*` into the public JS bundle anyway)
- [ ] `VITE_GOOGLE_CLIENT_ID` still empty — fill in once step 4 is done,
      then `pnpm build` + rsync again
- [x] `pnpm build` run, `docs/` rsynced to droplet `site/`
- [x] Rebuilt `docs/` committed (GitHub Pages mirror stays in sync)
- [ ] **`docs/ROADMAP.md` was deleted by this build** (Vite cleans `docs/`
      before writing; the file was never tracked in git, so it isn't
      recoverable from history) — restore from a backup if one exists, or
      recreate it, and this time `git add` it so a future rebuild can't
      lose it again

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

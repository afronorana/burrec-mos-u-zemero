# Burrec launch checklist

Work top to bottom; check things off as you go. Reference docs: `nakama/DEPLOY.md`.
Replace `play.example.com` with your real domain everywhere.

---

## 0. Decisions / prerequisites

- [ ] Pick the final domain/subdomain for the game (one host serves site + API), e.g. `play.example.com`
- [ ] Droplet exists on DigitalOcean with Docker + compose plugin installed
- [ ] You can SSH to it: `ssh root@<droplet-ip>`

## 1. Unpushed git work (from earlier sessions)

- [ ] Push `afrons-game-ui` (commit `9735cd6`, AppGameCode lettersOnly):
      `cd ../afrons-game-ui && git push` (if SSH agent is empty: `ssh-add`, or
      `git -c credential.helper='!gh auth git-credential' push https://github.com/afronorana/afrons-game-ui.git master:master`)
- [ ] Push this repo's branch / merge to master (~20+ commits incl. accounts feature `8a7e3f0`)

## 2. DNS (Cloudflare — domain registered at Namecheap)

- [ ] Add **A record**: `play` → droplet IP, **DNS only (grey cloud)**
      *(Grey cloud = Caddy gets Let's Encrypt certs with zero config. If you later want
      the orange cloud: SSL/TLS mode "Full (strict)" and keep port 80 open.)*

## 3. Email — Resend (registration + password-reset emails)

- [ ] Create account at resend.com (free: 3,000 emails/month)
- [ ] Domains → Add domain → `example.com`
- [ ] Copy the DKIM/SPF/MX records it shows into Cloudflare — all **DNS only**
- [ ] Wait until Resend shows **Verified**
- [ ] API Keys → Create (sending access only) → save it for step 5's `.env.prod`

## 4. Google sign-in (free)

- [ ] console.cloud.google.com → APIs & Services → OAuth consent screen → External, app name + support email → Publish
- [ ] Credentials → Create credentials → OAuth client ID → **Web application**
- [ ] Authorized JavaScript origins: `https://play.example.com` **and** `http://localhost:3000` (dev)
- [ ] No redirect URIs needed (popup flow)
- [ ] Copy the client ID for step 6's `.env.production`

## 5. Droplet: server stack

- [ ] `mkdir -p /opt/burrec-nakama` on the droplet
- [ ] Copy from `nakama/`: `docker-compose.prod.yml`, `Caddyfile`, `local.yml`
- [ ] Build + copy the server bundle: `pnpm nakama:build` → `scp -r nakama/build root@droplet:/opt/burrec-nakama/`
- [ ] Create `/opt/burrec-nakama/.env.prod`:
      ```
      NAKAMA_DOMAIN=play.example.com
      NAKAMA_SERVER_KEY=<long random string>
      POSTGRES_PASSWORD=<long random string>
      RESEND_API_KEY=<re_... from step 3>
      EMAIL_FROM=Burrec <noreply@example.com>
      APPLE_BUNDLE_ID=
      ```
- [ ] Start: `cd /opt/burrec-nakama && docker compose -f docker-compose.prod.yml --env-file .env.prod up -d`
- [ ] Check module loaded: `docker compose -f docker-compose.prod.yml logs nakama | grep "ludo module"`

## 6. Client build + site deploy

- [ ] Edit `.env.production` at the repo root:
      ```
      VITE_NAKAMA_HOST=play.example.com
      VITE_NAKAMA_PORT=443
      VITE_NAKAMA_SSL=true
      VITE_NAKAMA_KEY=<same NAKAMA_SERVER_KEY as .env.prod>
      VITE_GOOGLE_CLIENT_ID=<from step 4>
      VITE_APPLE_CLIENT_ID=
      ```
- [ ] `pnpm build` (regenerates `docs/` — keep `docs/ROADMAP.md`)
- [ ] Copy site to droplet: `rsync -av --delete docs/ root@droplet:/opt/burrec-nakama/site/`
      *(no container restart needed — Caddy serves the files directly)*
- [ ] Commit the rebuilt `docs/` if you also keep the GitHub Pages mirror

## 7. Smoke test (production)

- [ ] `https://play.example.com` loads the game
- [ ] Guest: enter name → Play now → reaches a lobby
- [ ] Register with a real email → verification email arrives **from your domain** (check spam the first time)
- [ ] Click the verify link → "Email verified"
- [ ] Sign out → Forgot password → reset email arrives → set new password → sign in with it
- [ ] "Continue with Google" works on the prod domain
- [ ] Two devices/browsers: create private room + join by code → play a few turns

## 8. Apple sign-in (later — needs $99/yr Developer Program)

The button stays hidden until these are set, so this can wait.

- [ ] Join the Apple Developer Program
- [ ] Identifiers → create **App ID** (e.g. `com.example.burrec`) with "Sign in with Apple" enabled
- [ ] Identifiers → create **Services ID** (e.g. `com.example.burrec.web`) with Sign in with Apple:
      domain `play.example.com`, return URL `https://play.example.com/` (verify the domain when prompted)
- [ ] Set the Services ID in `.env.production` → `VITE_APPLE_CLIENT_ID` → `pnpm build` + redeploy site (step 6)
- [ ] Set the same value in droplet `.env.prod` → `APPLE_BUNDLE_ID` → `docker compose ... up -d` again
- [ ] Smoke test "Continue with Apple" on the prod domain

---

**Later updates cheat-sheet**

| What changed | Do |
|---|---|
| Server code (`nakama/src/`) | `pnpm nakama:build` → scp `build/` → restart nakama container |
| Client code (`src/`) | `pnpm build` → rsync `docs/` → droplet `site/` |
| `.env.prod` values | edit on droplet → `docker compose ... up -d` |
| `.env.production` values | rebuild client (Vite bakes them in) |

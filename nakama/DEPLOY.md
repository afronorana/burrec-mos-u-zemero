# Deploying Burrec (DigitalOcean droplet, one domain)

One domain (e.g. `play.example.com`) serves everything from the droplet:

- Caddy terminates TLS and serves the built client (`site/`) at `/`
- `/v2/*` (Nakama REST) and `/ws` (wss socket) are proxied to nakama:7350
- Auth emails (verify / password reset) are sent through Resend and link back
  to the same domain

Same origin for site and API means no CORS, one OAuth origin, one TLS cert.

## DNS (Namecheap domain, Cloudflare DNS)

1. In Cloudflare, add an **A record** for the play host pointing at the
   droplet's IP. Set it to **DNS only (grey cloud)** — Caddy then provisions
   Let's Encrypt certificates with zero extra config.
   - If you want the orange cloud (Cloudflare proxy) instead: set SSL/TLS mode
     to **Full (strict)** and keep port 80 reachable so Caddy's HTTP-01
     challenge works. Grey cloud is the simpler, recommended start.
2. Resend's domain-verification records (below) are separate TXT/CNAME/MX
   records — add them exactly as Resend shows, always **DNS only**.

## One-time droplet setup

1. Create a droplet (smallest works to start; Docker image or install Docker +
   compose plugin yourself).
2. On the droplet, create `/opt/burrec-nakama/` and copy from this folder:
   - `docker-compose.prod.yml`
   - `Caddyfile`
   - `local.yml`
   - `build/` (output of `pnpm nakama:build` — rebuild locally first)
   - `site/` (output of `pnpm build` — the repo's `docs/` folder, renamed)
3. Create `/opt/burrec-nakama/.env.prod`:

   ```
   NAKAMA_DOMAIN=play.example.com
   NAKAMA_SERVER_KEY=<long random string>
   SESSION_REFRESH_KEY=<long random string, distinct from NAKAMA_SERVER_KEY>
   RUNTIME_HTTP_KEY=<long random string>
   CONSOLE_USERNAME=<non-default admin console username>
   CONSOLE_PASSWORD=<long random string>
   CONSOLE_SIGNING_KEY=<long random string>
   POSTGRES_PASSWORD=<long random string>
   RESEND_API_KEY=<re_... from resend.com; empty = emails only logged>
   EMAIL_FROM=Burrec <noreply@example.com>
   APPLE_BUNDLE_ID=
   ADMIN_KEY=<long random string; empty disables the burrec.com/#admin dashboard>
   ```
   (generate each "long random string" with `openssl rand -hex 24`)

4. Start it:

   ```bash
   cd /opt/burrec-nakama
   docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
   ```

5. Check: `docker compose -f docker-compose.prod.yml logs nakama | grep "ludo module"`,
   and `https://play.example.com` should serve the game.

## Email (Resend)

Registration verification and password-reset emails are sent by the Nakama
runtime module through Resend's HTTP API (the droplet itself never speaks
SMTP — DigitalOcean blocks it, and Nakama's JS runtime has no SMTP anyway).

1. Create a free account at resend.com (3,000 emails/month).
2. **Domains → Add domain** → `example.com` (or a subdomain like
   `mail.example.com`). Add the DKIM/SPF/MX records it lists into Cloudflare,
   all **DNS only**. Wait for "Verified".
3. **API Keys → Create** (sending access only) → put it in `.env.prod` as
   `RESEND_API_KEY`, and set `EMAIL_FROM` to an address on the verified
   domain, e.g. `Burrec <noreply@example.com>`.
4. Recreate the nakama container (`up -d` again) after editing `.env.prod`.

Without a key, flows still work in dev: `EMAIL_DEV_ECHO=1` in `local.yml`
returns the verify/reset links in RPC payloads and logs them.

## Google sign-in (free)

1. console.cloud.google.com → APIs & Services → **OAuth consent screen**:
   External, app name + support email, publish.
2. **Credentials → Create credentials → OAuth client ID → Web application**:
   - Authorized JavaScript origins: `https://play.example.com`
     (plus `http://localhost:3000` for dev)
   - No redirect URIs needed (the client uses Google Identity Services popup).
3. Put the client ID in `.env.production` as `VITE_GOOGLE_CLIENT_ID` and
   rebuild the site. No server config needed — Nakama validates Google ID
   tokens against Google's public certs.

## Apple sign-in (later — needs the $99/yr Developer Program)

The button stays hidden until configured. When ready:

1. developer.apple.com → Certificates, IDs & Profiles → **Identifiers**:
   - Create an **App ID** (e.g. `com.example.burrec`) with "Sign in with
     Apple" enabled.
   - Create a **Services ID** (e.g. `com.example.burrec.web`), enable Sign in
     with Apple, set its domain to `play.example.com` and return URL to
     `https://play.example.com/` (verify the domain when prompted).
2. Set the Services ID in BOTH places (they must match):
   - `.env.production` → `VITE_APPLE_CLIENT_ID` (rebuild the site)
   - droplet `.env.prod` → `APPLE_BUNDLE_ID` (recreate the container)

## Wiring the client

Edit `.env.production` at the repo root:

```
VITE_NAKAMA_HOST=play.example.com
VITE_NAKAMA_PORT=443
VITE_NAKAMA_SSL=true
VITE_NAKAMA_KEY=<same NAKAMA_SERVER_KEY as the droplet>
VITE_GOOGLE_CLIENT_ID=<web OAuth client id, or empty>
VITE_APPLE_CLIENT_ID=<Apple Services ID, or empty>
```

Vite bakes these at build time — any change requires `pnpm build`.

## Updating

**Automatic**: `.github/workflows/deploy.yml` runs on every push to `master`
(or manual dispatch from the Actions tab). It always builds and rsyncs the
client to `site/`; it only rebuilds/ships the Nakama bundle and restarts the
stack when `nakama/src/`, `shared/protocol.js`, or the droplet config files
(`local.yml`, `docker-compose.prod.yml`, `Caddyfile`) changed in that push —
restarting `nakama` drops all live matches, so it's skipped when unneeded.
It authenticates as a dedicated deploy key (`DEPLOY_SSH_KEY` repo secret,
`ssh-ed25519 ... github-actions-deploy@burrec` in the droplet's
`authorized_keys`, separate from any personal key) against `DROPLET_HOST`
(repo secret).

**Manual** (fallback, or for a step the workflow doesn't cover):

Server module:

```bash
pnpm nakama:build
scp -r nakama/build root@droplet:/opt/burrec-nakama/
ssh root@droplet 'cd /opt/burrec-nakama && docker compose -f docker-compose.prod.yml --env-file .env.prod restart nakama'
```

Client site:

```bash
pnpm build
rsync -av --delete docs/ root@droplet:/opt/burrec-nakama/site/
# no restart needed — Caddy serves the files directly
```

## Admin console

Bound to 127.0.0.1 on the droplet only. Reach it with an SSH tunnel:

```bash
ssh -L 7351:127.0.0.1:7351 root@droplet
# then open http://127.0.0.1:7351 (default admin/password — change via console.username/password in config)
```

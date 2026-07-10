# Deploying the Nakama server (DigitalOcean)

The client is static (GitHub Pages, https) — so the socket must be wss, which
is why Caddy sits in front of Nakama and auto-provisions Let's Encrypt TLS.

## One-time droplet setup

1. Create a droplet (smallest works to start; pick Docker image or install
   Docker + the compose plugin yourself).
2. Point a DNS A record at the droplet, e.g. `nakama.yourdomain.com`.
3. On the droplet, create `/opt/burrec-nakama/` and copy from this folder:
   - `docker-compose.prod.yml`
   - `Caddyfile`
   - `local.yml`
   - `build/` (output of `pnpm nakama:build` — rebuild locally first)
4. Create `/opt/burrec-nakama/.env.prod`:

   ```
   NAKAMA_DOMAIN=nakama.yourdomain.com
   NAKAMA_SERVER_KEY=<long random string>
   POSTGRES_PASSWORD=<long random string>
   ```

5. Start it:

   ```bash
   cd /opt/burrec-nakama
   docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
   ```

6. Check: `docker compose -f docker-compose.prod.yml logs nakama | grep "ludo module"`
   and `https://nakama.yourdomain.com` should answer (404 from Nakama is fine —
   TLS working is what matters).

## Wiring the client

Edit `.env.production` at the repo root:

```
VITE_NAKAMA_HOST=nakama.yourdomain.com
VITE_NAKAMA_PORT=443
VITE_NAKAMA_SSL=true
VITE_NAKAMA_KEY=<same NAKAMA_SERVER_KEY as the droplet>
```

Vite bakes these at build time — run `pnpm build` and commit the regenerated
`docs/` to deploy the Pages site against the new server.

## Updating the server module

```bash
pnpm nakama:build
scp -r nakama/build root@droplet:/opt/burrec-nakama/
ssh root@droplet 'cd /opt/burrec-nakama && docker compose -f docker-compose.prod.yml --env-file .env.prod restart nakama'
```

## Admin console

Bound to 127.0.0.1 on the droplet only. Reach it with an SSH tunnel:

```bash
ssh -L 7351:127.0.0.1:7351 root@droplet
# then open http://127.0.0.1:7351 (default admin/password — change via console.username/password in config)
```

// The "share your win" picture: the end-of-game board drawn onto a 1080x1080
// canvas (square crops cleanly in chats, feeds and Stories) with burrec.com on
// it, so every shared win carries the address.

import logoSrc from '../assets/logo.png';
import { t } from './i18n';

const SIZE = 1080;
const FONT = 'Outfit, system-ui, -apple-system, "Segoe UI", sans-serif';
const INK = '#263f2a';
const MUTED = '#5d6b5f';
const CREAM = '#fff4e0';
const GREEN = '#71bd26';

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Shrink the font until text fits maxWidth.
function fitFont(ctx, text, weight, size, maxWidth) {
  let s = size;
  ctx.font = `${weight} ${s}px ${FONT}`;
  while (s > 20 && ctx.measureText(text).width > maxWidth) {
    s -= 2;
    ctx.font = `${weight} ${s}px ${FONT}`;
  }
  return s;
}

// rows: WinScreen's rows (winner first) — { name, color, winner, finished,
// captures, captured, sixes }. winner: { name, color }.
export async function renderWinCard({ rows, winner, summary, modeLabel }) {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  try {
    await document.fonts.load(`800 64px Outfit`);
  } catch (error) {
    // System font fallback is fine.
  }

  // Ground + footer band.
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = GREEN;
  ctx.fillRect(0, SIZE - 130, SIZE, 130);
  ctx.fillStyle = INK;
  ctx.fillRect(0, SIZE - 136, SIZE, 6);

  // Logo.
  try {
    const logo = await loadImage(logoSrc);
    const w = 440;
    const h = (logo.height / logo.width) * w;
    ctx.drawImage(logo, (SIZE - w) / 2, 40, w, h);
  } catch (error) {
    // Skip the logo rather than fail the card.
  }

  // "<Name> wins!" in the winner's color with a dark outline, like the HUD.
  const headline = t('win.wins', { name: winner.name });
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const size = fitFont(ctx, headline, 800, 84, SIZE - 120);
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.round(size / 7);
  ctx.strokeStyle = INK;
  ctx.strokeText(headline, SIZE / 2, 400);
  ctx.fillStyle = winner.color || GREEN;
  ctx.fillText(headline, SIZE / 2, 400);

  // Stats panel.
  const panelX = 70;
  const panelW = SIZE - 140;
  const top = 450;
  const rowH = 74;
  const panelH = 70 + rows.length * rowH + 20;
  ctx.fillStyle = INK;
  roundRect(ctx, panelX, top + 8, panelW, panelH, 26);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, panelX, top, panelW, panelH, 26);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = INK;
  ctx.stroke();

  const cols = [
    { key: 'finished', label: t('win.finished'), x: panelX + panelW - 400, fmt: (r) => `${r.finished}/4` },
    { key: 'captures', label: t('win.captures'), x: panelX + panelW - 280 },
    { key: 'captured', label: t('win.captured'), x: panelX + panelW - 165 },
    { key: 'sixes', label: t('win.sixes'), x: panelX + panelW - 60 },
  ];
  ctx.font = `700 26px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'left';
  ctx.fillText(t('win.player').toUpperCase(), panelX + 36, top + 52);
  ctx.textAlign = 'center';
  // "6s" stays as written ("6S" reads wrong).
  cols.forEach((c) => ctx.fillText(/^\d/.test(c.label) ? c.label : c.label.toUpperCase(), c.x, top + 52));

  rows.forEach((row, i) => {
    const y = top + 70 + i * rowH;
    if (row.winner) {
      ctx.fillStyle = '#eef6e4';
      ctx.fillRect(panelX + 4, y + 4, panelW - 8, rowH - 8);
    }
    const mid = y + rowH / 2;
    ctx.beginPath();
    ctx.arc(panelX + 52, mid, 16, 0, Math.PI * 2);
    ctx.fillStyle = row.color;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = INK;
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = INK;
    fitFont(ctx, row.name, row.winner ? 800 : 600, 36, cols[0].x - 60 - (panelX + 84));
    ctx.fillText(row.name, panelX + 84, mid + 12);

    ctx.textAlign = 'center';
    ctx.font = `${row.winner ? 800 : 600} 36px ${FONT}`;
    cols.forEach((c) => ctx.fillText(c.fmt ? c.fmt(row) : String(row[c.key]), c.x, mid + 12));
  });

  // Mode + game time under the panel.
  const meta = [modeLabel, summary].filter(Boolean).join(' · ');
  if (meta) {
    ctx.textAlign = 'center';
    ctx.fillStyle = MUTED;
    fitFont(ctx, meta, 600, 30, SIZE - 140);
    ctx.fillText(meta, SIZE / 2, top + panelH + 66);
  }

  // Footer: the address, which is the point of the card.
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `800 54px ${FONT}`;
  ctx.lineWidth = 8;
  ctx.strokeStyle = INK;
  ctx.strokeText('burrec.com', SIZE / 2, SIZE - 48);
  ctx.fillText('burrec.com', SIZE / 2, SIZE - 48);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/png');
  });
}

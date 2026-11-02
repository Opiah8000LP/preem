# DWEEB RECORDS: commissions + portfolio

The source for [rdweeb.xyz](https://rdweeb.xyz). A plain static site (no build step, no framework, no
backend) styled like the PSP / PS3 cross media bar. Put the files on GitHub Pages and it runs.

## What is on the menu

| Category | Pages |
| --- | --- |
| SHOWCASE | websites, music (audio previews), games, videos, images (before / after slider) |
| SERVICES | what I offer, packages (standard + premium, with a price calculator), payment |
| COMMISSION | request builder (writes the DM for you), terms |
| CONTACT | every channel, FAQ |
| CREDITS | third-party credits + the license |
| (locked) | ART COMMISSIONS, coming soon |

Still here from the old site: the music player, the games, settings, trophies, the GoatCounter visitor eyes,
seasons and the secrets. The old chat bot is now **MOCK BOT**.

## Where to change things

| I want to... | Edit |
| --- | --- |
| add my websites / songs / games / videos / before-after images | `js/content.js` -> `DW.works` (put files in `works/`) |
| change prices, revisions, who needs to credit | `js/content.js` -> `DW.pricing` |
| change the services list | `js/content.js` -> `DW.services` |
| set my Ko-fi, Discord, YouTube, TikTok... links | `js/config.js` -> `DW.links` |
| rename / reorder menu items, change icons | `js/config.js` -> `DW.menu` |
| write MOCK BOT lines and conversations | `js/mock-text.js` |
| add credits for code / ideas I took | `js/content.js` -> `DW.credits.items` |
| change the license text | `js/content.js` -> `DW.license` (and `LICENSE`) |
| change the background playlist | `js/config.js` -> `DW.playlist` |

Menu items open an in-site page with `'page:<id>'` or another site with a normal URL.
Page ids: `websites music games videos images offers packages payment builder terms contact faq credits`.

### Adding work
```js
// js/content.js
DW.works.music.push({ title: 'My tag', kind: 'Tag', src: 'works/audio/my-tag.mp3', tags: ['Tag'] });
DW.works.videos.push({ title: 'Edit', src: 'works/video/edit.mp4', poster: 'works/thumbs/edit.png' });
DW.works.videos.push({ title: 'On YouTube', youtube: 'VIDEO_ID' });   // loads only after the visitor clicks
DW.works.images.push({ title: 'Cleanup', before: 'works/images/a-before.png', after: 'works/images/a-after.png' });
```
Delete the entries marked `sample: true` when you add the real ones.

### MOCK BOT
`js/mock-text.js` has two parts: the floating line (random lines, time of day, song reactions, words people type)
and the chat window, which is a tree of `nodes` (`say`, `pick`, `options`, `next`) plus `triggers` that map typed
words to nodes. Emotion tags like `<angry>`, `<whisper>`, `<glitch>` work in every line.

### The ARG
The whisper (a message pointing at a file) lives in plain text in `index.html` (meta description + noscript),
`llms.txt`, `robots.txt` and `js/content.js`. Set your link everywhere in one go:

    python3 tools/set-arg.py "https://drive.google.com/..."

Search engines and AI summaries decide for themselves what to show, so this can take weeks to appear and is
never guaranteed. Keep the text visible on the page (the Credits page does) so it stays honest, and nothing
here is hidden from visitors.

## Making a copy
1. Put the files in your own GitHub Pages repo.
2. Change the links, content and MOCK BOT text (above).
3. Swap the name, description and links in `index.html`, `robots.txt`, `sitemap.xml`, `llms.txt`. Delete `CNAME` unless you own the domain.
4. Replace the playlist in `js/config.js` with music you have the right to play.

## Privacy
No accounts, no cookies, no ads. Scores, trophies and settings stay in the visitor's browser. The only outside
services are the optional GoatCounter visit counter and YouTube embeds, and YouTube only loads after a visitor
presses the load button on that video. Nothing is sent from the request builder; it only writes and copies text.

## License
Original code and art: **CC BY 4.0**. Free to use if credited:
`Made by RDweeb (https://rdweeb.xyz/), licensed under CC BY 4.0`. See `LICENSE` and the Credits page.
Not covered: the names and branding (DWEEB RECORDS, DWEEB//OS, RDweeb), the music in the player, and third-party work.
PlayStation, PSP, PS1, PS2, PS3 and XMB are trademarks of Sony Interactive Entertainment; this is an unofficial fan tribute.

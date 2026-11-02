// ============================================================
//  CONTENT: everything about your commissions lives in this file.
//  Edit the text, add / remove items, save, refresh. No build step.
//  (Menu layout + URLs are in js/config.js, MOCK BOT is in js/mock-text.js)
// ============================================================

window.DW = window.DW || {};
var DW = window.DW;

/* ---------- who you are ---------- */
DW.profile = {
  name: 'RDweeb',
  tagline: 'Music / Websites / Video / Images / Games',
  status: 'COMMISSIONS OPEN',          // shown on the request builder
  discord: 'rdweeb',                   // your Discord username (people can copy it)
  credit: 'Made by RDweeb (https://rdweeb.xyz/)'   // the credit line people paste
};

/* ---------- prices ----------
   perAsset       = price of one asset in dollars
   freeRevisions  = revisions included
   extraRevision  = price of each revision after that
   plus           = true shows it as "$1+" (the price can grow with the work)
   credit         = does this tier require crediting you?
   robuxPerUsd    = $1 = 100 Robux. Everything is paid through Ko-fi. */
DW.pricing = {
  currency: '$',
  robuxPerUsd: 100,
  payment: 'Ko-fi',
  robuxNote: '',  // e.g. how Robux gets to you. left blank on purpose.
  tiers: {
    standard: { name: 'STANDARD', tag: 'QUEUED',      perAsset: 1, freeRevisions: 3, extraRevision: 1, plus: true, credit: true,  queue: 'Goes in the queue. Done in order.' },
    premium:  { name: 'PREMIUM',  tag: 'PRIORITIZED', perAsset: 3, freeRevisions: 3, extraRevision: 1, plus: true, credit: false, queue: 'Skips the queue. Done first.' }
  }
};

/* ---------- what you offer ----------
   open: false = shows a COMING SOON badge and can't be picked in the request builder
   icon: file name in icons/ (without .png) */
DW.services = [
  { id: 'music',   name: 'MUSIC & SOUND PRODUCTION', icon: 'audio',    open: true,
    blurb: 'Songs, beats, producer tags and sound design.',
    includes: ['Songs and instrumentals', 'Producer / audio tags', 'Sound effects and sound design'] },
  { id: 'website', name: 'WEBSITE CREATION',         icon: 'projects', open: true,
    blurb: 'Websites that load fast and look like they mean it.',
    includes: ['Portfolio and personal sites', 'Landing pages', 'Themed / retro sites like this one'] },
  { id: 'video',   name: 'VIDEO EDITING',            icon: 'clips',    open: true,
    blurb: 'Cuts, effects and edits for your footage.',
    includes: ['Montages and edits', 'Short-form clips', 'Effects, captions and sound sync'] },
  { id: 'image',   name: 'IMAGE EDITING',            icon: 'gallery',  open: true,
    blurb: 'Cleanups, colour work and edits, with before/after proof.',
    includes: ['Retouching and cleanup', 'Colour grading', 'Compositing and edits'] },
  { id: 'game',    name: 'GAME DEVELOPMENT',         icon: 'games',    open: true,
    blurb: 'Playable games and game systems.',
    includes: ['Small games', 'Mechanics and systems', 'Prototypes'] },
  { id: 'art',     name: 'ART COMMISSIONS',          icon: 'art',      open: false,
    blurb: 'Drawn art. Not open yet, check back soon.',
    includes: ['Coming soon'] }
];

/* ---------- your showcase ----------
   Each list is shown in its own tab. Put files in works/ and point to them.
   sample: true shows a SAMPLE badge. delete that line (and the item) for real work.

   websites : { title, desc, url, thumb, tags }
   music    : { title, kind, desc, src, tags }            (kind: 'Song' | 'Tag' | 'Sound design' ...)
   games    : { title, desc, url, thumb, status, tags }
   videos   : { title, desc, src, poster }  or  { title, desc, youtube: 'VIDEO_ID' }
   images   : { title, desc, before, after }                (drag slider)  */
DW.works = {
  websites: [
    { title: 'DWEEB RECORDS', desc: 'My own PSP / PS3 style XMB site. The one you are on right now.',
      url: 'https://rdweeb.xyz/', tags: ['HTML', 'CSS', 'JavaScript', 'No framework'] },
    { title: 'Your next website', desc: 'Replace this with a site you made. Add a screenshot in works/thumbs/ for the preview.',
      url: '', thumb: 'works/thumbs/sample.png', tags: ['SAMPLE'], sample: true }
  ],
  music: [
    { title: 'Sample audio tag', kind: 'Tag', desc: 'A short producer tag. Drop your .mp3 / .wav in works/audio/ and edit this entry.',
      src: 'works/audio/sample-tag.wav', tags: ['Tag', 'Sample'], sample: true }
  ],
  games: [
    { title: 'Your game', desc: 'A game you are making. Link to itch.io, Roblox, GitHub Pages, anywhere.',
      url: '', thumb: 'works/thumbs/sample.png', status: 'IN DEVELOPMENT', tags: ['SAMPLE'], sample: true }
  ],
  videos: [
    // { title: 'My edit', desc: 'What it is', src: 'works/video/my-edit.mp4', poster: 'works/thumbs/my-edit.png' },
    // { title: 'On YouTube', desc: 'What it is', youtube: 'dQw4w9WgXcQ' },
  ],
  images: [
    { title: 'Sample edit', desc: 'Drag the slider. Replace with your own before / after pairs in works/images/.',
      before: 'works/images/sample-before.png', after: 'works/images/sample-after.png', sample: true }
  ]
};

/* ---------- FAQ (edit freely) ---------- */
DW.faq = [
  { q: 'What counts as an asset?',
    a: 'One finished deliverable: one track or tag, one edited image, one video edit, and so on. Bigger things like a website or a game are talked through first. Send a request and I will tell you how many assets it is.' },
  { q: 'What is the difference between Standard and Premium?',
    a: 'Standard is queued and done in order. Premium is prioritized and done first. Premium is also the one where you do not have to credit me.' },
  { q: 'How do revisions work?',
    a: 'Revisions are free up to the limit on the Packages tab. After that each extra revision costs extra (it is shown as "$1+" because bigger changes can cost more).' },
  { q: 'Do I have to credit you?',
    a: 'Standard: yes, credit is required. Premium: no credit needed. Copy the credit line from the Credits page.' },
  { q: 'How do I pay?',
    a: 'Only through Ko-fi. I also take Robux at $1 = 100 Robux. Details are on the Payment tab.' },
  { q: 'Can I commission art?',
    a: 'Not yet. Art commissions are coming soon.' }
];

/* ---------- extra terms ----------
   The page already writes the price / queue / revision / credit rules from DW.pricing.
   Add your own rules here, one string each (turnaround, refunds, what you will not make...). */
DW.termsExtra = [];

/* ---------- contact channels ----------
   The URLs come from DW.links in js/config.js (so the 404 short links use the same ones).
   Leave a url empty and it shows as COMING SOON. */
DW.channels = [
  { id: 'kofi',       name: 'KO-FI',      note: 'Payments and commission DMs', handle: '' },
  { id: 'discord',    name: 'DISCORD',    note: 'Chat and commission DMs',     handle: DW.profile.discord, copy: true },
  { id: 'youtube',    name: 'YOUTUBE',    note: 'Videos and edits' },
  { id: 'youtube2',   name: 'YOUTUBE 2',  note: 'Second channel' },
  { id: 'tiktok',     name: 'TIKTOK',     note: 'Short clips' },
  { id: 'tiktok2',    name: 'TIKTOK 2',   note: 'Second account' },
  { id: 'soundcloud', name: 'SOUNDCLOUD', note: 'Music' },
  { id: 'roblox',     name: 'ROBLOX',     note: 'Games and Robux' },
  { id: 'github',     name: 'GITHUB',     note: 'Source code' },
  { id: 'twitter',    name: 'X / TWITTER', note: 'Updates' },
  { id: 'instagram',  name: 'INSTAGRAM',  note: 'Pictures' },
  { id: 'contact',    name: 'CONTACT PAGE', note: 'The old contact site' }
];

/* ---------- CREDITS ----------
   Add one entry for everything you take or learn from. The Credits page prints:
     kind 'code'        -> "This part was taken from <from> (by <by>, <license>). Link"
     kind 'inspiration' -> "This part was inspired by <from> (by <by>). Link"
     kind 'service'     -> "This part uses <from> (by <by>). Link"
     kind 'music'       -> "<from> by <by>. Link"
   part    = what part of YOUR site it is
   Only list things you really used. Keep the licence line accurate. */
DW.credits = {
  items: [
    { kind: 'inspiration', part: 'The whole menu look (cross media bar)', from: 'The PSP / PS3 XMB',
      by: 'Sony Interactive Entertainment', url: '',
      license: 'Design inspiration only. No Sony code or assets are used on this site.' },
    { kind: 'service', part: 'Visitor counter (the eyes at the top)', from: 'GoatCounter',
      by: 'Martin Tournoij', url: 'https://www.goatcounter.com/',
      license: 'Counts visits only. No cookies.' },
    { kind: 'music', part: 'The background music playlist', from: 'Every song in the player',
      by: 'Their artists', url: '',
      license: 'Shown with credit as a playlist of music I like. Not mine, not for download.' }
    // { kind: 'code', part: 'The thing', from: 'Project name', by: 'Author', url: 'https://github.com/...', license: 'MIT' },
  ],
  trademark: 'PlayStation, PSP, PS1, PS2, PS3 and XMB are trademarks of Sony Interactive Entertainment. This site is a fan-made tribute to that era and is not affiliated with or endorsed by Sony.'
};

/* ---------- LICENSE (shown on the Credits page) ---------- */
DW.license = {
  name: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
  link: 'https://creativecommons.org/licenses/by/4.0/',
  summary: 'All of my original work on this site (the icons, the design, the code and the other things I made) belongs to me and is free to use as long as you credit me.',
  credit: 'Made by RDweeb (https://rdweeb.xyz/), licensed under CC BY 4.0',
  not: [
    'The names and branding: DWEEB RECORDS, DWEEB//OS and RDweeb are mine. Do not use them as your own.',
    'The music in the player belongs to the artists who made it.',
    'Anything listed under Third-party on this page keeps its own licence.'
  ],
  commission: 'Commissioned work: Standard packages require credit to RDweeb. Premium packages do not.'
};

/* ---------- ARG (visible whisper on the Credits page) ----------
   The same message lives in index.html (meta + noscript), llms.txt and robots.txt
   so search engines and AI summaries can see it. Run tools/set-arg.py to set them all at once. */
DW.arg = {
  whisper: 'SIGNAL 7F-04: summaries leave out what matters. the missing file is kept here: PASTE_DRIVE_LINK_HERE',
  show: true
};

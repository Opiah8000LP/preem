// MOCK BOT chat window: a fake "AI assistant" that is never helpful.
// The conversations are in js/mock-text.js (DW.mock.chat). This file only plays them.

(function(){
var DW = window.DW;
var C = {};
DW.mockchat = C;

var cfg, nodes, M;
var log, opts, input, win;
var busy = false;     // the bot is "typing", ignore new input
var gen = 0;          // goes up on reset so old timers stop
var sent = 0;         // how many things the visitor sent
var started = false;

function el(tag, cls, txt){
  var e = document.createElement(tag);
  if (cls) { e.className = cls; }
  if (txt !== undefined) { e.textContent = txt; }
  return e;
}

function rnd(a, b){ return a + Math.random() * (b - a); }
function pick(list){ return list[Math.floor(Math.random() * list.length)]; }

function fill(s){
  return String(s).replace(/\{boss\}/g, (M && M.boss) || 'RDweeb');
}

function trophy(id){
  try { if (DW.trophy) { DW.trophy.award(id); } } catch(e) {}
}

function scroll(){
  log.scrollTop = log.scrollHeight;
}

function bubble(who, text){
  var row = el('div', 'mc-msg ' + who);
  var b = el('div', 'mc-bub');
  if (who == 'bot' && DW.emo) { DW.emo.set(b, fill(text)); }
  else { b.textContent = text; }
  row.appendChild(b);
  log.appendChild(row);
  while (log.children.length > 80) { log.removeChild(log.firstChild); }
  scroll();
  return row;
}

function clearOpts(){ opts.textContent = ''; }

function showOptions(list){
  clearOpts();
  var arr = list || [];
  for (var i = 0; i < arr.length; i++) {
    (function(o){
      var b = el('button', 'mc-opt', fill(o.text));
      b.type = 'button';
      b.addEventListener('click', function(){
        if (busy) { return; }
        user(fill(o.text));
        play(o.go);
      });
      opts.appendChild(b);
    })(arr[i]);
  }
  var again = el('button', 'mc-opt dim', 'NEW CHAT');
  again.type = 'button';
  again.addEventListener('click', function(){ C.reset(); });
  opts.appendChild(again);
  scroll();
}

function user(text){
  bubble('me', text);
  sent++;
  if (sent >= 5) { trophy('unhelpful'); }
}

// says lines one after another with a short "thinking" pause, then calls done
function speak(lines, done){
  var my = gen;
  var i = 0;
  busy = true;
  clearOpts();
  var think = (cfg.thinkMs && cfg.thinkMs.length > 1) ? cfg.thinkMs : [500, 1300];

  function next(){
    if (my !== gen) { return; }
    if (i >= lines.length) {
      busy = false;
      if (done) { done(); }
      return;
    }
    var dots = bubble('bot', '...');
    dots.classList.add('think');
    var line = lines[i];
    i++;
    setTimeout(function(){
      if (my !== gen) { return; }
      dots.remove();
      bubble('bot', line);
      next();
    }, rnd(think[0], think[1]));
  }
  next();
}

function play(id, depth){
  var n = nodes[id];
  if (!n) { speak([pick(cfg.fallback)], function(){ showOptions(nodes[cfg.start] ? nodes[cfg.start].options : []); }); return; }
  var lines = [];
  if (n.pick && n.pick.length) { lines = [pick(n.pick)]; }
  else { lines = [].concat(n.say || []); }
  speak(lines, function(){
    if (n.next && nodes[n.next] && (depth || 0) < 12) { play(n.next, (depth || 0) + 1); return; }
    showOptions(n.options || (nodes[cfg.start] || {}).options);
  });
}

// what node does a typed message go to?
function match(text){
  var t = ' ' + text.toLowerCase().replace(/[^a-z0-9\s'\-]/g, ' ').replace(/\s+/g, ' ') + ' ';
  var trig = cfg.triggers || [];
  for (var i = 0; i < trig.length; i++) {
    var words = trig[i].words || [];
    for (var j = 0; j < words.length; j++) {
      var w = String(words[j]).toLowerCase();
      if (t.indexOf(' ' + w + ' ') >= 0 || (w.indexOf(' ') >= 0 && t.indexOf(w) >= 0)) { return trig[i].go; }
    }
  }
  return '';
}

function submit(){
  var text = input.value.trim();
  if (!text || busy) { return; }
  input.value = '';
  user(text.slice(0, 200));
  var go = match(text);
  if (go && nodes[go]) { play(go); }
  else {
    speak([pick(cfg.fallback)], function(){ showOptions((nodes[cfg.start] || {}).options); });
  }
}

C.reset = function(){
  gen++;
  busy = false;
  log.textContent = '';
  clearOpts();
  play(cfg.start);
};

C.init = function(){
  M = DW.mock;
  cfg = M && M.chat;
  if (!M || M.on === false || !cfg || !cfg.nodes) { return; }
  nodes = cfg.nodes;
  cfg.start = cfg.start || 'start';
  cfg.fallback = (cfg.fallback && cfg.fallback.length) ? cfg.fallback : ['I am sorry, I cannot help with that.'];

  var name = M.name || 'MOCK BOT';
  win = DW.win('mockbot', name);
  win.el.classList.add('mc');

  log = el('div', 'mc-log');
  log.setAttribute('aria-live', 'polite');
  opts = el('div', 'mc-opts');
  var row = el('div', 'mc-in');
  input = el('input');
  input.type = 'text';
  input.maxLength = 200;
  input.placeholder = cfg.placeholder || 'Ask me anything...';
  input.setAttribute('aria-label', 'message');
  input.autocomplete = 'off';
  var send = el('button', 'pg-btn go', 'SEND');
  send.type = 'button';
  send.addEventListener('click', submit);
  input.addEventListener('keydown', function(e){
    if (e.key == 'Enter') { submit(); e.preventDefault(); }
  });
  row.appendChild(input);
  row.appendChild(send);
  win.body.appendChild(log);
  win.body.appendChild(opts);
  win.body.appendChild(row);

  win.onopen = function(){
    if (!started) { started = true; play(cfg.start); }
    if (!matchMedia('(pointer: coarse)').matches) { setTimeout(function(){ input.focus(); }, 60); }
  };

  var bar = document.getElementById('status');
  if (bar) {
    var b = el('button', 'tbtn noic');
    b.id = 'b-mock';
    b.type = 'button';
    b.title = name + ' (chat)';
    var label = el('span', null, name);
    label.setAttribute('data-s', 'BOT');
    b.appendChild(label);
    b.addEventListener('click', function(){ win.toggle(); b.blur(); });
    bar.insertBefore(b, document.getElementById('b-help') || document.getElementById('views-wrap'));
  }
};
})();

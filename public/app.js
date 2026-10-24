/* Vira Votos: questionário e montagem do roteiro. Tudo roda no aparelho. */
(function () {
  'use strict';
  var C = window.VV;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  var ICON = {
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    copy: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/></svg>',
    ok: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    plus: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    back: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    next: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    wa: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-0.9.8a3.8 3.8 0 0 1-2.3-2.3l.8-.9-1-1.9z"/></svg>',
    print: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2"/><rect x="7" y="14" width="10" height="6" rx="1"/></svg>',
    redo: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5"/></svg>'
  };

  var KEY = 'vv-respostas-v1';
  var state = { step: 0, a: {} };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.a) state.a = saved.a; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify({ a: state.a })); } catch (e) {} }

  /* Domingo de eleição: o site fica no ar, mas não chama ninguém para abordar eleitor. */
  function diaDaEleicao() {
    var agora = new Date();
    var inicio = Date.UTC(2026, 9, 25, 3, 0, 0); // 25/10 00:00 em Brasília
    var fim = Date.UTC(2026, 9, 25, 20, 0, 0);   // 25/10 17:00 em Brasília
    var t = agora.getTime();
    if (t >= inicio && t < fim) return 'durante';
    if (t >= fim) return 'depois';
    return null;
  }

  var screens = ['inicio', 'perguntas', 'roteiro', 'metodo'];
  function show(id, push) {
    screens.forEach(function (s) { $('#' + s).hidden = s !== id; });
    if (push !== false) { try { history.pushState({ s: id }, '', id === 'inicio' ? '/' : '#' + id); } catch (e) {} }
    window.scrollTo(0, 0);
    var h = $('#' + id + ' h1, #' + id + ' h2');
    if (h && id !== 'inicio') { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  window.addEventListener('popstate', function () {
    var id = (location.hash || '').slice(1);
    if (id === 'metodo') { renderMetodo(); show('metodo', false); }
    else if (id === 'roteiro' && isComplete()) { renderRoteiro(); show('roteiro', false); }
    else if (id === 'perguntas') { renderQ(); show('perguntas', false); }
    else show('inicio', false);
  });

  /* ---------- Questionário ---------- */
  var Q = C.perguntas;
  function visible() { return Q.filter(function (q) { return !q.se || q.se(state.a); }); }
  function isComplete() { return visible().every(function (q) { return q.opcional || has(q.id); }); }
  function has(id) { var v = state.a[id]; return Array.isArray(v) ? v.length > 0 : v !== undefined && v !== ''; }

  function renderQ() {
    var list = visible();
    if (state.step >= list.length) state.step = list.length - 1;
    var q = list[state.step];
    var n = state.step + 1, total = list.length;
    var multi = q.tipo === 'multi';
    var nome = state.a.nome ? state.a.nome : 'essa pessoa';
    var titulo = q.titulo.replace(/\{nome\}/g, esc(nome));
    var html = '<div class="progress"><div class="bar" role="progressbar" aria-label="Progresso" aria-valuemin="1" aria-valuemax="' + total + '" aria-valuenow="' + n + '"><i style="width:' + Math.round((n - 1) / total * 100) + '%"></i></div><span class="count">' + n + ' de ' + total + '</span></div>';
    html += '<form class="q" novalidate><h2 id="qt">' + titulo + '</h2>';
    if (q.ajuda) html += '<p class="help">' + q.ajuda.replace(/\{nome\}/g, esc(nome)) + '</p>';
    if (q.tipo === 'texto') {
      html += '<label class="sr" for="qin">' + esc(q.titulo.replace(/\{nome\}/g, nome)) + '</label><input id="qin" class="textin" type="text" maxlength="30" autocomplete="off" placeholder="' + esc(q.placeholder || '') + '" value="' + esc(state.a[q.id] || '') + '">';
    } else {
      html += '<fieldset class="opts' + (q.duas ? ' two' : '') + '" aria-labelledby="qt">';
      q.opcoes.forEach(function (o, i) {
        var cur = state.a[q.id];
        var checked = multi ? (cur || []).indexOf(o.v) > -1 : cur === o.v;
        html += '<label class="opt"><input type="' + (multi ? 'checkbox' : 'radio') + '" name="' + q.id + '" value="' + o.v + '"' + (checked ? ' checked' : '') + '><span class="box">' + ICON.check + '</span><span><span class="t">' + esc(o.t) + '</span>' + (o.d ? '<span class="d">' + esc(o.d) + '</span>' : '') + '</span></label>';
      });
      html += '</fieldset>';
      if (multi && q.max) html += '<p class="limit" id="lim" aria-live="polite">Escolha até ' + q.max + '.</p>';
    }
    var last = n === total;
    html += '<div class="nav"><button type="button" class="btn ghost small" data-back>' + ICON.back + (state.step === 0 ? 'Início' : 'Voltar') + '</button>';
    html += '<button type="submit" class="btn" data-next' + (canGo(q) ? '' : ' disabled') + '>' + (last ? 'Ver meu roteiro' : (q.opcional && !has(q.id) ? 'Pular' : 'Continuar')) + ICON.next + '</button></div></form>';
    var root = $('#perguntas');
    root.innerHTML = html;
    requestAnimationFrame(function () { var b = $('.bar i', root); if (b) b.style.width = Math.round(n / total * 100) + '%'; });

    var form = $('form', root), nextBtn = $('[data-next]', root);
    form.addEventListener('change', function (e) {
      if (multi) {
        var vals = [].slice.call(form.querySelectorAll('input:checked')).map(function (i) { return i.value; });
        if (q.max && vals.length > q.max) { e.target.checked = false; vals.splice(vals.indexOf(e.target.value), 1); $('#lim').textContent = 'No máximo ' + q.max + '. Desmarque uma para trocar.'; }
        else if ($('#lim')) $('#lim').textContent = 'Escolha até ' + q.max + '.';
        var none = q.opcoes.filter(function (o) { return o.sozinha; }).map(function (o) { return o.v; });
        if (none.indexOf(e.target.value) > -1 && e.target.checked) { vals = [e.target.value]; form.querySelectorAll('input').forEach(function (i) { i.checked = i.value === e.target.value; }); }
        else if (e.target.checked && none.length) { vals = vals.filter(function (v) { return none.indexOf(v) < 0; }); form.querySelectorAll('input').forEach(function (i) { if (none.indexOf(i.value) > -1) i.checked = false; }); }
        state.a[q.id] = vals;
      } else {
        state.a[q.id] = e.target.value;
      }
      save();
      nextBtn.disabled = !canGo(q);
    });
    if (q.tipo === 'texto') {
      var inp = $('#qin', root);
      inp.addEventListener('input', function () { state.a[q.id] = inp.value.trim(); save(); nextBtn.innerHTML = (inp.value.trim() ? 'Continuar' : 'Pular') + ICON.next; });
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); if (!canGo(q)) return; advance(); });
    $('[data-back]', root).addEventListener('click', function () { if (state.step === 0) show('inicio'); else { state.step--; renderQ(); focusQ(); } });
    if (!multi && q.tipo !== 'texto') {
      form.querySelectorAll('input').forEach(function (i) { i.addEventListener('click', function () { if (i.checked) setTimeout(function () { if (canGo(q)) advance(); }, 260); }); });
    }
  }
  function canGo(q) { return q.opcional || has(q.id); }
  function advance() {
    var list = visible();
    if (state.step < list.length - 1) { state.step++; renderQ(); focusQ(); }
    else { renderRoteiro(); show('roteiro'); }
  }
  function focusQ() { window.scrollTo(0, 0); var h = $('#qt'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } }

  /* ---------- Roteiro ---------- */
  function renderRoteiro() {
    var r = C.montar(state.a);
    var nome = state.a.nome || '';
    var h = '';
    h += '<header class="res-head"><p class="for">Seu roteiro de conversa</p><h1>' + (nome ? 'Conversa com ' + esc(nome) : 'Sua conversa') + '</h1></header>';
    h += '<div class="goal"><h2>Objetivo realista para hoje</h2><p>' + r.objetivo + '</p>' + (r.objetivoNota ? '<p>' + r.objetivoNota + '</p>' : '') + '</div>';
    var secs = [['antes', 'Antes de falar'], ['abrir', 'Como abrir'], ['ouvir', 'Perguntas para ouvir'], ['mostrar', 'O que mostrar'], ['objecoes', 'Objeções'], ['evitar', 'O que não dizer'], ['fechar', 'Como fechar'], ['mensagem', 'Mensagem pronta']];
    h += '<ul class="toc" aria-label="Partes do roteiro">' + secs.map(function (s) { return '<li><a href="#s-' + s[0] + '">' + s[1] + '</a></li>'; }).join('') + '</ul>';

    h += sec('antes', 'Antes de falar', '', '<ul class="plain">' + r.antes.map(li).join('') + '</ul>');
    h += sec('abrir', 'Como abrir', r.abrirSub, r.abrir.map(say).join(''));
    h += sec('ouvir', 'Perguntas para ouvir', 'Pergunte e deixe a pessoa falar até o fim. Quanto mais ela explica, mais ela mesma pesa os próprios motivos. Responda com a sua história, nunca com um sermão.', r.ouvir.map(say).join(''));
    h += sec('mostrar', 'O que mostrar', 'Escolha um tema, no máximo dois. Um fato que toca a vida dela vale mais que dez números.', r.temas.map(topic).join(''));
    h += sec('objecoes', 'Objeções que podem aparecer', 'Concorde com o que for verdade antes de responder. Quem se sente ouvido escuta de volta.', r.objecoes.map(obj).join(''));
    h += sec('evitar', 'O que não dizer', '', '<ul class="plain dont">' + r.evitar.map(li).join('') + '</ul>');
    h += sec('fechar', 'Como fechar', 'Quem diz em voz alta a que horas vai votar e como vai chegar tem mais chance de votar mesmo. Feche com um plano, não com um pedido.', '<ol class="plan">' + r.fechar.map(function (x) { return '<li><div>' + x + '</div></li>'; }).join('') + '</ol>');
    var wa = 'https://wa.me/?text=' + encodeURIComponent(r.mensagem);
    h += sec('mensagem', 'Mensagem pronta', r.mensagemSub, '<div class="msg" id="msg">' + esc(r.mensagem) + '</div><div class="row"><button type="button" class="btn small" data-copy="#msg">' + ICON.copy + 'Copiar</button><a class="btn ghost small" href="' + wa + '" target="_blank" rel="noopener noreferrer">' + ICON.wa + 'Abrir no WhatsApp</a></div><p class="src" style="margin-top:12px">Mande só para quem você conhece, uma pessoa por vez. Mensagem em massa é proibida na campanha.</p>');
    h += sec('se-nao', 'Se a pessoa não mudar', '', '<ul class="plain">' + r.seNao.map(li).join('') + '</ul>');
    h += sec('base', 'Por que este roteiro funciona', 'As técnicas usadas aqui e de onde elas vêm.', '<ul class="cite">' + r.base.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul><p><a href="#metodo" data-go="metodo">Ler o método completo</a></p>');
    h += '<aside class="warn"><h2>Antes de mandar qualquer coisa</h2>' + C.avisos.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</aside>';
    h += '<div class="endrow"><button type="button" class="btn" data-restart>' + ICON.redo + 'Montar roteiro para outra pessoa</button><button type="button" class="btn ghost" data-edit>' + ICON.back + 'Mudar respostas</button><button type="button" class="btn ghost" data-print>' + ICON.print + 'Salvar em PDF</button></div>';
    $('#roteiro').innerHTML = h;
  }
  function sec(id, t, sub, body) { return '<section class="sec" id="s-' + id + '" aria-labelledby="h-' + id + '"><h2 id="h-' + id + '">' + t + '</h2>' + (sub ? '<p class="sub">' + sub + '</p>' : '') + body + '</section>'; }
  function li(x) { return '<li><span>' + x + '</span></li>'; }
  var sayN = 0;
  function say(s) { var id = 'say' + (++sayN); return '<figure class="say"><q id="' + id + '">' + esc(s.fala) + '</q>' + (s.porque ? '<span class="why">' + s.porque + '</span>' : '') + '<button type="button" class="iconbtn copy" data-copy="#' + id + '" aria-label="Copiar fala">' + ICON.copy + '</button></figure>'; }
  function topic(t) {
    var h = '<article class="topic"><h3>' + t.titulo + '</h3>';
    if (t.fala) h += say({ fala: t.fala, porque: t.porque });
    h += '<div class="facts"><div class="fact l"><span class="who">Lula · 13</span><p>' + t.lula + '</p></div><div class="fact"><span class="who">Flávio · 22</span><p>' + t.flavio + '</p></div></div>';
    if (t.fontes) h += '<p class="src">Fontes: ' + t.fontes.map(function (f) { return '<a href="' + f[1] + '" target="_blank" rel="noopener noreferrer">' + f[0] + '</a>'; }).join(' · ') + '</p>';
    return h + '</article>';
  }
  function obj(o) {
    return '<details class="obj"><summary><span>“' + esc(o.diz) + '”</span>' + ICON.plus + '</summary><div class="body">' + say({ fala: o.resposta, porque: o.porque }) + (o.fonte ? '<p class="src">Fonte: <a href="' + o.fonte[1] + '" target="_blank" rel="noopener noreferrer">' + o.fonte[0] + '</a></p>' : '') + '</div></details>';
  }

  /* ---------- Método ---------- */
  function renderMetodo() { $('#metodo').innerHTML = C.metodo; }

  /* ---------- Ações globais ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-start],[data-go],[data-copy],[data-restart],[data-edit],[data-print]');
    if (!t) return;
    if (t.hasAttribute('data-start')) { if (diaDaEleicao()) return; state.step = 0; renderQ(); show('perguntas'); return; }
    if (t.hasAttribute('data-go')) {
      e.preventDefault();
      var g = t.getAttribute('data-go');
      if (g === 'metodo') renderMetodo();
      show(g);
      return;
    }
    if (t.hasAttribute('data-copy')) {
      var el = $(t.getAttribute('data-copy'));
      var txt = el ? el.textContent : '';
      var done = function () { t.classList.add('ok'); var old = t.innerHTML; t.innerHTML = ICON.ok + (t.classList.contains('iconbtn') ? '' : 'Copiado'); setTimeout(function () { t.innerHTML = old; t.classList.remove('ok'); }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () {});
      return;
    }
    if (t.hasAttribute('data-restart')) { state.a = {}; save(); state.step = 0; renderQ(); show('perguntas'); return; }
    if (t.hasAttribute('data-edit')) { state.step = 0; renderQ(); show('perguntas'); return; }
    if (t.hasAttribute('data-print')) { $('#roteiro').querySelectorAll('details').forEach(function (d) { d.open = true; }); window.print(); }
  });

  /* Estado inicial */
  var fase = diaDaEleicao();
  if (fase) {
    var hero = $('#inicio');
    var btn = $('[data-start]', hero);
    btn.disabled = true;
    var p = document.createElement('p');
    p.className = 'note';
    p.setAttribute('role', 'status');
    p.innerHTML = fase === 'durante'
      ? '<strong>Hoje é dia de eleição.</strong> A lei proíbe abordar eleitor para pedir voto até o fim da votação, às 17h de Brasília. Por isso o roteiro fica fechado hoje. Vá votar e leve seu documento com foto.'
      : '<strong>A votação do 2º turno terminou.</strong> Obrigado a quem conversou com respeito.';
    $('.actions', hero).after(p);
  }
  var startHash = (location.hash || '').slice(1);
  if (startHash === 'metodo') { renderMetodo(); show('metodo', false); }
  else if (startHash === 'roteiro' && isComplete() && !fase) { renderRoteiro(); show('roteiro', false); }
})();

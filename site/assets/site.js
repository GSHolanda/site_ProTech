/* PRO-TECH · Site 10K
   Motor da página: a vista explodida guiada pelo scroll, as entradas das seções,
   o teste de vazamento interativo e o formulário que abre o WhatsApp.
   JavaScript puro, sem dependências. A página funciona completa sem ele. */
(() => {
  'use strict';

  const root = document.documentElement;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (p, e0, e1) => {
    const t = clamp((p - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const rng = (seed) => {
    let s = seed >>> 0;
    return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  };
  const reduz = matchMedia('(prefers-reduced-motion: reduce)');

  window.PT_HERO = true; // avisa o script do <head> que o motor carregou

  document.querySelectorAll('[data-ano]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ------------------------------------------------------------------
     Divisão do texto das faixas (feita uma vez, com semente fixa)
     ------------------------------------------------------------------ */
  function dividir(el, modo, seed) {
    const texto = el.textContent.trim().replace(/\s+/g, ' ');
    const r = rng(seed);
    const sr = document.createElement('span');
    sr.className = 'sr';
    sr.textContent = texto;
    const vis = document.createElement('span');
    vis.setAttribute('aria-hidden', 'true');
    const palavras = texto.split(' ');
    const total = texto.replace(/ /g, '').length;
    let ci = 0;
    palavras.forEach((p, wi) => {
      const w = document.createElement('span');
      w.style.display = 'inline-block';
      w.style.whiteSpace = 'nowrap';
      if (modo === 'w') {
        w.className = 'rw';
        w.style.setProperty('--th', ((wi / palavras.length) * 0.5).toFixed(3));
        w.textContent = p;
      } else {
        for (const ch of p) {
          const c = document.createElement('span');
          c.className = 'c';
          c.textContent = ch;
          // alinhamento em grade: ordem de leitura, deslizando da direita
          c.style.setProperty('--th', ((ci / total) * 0.5 + r() * 0.06).toFixed(3));
          c.style.setProperty('--jx', (22 + r() * 16).toFixed(1) + 'px');
          w.appendChild(c);
          ci++;
        }
      }
      vis.appendChild(w);
      if (wi < palavras.length - 1) vis.appendChild(document.createTextNode(' '));
    });
    el.textContent = '';
    el.append(sr, vis);
  }

  document.querySelectorAll('[data-split]').forEach((el, i) => dividir(el, el.dataset.split, 20260924 + i));
  document.querySelectorAll('.b2 .w').forEach((w, i) => w.style.setProperty('--th', (i * 0.2).toFixed(2)));

  /* ------------------------------------------------------------------
     HERO: vista explodida guiada pelo scroll
     ------------------------------------------------------------------ */
  const hero = document.getElementById('hero');
  const svg = document.getElementById('prancha');

  if (hero && svg) {
    const pecas = [
      ['volante', 330, 150],
      ['k1', 348, 268],
      ['k2', 366, 378],
      ['eixos', 372, 468],
      ['meca', 600, 800],
    ].map(([id, yA, yF], i) => ({ el: document.getElementById('p-' + id), yA, yF, i }));
    const laudos = [...svg.querySelectorAll('[data-laudo]')];
    const rotulos = [...svg.querySelectorAll('[data-rotulo]')];
    const guias = rotulos.map((g) => g.querySelector('.guia'));
    const scan = document.getElementById('scan');
    const alturas = [162, 285, 393, 506, 820]; // altura de cada peça na prancha, para o laudo
    const bands = [...hero.querySelectorAll('.band')].map((el) => ({
      el,
      a: +el.dataset.a,
      b: +el.dataset.b,
      ramp: +el.dataset.ramp || 0,
      op: -1,
      k: -1,
      on: null,
    }));

    let heroTop = 0;
    let heroRange = 1;
    let target = 0;
    let shown = 0;
    let raf = null;
    let last = 0;
    let loadK = 0;
    let loadStart = 0;
    let ativo = false;
    let visivel = true;
    let cache = new WeakMap();

    // Escreve no DOM só quando o valor muda
    function set(el, prop, val) {
      let c = cache.get(el);
      if (!c) cache.set(el, (c = {}));
      if (c[prop] === val) return;
      c[prop] = val;
      if (prop.startsWith('--')) el.style.setProperty(prop, val);
      else el.setAttribute(prop, val);
    }

    const estreito = matchMedia('(max-width: 999px)');
    function ajustarViewBox() {
      svg.setAttribute('viewBox', estreito.matches ? '80 40 720 900' : '0 0 1000 1000');
    }
    estreito.addEventListener('change', () => {
      ajustarViewBox();
      if (ativo) {
        medir();
        onScroll();
      }
    });
    ajustarViewBox();

    function medir() {
      heroTop = hero.getBoundingClientRect().top + scrollY;
      heroRange = Math.max(1, hero.offsetHeight - innerHeight);
    }
    const progresso = () => clamp((scrollY - heroTop) / heroRange, 0, 1);

    function render(p) {
      // Trancos: as peças se soltam aos solavancos na faixa 2
      const tranco = Math.sin(Math.PI * clamp((p - 0.22) / 0.26, 0, 1));
      for (const pc of pecas) {
        const t = clamp((p - 0.06 - pc.i * 0.018) / 0.36, 0, 1);
        let y = lerp(pc.yA, pc.yF, easeIO(t));
        let rot = 0;
        if (tranco > 0.001) {
          y += tranco * 7 * Math.sin(p * 260 + pc.i * 1.7);
          rot = tranco * 1.4 * Math.sin(p * 190 + pc.i * 2.3);
        }
        set(pc.el, 'transform', `translate(440 ${y.toFixed(1)}) rotate(${rot.toFixed(2)})`);
      }

      // Scanner descendo peça por peça
      const sp = (p - 0.5) / 0.2;
      const sy = lerp(40, 930, clamp(sp, 0, 1));
      const sop = sp <= 0 || sp >= 1 ? 0 : Math.min(1, sp * 8, (1 - sp) * 8);
      set(scan, 'transform', `translate(0 ${sy.toFixed(1)})`);
      set(scan, 'opacity', sop.toFixed(2));

      // Laudo: OK em cada peça, FALHA na mecatrônica
      laudos.forEach((l, i) => {
        const o = p < 0.5 ? 0 : sp >= 1 ? 1 : clamp((sy - alturas[i]) / 40, 0, 1);
        set(l, 'opacity', o.toFixed(2));
      });
      const hl = p < 0.5 ? 0 : sp >= 1 ? 1 : clamp((sy - alturas[4]) / 60, 0, 1);
      set(svg, '--hl', hl.toFixed(2));

      // Rótulos da prancha, traçados em sequência
      rotulos.forEach((r, i) => {
        const t = clamp((p - 0.76 - i * 0.025) / 0.06, 0, 1);
        set(r, 'opacity', t.toFixed(2));
        set(guias[i], 'stroke-dashoffset', (1 - t).toFixed(3));
      });

      // Faixas de legenda: platô longo, rampas suaves
      bands.forEach((b, i) => {
        const primeira = i === 0;
        const ultima = i === bands.length - 1;
        const f = Math.min(0.02, (b.b - b.a) / 3);
        const op = (primeira ? 1 : smoothstep(p, b.a, b.a + f)) * (ultima ? 1 : 1 - smoothstep(p, b.b - f, b.b));
        let k = clamp((p - b.a) / (b.ramp || Math.min(0.025, (b.b - b.a) * 0.35)), 0, 1);
        if (primeira) k = Math.max(k, loadK);
        const opR = Math.round(op * 100) / 100;
        if (opR !== b.op) {
          b.op = opR;
          b.el.style.opacity = opR;
          const on = opR > 0;
          if (on !== b.on) {
            b.on = on;
            b.el.classList.toggle('on', on);
          }
        }
        if (Math.abs(k - b.k) > 0.008 || (k === 1 && b.k !== 1) || (k === 0 && b.k !== 0)) {
          b.k = k;
          b.el.style.setProperty('--k', k.toFixed(3));
        }
      });
    }

    // Loop que descansa quando converge
    function tick(now) {
      const dt = Math.min(100, now - (last || now));
      last = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
      if (loadK < 1) loadK = easeOut(clamp((now - loadStart) / 1100, 0, 1));
      const convergiu = Math.abs(target - shown) < 0.0005;
      if (convergiu) shown = target;
      render(shown);
      if (convergiu && loadK >= 1) {
        raf = null;
        last = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    }

    function onScroll() {
      target = progresso();
      if (raf === null && visivel) raf = requestAnimationFrame(tick);
    }

    // Estado final fixo (modo estático e movimento reduzido)
    function estadoFinal() {
      pecas.forEach((pc) => pc.el.setAttribute('transform', `translate(440 ${pc.yF})`));
      scan.setAttribute('opacity', '0');
      laudos.forEach((l) => l.removeAttribute('opacity'));
      rotulos.forEach((r) => r.removeAttribute('opacity'));
      guias.forEach((g) => g.removeAttribute('stroke-dashoffset'));
      svg.style.removeProperty('--hl');
      bands.forEach((b) => {
        b.el.style.removeProperty('opacity');
        b.el.style.removeProperty('--k');
        b.el.classList.remove('on');
        b.op = -1;
        b.k = -1;
        b.on = null;
      });
      cache = new WeakMap();
      root.classList.remove('hero-pronto');
    }

    function ligar() {
      if (ativo) return;
      ativo = true;
      root.classList.add('scrub');
      cache = new WeakMap();
      bands.forEach((b) => {
        b.op = -1;
        b.k = -1;
        b.on = null;
      });
      medir();
      target = shown = progresso();
      loadStart = performance.now();
      loadK = shown > 0.02 ? 1 : 0;
      render(shown);
      root.classList.add('hero-pronto');
      addEventListener('scroll', onScroll, { passive: true });
      if (raf === null) raf = requestAnimationFrame(tick);
    }

    function desligar() {
      if (!ativo && !root.classList.contains('scrub')) return;
      ativo = false;
      removeEventListener('scroll', onScroll);
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      root.classList.remove('scrub');
      estadoFinal();
    }

    // Portões do hero estático, vivos (mudam com rotação, janela e preferência)
    const GATES = [
      '(prefers-reduced-motion: reduce)',
      '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
    ];
    const MQLS = GATES.map((q) => matchMedia(q));
    function aplicarModo() {
      if (MQLS.some((m) => m.matches)) desligar();
      else ligar();
    }
    MQLS.forEach((m) => m.addEventListener('change', aplicarModo));

    addEventListener('resize', () => {
      if (!ativo) return;
      medir();
      onScroll();
    });
    addEventListener('load', () => {
      if (!ativo) return;
      medir();
      onScroll();
    });

    // Fora da tela, o loop e as animações do hero param
    new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      hero.classList.toggle('vivo', visivel);
      if (visivel && ativo) onScroll();
    }).observe(hero);

    aplicarModo();
  }

  /* ------------------------------------------------------------------
     Entradas das seções e elementos vivos
     ------------------------------------------------------------------ */
  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        const el = e.target;
        el.classList.add('in');
        io.unobserve(el);
        // aposenta os atrasos de escalonamento depois da entrada
        setTimeout(() => el.classList.add('pronto'), 1600);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );
  document.querySelectorAll('[data-in]').forEach((el) => io.observe(el));

  const ioVivo = new IntersectionObserver((entradas) => {
    for (const e of entradas) e.target.classList.toggle('vivo', e.isIntersecting);
  });
  document.querySelectorAll('[data-vivo]').forEach((el) => ioVivo.observe(el));

  document.addEventListener('visibilitychange', () => document.body.classList.toggle('pausado', document.hidden));

  /* ------------------------------------------------------------------
     O teste acusou: segurar para pressurizar a mecatrônica
     ------------------------------------------------------------------ */
  const teste = document.getElementById('teste');
  if (teste) {
    const botao = teste.querySelector('[data-segurar]');
    const rotulo = teste.querySelector('[data-segurar-rotulo]');
    const veredito = teste.querySelector('[data-veredito]');
    const leitura = teste.querySelector('[data-leitura]');
    const manometro = teste.querySelector('.manometro');
    const ALVO = 0.78;
    const BAIXO = 0.3;
    const MSG = {
      pronto: 'Segure até o ponteiro parar de subir.',
      subindo: 'Pressurizando. Continue segurando.',
      soltou: 'Soltou cedo. Segure até o ponteiro estabilizar.',
      estavel: 'Pressão no alvo. Segure mais um pouco.',
      caindo: 'Olha o ponteiro.',
    };
    let v = 0;
    let estado = 'pronto';
    let segurando = false;
    let tEstavel = 0;
    let rafT = null;
    let lastT = 0;
    let ultimaLeitura = '';
    let ultimaLeituraEm = 0;
    let ultimoEstado = '';
    let ultimoV = -1;
    let ultimoSeg = -1;

    function escrever(now) {
      const vR = Math.round(v * 1000) / 1000;
      if (vR !== ultimoV) {
        ultimoV = vR;
        manometro.style.setProperty('--v', vR);
      }
      const seg =
        estado === 'subindo' ? (v / ALVO) * 0.7 : estado === 'estavel' ? 0.7 + (tEstavel / 1.1) * 0.3 : estado === 'feito' || estado === 'caindo' ? 1 : 0;
      const segR = Math.round(seg * 100) / 100;
      if (segR !== ultimoSeg) {
        ultimoSeg = segR;
        botao.style.setProperty('--seg', segR);
      }
      const txt = estado === 'feito' ? 'VAZAMENTO' : estado === 'pronto' && v === 0 ? 'PRONTO' : `PRESSÃO ${String(Math.round(v * 100)).padStart(2, '0')}%`;
      if (txt !== ultimaLeitura && (now - ultimaLeituraEm > 100 || estado === 'feito' || v === 0)) {
        ultimaLeitura = txt;
        ultimaLeituraEm = now;
        leitura.textContent = txt;
      }
      if (estado !== ultimoEstado) {
        ultimoEstado = estado;
        if (estado === 'feito') {
          veredito.innerHTML = '<b>O teste acusou.</b> A pressão caiu: a mecatrônica tem vazamento. É assim que a gente acha a peça antes de falar em trocar o câmbio.';
          rotulo.textContent = 'Refazer o teste';
        } else {
          veredito.textContent = MSG[estado];
          rotulo.textContent = 'Segure para pressurizar';
        }
      }
    }

    function concluir() {
      estado = 'feito';
      v = BAIXO;
      teste.classList.add('feito');
    }

    function passo(now) {
      const dt = Math.min(100, now - (lastT || now)) / 1000;
      lastT = now;
      if (estado === 'pronto' || estado === 'subindo' || estado === 'soltou') {
        if (segurando) {
          estado = 'subindo';
          v = Math.min(ALVO, v + dt * 0.55);
          if (v >= ALVO) {
            estado = 'estavel';
            tEstavel = 0;
          }
        } else {
          if (estado === 'subindo') estado = 'soltou';
          v = Math.max(0, v - dt * 0.6); // soltou: desce suave, nunca estala
          if (v === 0 && estado !== 'soltou') estado = 'pronto';
        }
      } else if (estado === 'estavel') {
        if (!segurando) estado = 'soltou';
        else {
          tEstavel += dt;
          if (tEstavel > 1.1) estado = 'caindo';
        }
      } else if (estado === 'caindo') {
        v = Math.max(BAIXO, v - dt * 0.34); // o teste segue sozinho: a pressão cai
        if (v <= BAIXO) concluir();
      }
      escrever(now);
      const parado = estado === 'feito' || ((estado === 'pronto' || estado === 'soltou') && v === 0 && !segurando);
      if (parado) {
        rafT = null;
        lastT = 0;
      } else rafT = requestAnimationFrame(passo);
    }

    function comecar() {
      if (reduz.matches) {
        concluir();
        escrever(performance.now());
        return;
      }
      if (estado === 'feito') {
        estado = 'pronto';
        v = 0;
      }
      segurando = true;
      if (rafT === null) rafT = requestAnimationFrame(passo);
    }
    function parar() {
      segurando = false;
      if (rafT === null && estado !== 'feito') rafT = requestAnimationFrame(passo);
    }

    botao.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button > 0) return;
      e.preventDefault();
      try {
        botao.setPointerCapture(e.pointerId);
      } catch (_) {}
      comecar();
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((t) => botao.addEventListener(t, parar));
    botao.addEventListener('keydown', (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
        e.preventDefault();
        comecar();
      }
    });
    botao.addEventListener('keyup', (e) => {
      if (e.key === ' ' || e.key === 'Enter') parar();
    });
    botao.addEventListener('blur', parar);
    botao.addEventListener('contextmenu', (e) => e.preventDefault());
    botao.addEventListener('click', (e) => e.preventDefault());

    // Movimento reduzido ligado no meio da visita: o teste vai para o estado final
    reduz.addEventListener('change', (e) => {
      if (e.matches && estado !== 'feito' && estado !== 'pronto') {
        concluir();
        escrever(performance.now());
      }
    });
  }

  /* ------------------------------------------------------------------
     Formulário: monta a mensagem e abre o WhatsApp da oficina
     ------------------------------------------------------------------ */
  const form = document.querySelector('[data-form]');
  if (form) {
    const ok = form.querySelector('[data-form-ok]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const carro = form.querySelector('#f-carro').value.trim();
      const sintoma = form.querySelector('#f-sintoma').value.trim();
      let texto = `Olá, PRO-TECH! Vim pelo site e gostaria de um orçamento para meu ${carro}.`;
      if (sintoma) texto += `\nO que está acontecendo: ${sintoma}`;
      const url = 'https://wa.me/5561991533032?text=' + encodeURIComponent(texto);
      const janela = window.open(url, '_blank');
      if (janela) janela.opener = null;
      else window.location.href = url;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Toque aqui';
      ok.textContent = 'Abrimos o WhatsApp numa nova aba com a sua mensagem. Não abriu? ';
      ok.append(link, '.');
      ok.hidden = false;
    });
  }
})();

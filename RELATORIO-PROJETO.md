# Relatório do Projeto — Site institucional PRO-TECH

## Resumo executivo

Desenvolvimento completo, do zero, de um site institucional para a **PRO-TECH**, oficina
mecânica especializada em Volkswagen e Audi em Brasília-DF, com foco em geração de leads via
WhatsApp e posicionamento em buscas locais (SEO). O projeto foi conduzido em duas frentes
técnicas independentes e comparáveis — uma stack moderna orientada a conteúdo (Astro +
Tailwind) e uma versão experimental de página única com animação cinematográfica guiada por
scroll — permitindo decisão informada entre abordagens antes da entrega final ao cliente.

## Escopo e responsabilidades

- Levantamento de requisitos a partir de material bruto do cliente (perfil do Instagram,
  posts, reels e briefing de marca), sem acesso a briefing formal ou wireframes prontos.
- Pesquisa de mercado e de linguagem real de clientes (avaliações públicas, reclamações e
  fóruns especializados em câmbio DSG) para embasar copywriting e estrutura de conversão.
- Arquitetura de informação, design de interface e definição de identidade visual (paleta,
  tipografia, sistema de ícones) a partir de ativos de marca incompletos.
- Implementação full front-end de duas soluções técnicas distintas, ambas 100% estáticas.
- Engenharia de performance, acessibilidade e SEO técnico, com metas objetivas e verificação
  automatizada em ambas as versões.
- Geração de ativos visuais (favicon, ícones, imagem de compartilhamento social) via pipeline
  de processamento de imagem (Sharp) a partir de logotipo redesenhado em vetor.
- Documentação de produto: guias de manutenção, checklist de pendências para o cliente e
  comparativo técnico entre as duas versões entregues.

## Solução 1 — Site multi-página (Astro + Tailwind CSS)

Stack: Astro 7, Tailwind CSS 4, TypeScript, `@astrojs/sitemap`, `astro:assets`, Sharp.

- Arquitetura orientada a dados: todo o conteúdo do site centralizado em um único arquivo
  tipado (`site.ts`), permitindo que qualquer pessoa não técnica edite textos, contatos e
  serviços sem tocar em componentes.
- 5 páginas: home, landing page técnica dedicada ("Câmbio DSG"), duas páginas de serviço
  geradas dinamicamente via `getStaticPaths` a partir dos mesmos dados, e página 404 customizada.
- Sistema de design tokenizado (cor de acento trocável em um único ponto, com par de paletas
  pré-calculadas para contraste AA), tipografia hospedada localmente via API de fontes do Astro
  com fallback de métricas ajustadas (evita layout shift no carregamento de fonte).
- SEO técnico completo: JSON-LD (`AutoRepair`/`LocalBusiness`, `FAQPage`, `BreadcrumbList`,
  `Service`), Open Graph e Twitter Cards com imagem gerada automaticamente, sitemap e
  `robots.txt` dinâmicos, canonical URLs.
- Acessibilidade: navegação por teclado completa no menu mobile, skip-link, hierarquia de
  headings validada, `aria-live` no formulário, ícones decorativos ocultados corretamente,
  `prefers-reduced-motion` respeitado.
- Integração de conversão: geração de links `wa.me` com mensagem pré-preenchida
  contextual por serviço, formulário "orçamento rápido" client-side (sem backend) que monta a
  mensagem e abre o WhatsApp.

## Solução 2 — Página única cinematográfica ("Site 10K")

Stack: HTML5, CSS3 e JavaScript vanilla, zero dependências de build, zero frameworks.

- Hero guiado por scroll: peça mecânica (câmbio DSG) desenhada inteiramente em SVG paramétrico
  (gerado via script Node com projeção isométrica calculada matematicamente), animada por
  interpolação de progresso de scroll em `requestAnimationFrame` com easing e sistema de
  faixas de texto sincronizadas ("scrollytelling").
- Engenharia de performance do zero: loop de animação que "descansa" quando convergido,
  escrita no DOM apenas em mudança de valor (evita layout thrashing), sprite SVG único para
  ícones, fontes variáveis subsetadas via `fonttools` (redução de ~40% no peso).
- Elemento interativo customizado: simulação de "teste de vazamento de mecatrônica" com
  manômetro SVG animado, controlado por press-and-hold (mouse, touque e teclado), com
  máquina de estados própria.
- Engenharia de acessibilidade avançada: 5 "gates" de media query sincronizados entre CSS e
  JavaScript para alternar entre modo animado e modo estático (mobile, tablet, orientação,
  `prefers-reduced-motion`), com escuta ativa de mudança em tempo real (não apenas no
  carregamento). Página 100% funcional sem JavaScript.
- Validação de contraste automatizada: script de auditoria que captura screenshots do estado
  real renderizado, mede o pior pixel sob cada bloco de texto e calcula a razão de contraste
  WCAG programaticamente, ao invés de inspeção visual manual.
- Testes automatizados via Playwright headless: simulação de "flick scroll" em diferentes
  velocidades para validar legibilidade do texto animado, teste de overflow horizontal em 6
  larguras de viewport, teste do ciclo completo de `prefers-reduced-motion` (ligar/desligar em
  runtime), teste de formulário e teste da interação de segurar-para-ativar.

## Práticas de engenharia aplicadas

- **Verificação, não suposição:** todo resultado (build, Lighthouse, contraste, funcionamento
  sem JS, formulário) foi testado com ferramentas automatizadas (Playwright, Lighthouse CLI,
  scripts próprios) antes de ser reportado como concluído.
- **Decisões documentadas:** desvios de padrão (ex.: fontes hospedadas localmente ao invés de
  CDN, animação em código ao invés de vídeo gerado por IA) foram registrados com a métrica que
  justificou a escolha (ex.: redução de FCP de 3,2s para 1,1s).
- **Rastreabilidade de pendências:** itens que dependiam de informação exclusiva do cliente
  (endereço oficial, validação técnica de conteúdo por mecânico especializado, material
  fotográfico, identidade visual final) foram isolados e documentados em checklist próprio,
  nunca inventados ou assumidos.
- **Versionamento estruturado:** duas soluções mantidas em branches Git paralelas e
  comparáveis, com commits descritivos e histórico limpo, prontas para deploy independente
  (Vercel/Netlify) e comparação lado a lado pelo cliente.

## Resultados mensuráveis

| Métrica | Solução Astro | Solução página única |
|---|---|---|
| Lighthouse Performance (mobile) | 100/100 | 100/100 |
| Lighthouse Acessibilidade | 100/100 | 100/100 |
| Lighthouse Boas Práticas / SEO | 100/100 | 100/100 |
| Peso total da página | — | ~112 KB |
| Contraste mínimo validado (texto sobre fundo animado) | — | 5,9:1 (meta: 3,5:1) |

## Tecnologias e ferramentas

Astro, Tailwind CSS, TypeScript, JavaScript (ES2022+, vanilla), HTML5/CSS3 avançado
(custom properties, `@layer`, container queries), SVG programático, Node.js, Sharp
(processamento de imagem), fonttools (subsetting de fontes), Playwright (testes E2E e
automação de navegador headless), Lighthouse CI, Git, JSON-LD/Schema.org, WCAG 2.1 AA,
arquitetura JAMstack, deploy em Vercel/Netlify.

---

### Sugestão de bullet points para currículo

> **Desenvolvimento full front-end de site institucional para oficina automotiva (Astro,
> Tailwind, TypeScript)** — Projetei e implementei arquitetura orientada a dados com conteúdo
> centralizado, SEO técnico (JSON-LD, sitemap), acessibilidade WCAG AA e otimização de imagens,
> atingindo 100/100 no Google Lighthouse em todas as categorias.

> **Prototipagem de experiência interativa guiada por scroll em JavaScript vanilla** —
> Desenvolvi animação SVG paramétrica sincronizada ao scroll, sistema de fallback estático
> multi-gate para acessibilidade, e suíte de testes automatizados com Playwright para validar
> contraste de cor, performance e comportamento sem JavaScript, resultando em página de ~112 KB
> com nota máxima em performance e acessibilidade.

---

*Relatório gerado a partir do histórico real de commits e artefatos do projeto
(repositório `site_ProTech`, branches `claude/upbeat-bell-4wogxr` e `claude/site-10k`).*

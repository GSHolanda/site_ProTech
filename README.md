# PRO-TECH · versão Site 10K

Site de uma página, cinematográfico e guiado pelo scroll, feito com a skill **Site de 10K**.
É a alternativa à versão em Astro (ramificação `claude/upbeat-bell-4wogxr`), para comparar e escolher.

**A ideia:** "A peça certa." No topo, um câmbio DSG desenhado em traço técnico se desmonta
enquanto a pessoa rola a página. O scanner passa peça por peça, só a mecatrônica acende em azul, e
a página assenta numa prancha técnica com o laudo "OK OK OK OK FALHA". Abaixo, um site completo
afunila para uma só ação: mandar o sintoma no WhatsApp.

Todas as decisões de design e o texto final estão em [`pacote-de-design.md`](pacote-de-design.md).

## O que tem na pasta

```
site/                 ← é isto que vai para o ar (e só isto)
  index.html          ← a página inteira: texto, estilos e dados para o Google
  404.html            ← página de erro
  robots.txt, sitemap.xml
  assets/
    site.js           ← o motor: animação do topo, teste interativo, formulário
    fonts/            ← fontes hospedadas no site (licença OFL)
    og-image.png      ← imagem que aparece ao compartilhar o link
    logo-512.png, apple-touch-icon.png
pacote-de-design.md   ← decisões de design e texto
PENDENCIAS.md         ← o que falta confirmar com o cliente
vercel.json, netlify.toml
```

HTML, CSS e JavaScript puros. Sem framework, sem npm, sem build.

## Ver no computador

- **Rápido:** dois cliques em `site/index.html`. Nesse modo o topo pode aparecer parado; é normal
  quando o arquivo é aberto direto do disco.
- **Completo, com a animação:** dentro da pasta `site/`, rode um servidor simples, por exemplo
  `npx http-server` ou `python -m http.server`, e abra o endereço `localhost` que aparecer.

## Como editar

O texto está direto no `site/index.html`, em ordem de leitura. Pontos que mudam com frequência:

- **Telefones do WhatsApp:** procure `wa.me/5561991533032` e `wa.me/5561995418481`.
- **Nota e avaliações:** procure `4,9` e `141` (aparecem no topo, na seção Avaliações, em Sobre e nos
  dados para o Google, `ratingValue` e `reviewCount`).
- **Endereço, horário e Instagram:** seção `contato` e rodapé.
- **Depoimentos:** há um modelo comentado na seção `avaliacoes`. Use só texto literal com nome autorizado.
- **Cor de acento:** no começo do `<style>`, troque `--accent`, `--accent-hover`, `--accent-bright`,
  `--accent-ink` e `--accent-muted` juntos.

Itens a confirmar estão marcados com `TODO` no código e listados em [`PENDENCIAS.md`](PENDENCIAS.md).

## Publicar

O que vai para o ar é só a pasta `site/`.

- **HostGator (padrão da skill):** subir o conteúdo de `site/` para `public_html` por FTP. Na hora de
  publicar, eu monto um script `publicar` de um comando; os dados de acesso ficam num arquivo
  `hostgator.env` fora do repositório e nunca passam pelo chat.
- **Vercel ou Netlify:** importe o repositório. `vercel.json` e `netlify.toml` já apontam para a
  pasta `site/` sem build. Útil para ter um link de pré-visualização e comparar com a versão Astro.

Antes de publicar no domínio definitivo, troque `https://protechbsb.com.br` nos lugares marcados com
`DEPLOY STEP` (no `index.html`, no `robots.txt` e no `sitemap.xml`).

## Qualidade medida

- Lighthouse no celular: 100 em Performance, Acessibilidade, Boas Práticas e SEO. Computador: 100 nos quatro.
- Peso total da página: cerca de 112 KB (não há vídeo; a animação é desenhada em código).
- Contraste no pior pixel atrás de cada legenda do topo: no mínimo 5,9:1 (a meta da skill é 3,5:1),
  medido em celular, tablet, notebook e desktop.
- Teste de flick: cada legenda fica legível por 6 a 9 rolagens normais e nenhuma é pulada em rolagem rápida.
- Movimento reduzido: o topo vira a prancha parada, e a troca funciona com a página aberta.
- Sem JavaScript: a página continua completa, com a prancha final e todos os botões.

## Diferenças para a versão Astro

| | Site 10K (esta) | Astro |
|---|---|---|
| Páginas | Uma página longa | Início, Câmbio DSG, 2 páginas de serviço e 404 |
| Topo | Animação da vista explodida guiada pelo scroll | Tipografia sobre fundo escuro |
| Editar conteúdo | Direto no `index.html` | Tudo num arquivo `site.ts` |
| SEO | Uma página focada, com FAQ | Mais páginas para mais buscas |
| Publicação | FTP na HostGator, ou Vercel e Netlify | Vercel ou Netlify |

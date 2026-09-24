# Site da PRO-TECH

Site institucional da **PRO-TECH**, oficina mecânica especializada em Volkswagen e Audi
no Guará, Brasília-DF. O objetivo é gerar contatos pelo WhatsApp e aparecer no Google
para buscas como "oficina câmbio DSG Brasília" e "reparo mecatrônica DQ200".

- **Astro 7 + Tailwind CSS 4**, site 100% estático (sem backend).
- Todo o conteúdo fica em **um único arquivo**: [`src/data/site.ts`](src/data/site.ts).
- Pendências a confirmar com o cliente: [`PENDENCIAS.md`](PENDENCIAS.md).

## Páginas

| Endereço | Conteúdo |
|---|---|
| `/` | Página inicial: topo, especialidades e modelos, serviços, câmbio DSG, como funciona, diferenciais, casos reais (quando houver fotos), avaliações, sobre e contato |
| `/cambio-dsg` | O que é o DSG, DQ200 × DQ250, sintomas, diagnóstico, modelos, perguntas frequentes |
| `/servicos/descarbonizacao-tsi` | Página de serviço gerada a partir do `site.ts` |
| `/servicos/corrente-de-comando` | Página de serviço gerada a partir do `site.ts` |
| `/404` | Página de erro personalizada |

Também são gerados `sitemap-index.xml`, `robots.txt`, o favicon e a imagem de compartilhamento.

## Rodar no computador

É preciso ter o [Node.js](https://nodejs.org) **22.12 ou mais novo**.

```bash
npm install        # uma vez, para baixar as dependências
npm run dev        # abre o site em http://localhost:4321 e atualiza a cada alteração
npm run build      # confere os tipos e gera o site final na pasta dist/
npm run preview    # mostra o site final (dist/) em http://localhost:4321
```

## Estrutura

```
assets-cliente/          ← logo, fotos e vídeos entregues pelo cliente (ver README da pasta)
public/                  ← arquivos copiados sem alteração (favicon, og-image.png…)
scripts/
  gerar-icones.mjs       ← gera favicon.ico, apple-touch-icon.png e logo-512.png
  og-image.html          ← modelo da imagem de compartilhamento
src/
  data/site.ts           ← TODO O CONTEÚDO DO SITE
  styles/global.css      ← cor de acento, cinzas e estilos base
  layouts/BaseLayout.astro  ← <head>: SEO, Open Graph, JSON-LD, fontes
  components/            ← peças reutilizáveis (header, rodapé, botões, formulário…)
  components/home/       ← seções da página inicial
  lib/                   ← WhatsApp, dados estruturados, fotos e textos
  pages/                 ← uma página por arquivo
```

## Como editar o conteúdo

Abra `src/data/site.ts`. Ele está dividido em blocos com comentários:

- **Dados da empresa** (`site`): endereço, WhatsApps, horário, Instagram, nota no Google, links do Maps, razão social e CNPJ.
- **Nota no Google**: mude `NOTA_GOOGLE` e `TOTAL_AVALIACOES` no começo do arquivo. Todos os textos que citam a nota se atualizam.
- **Mensagens do WhatsApp** (`site.mensagens`): textos que abrem prontos no WhatsApp. `{servico}`, `{carro}` e `{sintoma}` são trocados automaticamente.
- **SEO** (`seo`): título e descrição de cada página no Google.
- **Página inicial**: `hero`, `especialidades`, `modelos`, `servicos`, `comoFunciona`, `dsgDestaque`, `diferenciais`, `avaliacoes`, `casos`, `sobre`, `contato`.
- **Página Câmbio DSG**: `paginaDsg`.
- **Páginas de serviço**: `paginasServico`. Cada item vira uma página em `/servicos/<slug>`.

Regras práticas:

- **Códigos técnicos entre crases** aparecem em fonte mono: ``"Mecatrônica DSG `DQ200` (`0AM`)"``.
- **Novo serviço no card**: acrescente `{ nome: "..." }` na lista `itens` do grupo. O botão de orçamento do WhatsApp é criado sozinho.
- **Nova página de serviço**: copie um item de `paginasServico`, mude o `slug` e os textos, e deixe `publicada: true`. Ela entra no sitemap, no rodapé e ganha dados estruturados.
- **Tirar uma página do ar**: `publicada: false`.
- **Depoimentos**: cole o texto **literal** da avaliação do Google e o nome **autorizado** em `avaliacoes.depoimentos`. Card com texto vazio não aparece. Não invente depoimentos.
- **Casos reais**: preencha fotos (`antes`, `depois`) ou `video` em `casos.itens` e mude `casos.ativo` para `true`. Sem mídia, a seção não aparece.
- **Razão social, CNPJ e garantia**: aparecem no site assim que forem preenchidos.

Depois de editar, rode `npm run build` para conferir se está tudo certo.

## Como trocar a cor de acento

O site usa preto e branco (as cores do logo) e **uma** cor de acento. Ela é definida em
um só lugar, no começo de [`src/styles/global.css`](src/styles/global.css):

```css
:root {
  /* Azul (padrão) */
  --accent: #1e4fd8;
  --accent-hover: #1740b3;
  --on-accent: #ffffff;
  --accent-ink: #1e4fd8;
  --accent-glow: #8ea6f2;

  /* Amarelo (alternativa em estudo): apague o bloco azul acima e
     descomente as 5 linhas abaixo. */
}
```

São 5 valores porque a mesma cor não funciona igual em fundo claro e escuro. O amarelo,
por exemplo, precisa de texto preto em cima e de uma versão escura para virar texto em
fundo branco. Os dois conjuntos já estão calculados para contraste AA. Se for usar outra
cor, confira o contraste em <https://webaim.org/resources/contrastchecker/>.

Para mudar a imagem de compartilhamento junto, troque `--accent` também em
`scripts/og-image.html` (veja "Imagem de compartilhamento" abaixo).

## Logo, fotos e vídeos

Tudo o que o cliente entregar vai para [`assets-cliente/`](assets-cliente/README.md):

- **Logo**: `assets-cliente/logo.svg`. Quando o arquivo existir, o site usa ele no header
  e no rodapé automaticamente. Hoje o monograma é um redesenho feito a partir das capturas do Instagram.
- **Fotos**: `assets-cliente/fotos/`. Escreva só o nome do arquivo no `site.ts`, por exemplo
  `hero.foto`, `sobre.foto` ou `casos.itens[...].antes`. O site gera versões WebP em
  vários tamanhos e carrega as fotos abaixo da primeira tela só quando o visitante chega nelas.
- **Vídeos**: `assets-cliente/videos/` em MP4, curtos e leves. Só carregam quando o visitante toca no play.

### Favicon e ícones

O favicon está em `public/favicon.svg`. Depois de trocar pelo logo oficial, rode:

```bash
npm run icones
```

Isso gera `favicon.ico`, `apple-touch-icon.png` e `logo-512.png` (usado no Google).

### Imagem de compartilhamento

`public/og-image.png` (1200×630) aparece quando alguém compartilha o link no WhatsApp,
Instagram ou Facebook. Para trocar, substitua o arquivo por outra imagem de 1200×630. O
modelo atual está em `scripts/og-image.html`: abra no navegador com a janela em
1200×630 e faça uma captura de tela.

## Deploy

O site é estático: o build gera a pasta `dist/`, que pode ir para qualquer hospedagem.
Vercel e Netlify já estão configurados (`vercel.json` e `netlify.toml`) e têm plano gratuito.

### Vercel

1. Suba o projeto para o GitHub.
2. Em <https://vercel.com/new>, importe o repositório. A Vercel detecta o Astro sozinha;
   as configurações de build já estão em `vercel.json`.
3. Clique em **Deploy**. A cada novo commit na branch principal, o site é publicado de novo.

### Netlify

1. Suba o projeto para o GitHub.
2. Em <https://app.netlify.com/start>, escolha o repositório. Build command e pasta de
   publicação já vêm do `netlify.toml` (`npm run build` e `dist`).
3. Clique em **Deploy**.

### Apontar o domínio (sugestão: protechbsb.com.br)

1. Registre o domínio no [Registro.br](https://registro.br), se ainda não tiver.
2. No painel da hospedagem, adicione o domínio:
   - **Vercel**: Project → Settings → Domains → Add `protechbsb.com.br` e `www.protechbsb.com.br`.
   - **Netlify**: Site configuration → Domain management → Add a domain.
3. A hospedagem mostra os registros DNS a criar. No Registro.br, em **DNS → Editar zona**,
   crie exatamente os valores mostrados. Em geral são:
   - um registro **A** para `protechbsb.com.br` (sem o www);
   - um **CNAME** para `www` apontando para o endereço indicado pela hospedagem.

   Como alternativa, troque os servidores DNS do domínio pelos da hospedagem, se ela oferecer.
4. Aguarde a propagação (de minutos a algumas horas). O HTTPS é ativado automaticamente.
5. Se o domínio final for outro, atualize `url` em `src/data/site.ts`. Ele é usado no
   endereço canônico, no sitemap, no `robots.txt` e nas imagens de compartilhamento.

### Depois de publicar

- **Google Search Console**: adicione o domínio e envie `https://protechbsb.com.br/sitemap-index.xml`.
- **Perfil da Empresa no Google**: coloque o link do site e confira se nome, endereço e
  telefone estão **idênticos** aos do site. Isso pesa mais na busca local do que o próprio site.
- **Instagram e Linktree**: atualize o endereço e coloque o link do site na bio.
- Teste os dados estruturados em <https://search.google.com/test/rich-results>.

## Qualidade

- Meta Lighthouse ≥ 95 no mobile em Performance, Acessibilidade, Boas Práticas e SEO.
- Um único H1 por página, `alt` em todas as imagens, foco visível e menu mobile por teclado (Esc fecha).
- Animações respeitam `prefers-reduced-motion`.
- Fontes (Barlow, Barlow Condensed e JetBrains Mono) hospedadas no próprio site, com
  fallback de métricas ajustadas para o texto não "pular" quando a fonte carrega.
- O formulário de orçamento não envia nada para servidor: ele só monta a mensagem e abre o WhatsApp.

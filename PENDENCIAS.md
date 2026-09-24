# Pendências com o cliente

Itens a confirmar antes de publicar. Cada um está marcado com `TODO` no código.
Quase tudo se resolve editando [`src/data/site.ts`](src/data/site.ts).

## Bloqueiam o lançamento

- [ ] **Endereço final.** Há 3 versões publicadas:
  - Bio do Instagram: SMAS Trecho 1, CJ 01 LT 01, Guará, CEP 71213-010
  - Google Maps e post fixado: SMAS Trecho 1, Chácara 49, Lote 1C, próximo ao Galpão 17, Guará I, CEP 71215-340
  - Linktree: Guará I lote 05-A, lote 03/04, Guará, Brasília

  O site usa a do Maps, que vale desde 18/05/2026. Confirmar e **unificar nos três canais**.
  → `site.endereco` em `src/data/site.ts`
- [ ] **WhatsApp principal.** Hoje é (61) 99153-3032, e o (61) 99541-8481 aparece só em Contato e no rodapé.
  → `site.whatsapp`
- [ ] **Domínio.** Sugestão: `protechbsb.com.br`. Usado no endereço canônico, no sitemap e no Open Graph.
  → `site.url`
- [ ] **Validação técnica pelo mecânico** de tudo marcado com `TODO: validar com o mecânico`:
  - [ ] Página Câmbio DSG: explicação do DSG, tabela DQ200 × DQ250 (principalmente a linha "Uso comum"), sintomas, etapas do diagnóstico, o que o teste de vazamento verifica, lista de modelos com DSG e as 5 respostas do FAQ → `paginaDsg`
  - [ ] Destaque DSG da página inicial → `dsgDestaque`
  - [ ] Página Descarbonização TSI: método de limpeza, uso de boroscópio, modelos e recomendação de quilometragem → `paginasServico[0]`
  - [ ] Página Corrente de comando: kit trocado e marca das peças, sincronismo, quais motores usam corrente e quais usam correia, modelos → `paginasServico[1]`
  - [ ] Serviço "Turbina": diagnóstico, reparo ou troca? → `servicos.grupos` (Motor)
  - [ ] Processo "Como funciona" (3 etapas) → `comoFunciona.passos`
  - [ ] Diferencial "Acompanhamento do serviço": como é feito (fotos? vídeos?) → `diferenciais`

  Se as páginas de serviço não forem validadas a tempo, mude `publicada` para `false`.

## Identidade visual

- [ ] **Cor de acento: azul `#1E4FD8` (padrão) ou amarelo `#F5B800`.** Troca em um só lugar.
  → começo de `src/styles/global.css` (ver README, "Como trocar a cor de acento")
- [ ] **Logo em vetor** (SVG, AI ou PDF) e a fonte usada no "PRO-TECH". Hoje o monograma foi redesenhado a partir das capturas do Instagram.
  → salvar como `assets-cliente/logo.svg`, trocar `public/favicon.svg`, rodar `npm run icones`
  e atualizar `scripts/og-image.html` e `public/og-image.png`

## Fotos e vídeos

- [ ] **Fotos em alta da nova estrutura** (fachada, oficina, equipamentos, carro com a placa PROTECH) para o topo da página inicial.
  → `assets-cliente/fotos/` + `hero.foto`
- [ ] **Foto da equipe** (e nomes, se quiserem) para a seção Sobre.
  → `assets-cliente/fotos/` + `sobre.foto`
- [ ] **Vídeos originais dos reels**, sem a interface do Instagram, e fotos de antes e depois:
  Tiguan (descarbonização), Jetta (corrente), Amarok V6 (confirmar qual serviço) e mecatrônica DSG.
  → `assets-cliente/videos/` e `assets-cliente/fotos/` + `casos.itens`, depois `casos.ativo = true`
- [ ] **Autorização para usar os vídeos e fotos de carros de clientes** no site.

## Avaliações

- [ ] **Textos literais de 3 avaliações do Google e autorização de uso** (nome como deve aparecer).
  Não inventar depoimentos. Card vazio não aparece.
  → `avaliacoes.depoimentos`
- [ ] **Link direto das avaliações** e link **"Pedir avaliações"** do Perfil da Empresa no Google
  (formato `https://g.page/r/.../review`). Hoje os botões abrem uma busca no Maps.
  → `site.google.urlAvaliacoes` e `site.google.urlAvaliar`
- [ ] **Link "Compartilhar" do Perfil da Empresa** para o botão "Abrir no Google Maps".
  → `site.mapsUrl`

## Informações da empresa

- [ ] **Política de garantia** (prazo e o que cobre). Aparece em "Como funciona" quando preenchida.
  → `comoFunciona.garantia`
- [ ] **Razão social e CNPJ** para o rodapé. Só aparecem quando preenchidos.
  → `site.legal`
- [ ] **História**: ano de fundação, nome do responsável, equipamentos da nova estrutura (opcional).
  → `sobre.paragrafos`
- [ ] **Latitude e longitude** do endereço confirmado, para os dados estruturados do Google.
  → `src/lib/schema.ts` (campo `geo`)

## Depois de publicar

- [ ] Cadastrar o site no Google Search Console e enviar o sitemap.
- [ ] Colocar o link do site no Perfil da Empresa no Google, no Instagram e no Linktree.
- [ ] Atualizar de vez em quando a nota e o total de avaliações (`NOTA_GOOGLE` e `TOTAL_AVALIACOES`).

# Arquivos do cliente

Coloque aqui o material da PRO-TECH. O site lê esta pasta no build.

| O quê | Onde | Observações |
|---|---|---|
| Logo oficial | `assets-cliente/logo.svg` | Em vetor (SVG). Assim que o arquivo existir, o site usa ele no lugar do placeholder. |
| Fotos | `assets-cliente/fotos/` | JPG, PNG, WebP ou AVIF, na maior resolução que tiver. O site redimensiona e converte sozinho. |
| Vídeos | `assets-cliente/videos/` | MP4 (H.264), curtos (até ~30 s) e com até ~10 MB cada. Use os arquivos originais, sem a interface do Instagram. |

Depois de colocar o arquivo, escreva o **nome** dele no lugar certo em
`src/data/site.ts`. Exemplo para a foto do topo da página inicial:

```ts
foto: { arquivo: "fachada.jpg", alt: "Fachada da PRO-TECH no Guará" },
```

Dicas:

- Evite espaços e acentos no nome do arquivo (`tiguan-antes.jpg`, não `Tiguan Antes.JPG`).
- O `alt` descreve a foto para quem usa leitor de tela e para o Google. Seja específico:
  "Mecatrônica DQ200 aberta na bancada", não "foto 1".
- Se o nome escrito no `site.ts` não existir na pasta, o build para e mostra qual arquivo está faltando.

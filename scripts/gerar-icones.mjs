/**
 * Gera os ícones PNG/ICO a partir do monograma em public/favicon.svg.
 * Rode depois de trocar o favicon.svg pelo logo oficial:
 *
 *   npm run icones
 *
 * Arquivos gerados em public/:
 *   favicon.ico            32×32  (navegadores antigos)
 *   apple-touch-icon.png   180×180 (atalho na tela do iPhone)
 *   logo-512.png           512×512 (logo nos dados estruturados do Google)
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const publico = new URL("../public/", import.meta.url);
const svg = await readFile(new URL("favicon.svg", publico));

async function png(tamanho, { fundo } = {}) {
  let imagem = sharp(svg, { density: 72 * (tamanho / 64) * 2 }).resize(tamanho, tamanho);
  if (fundo) imagem = imagem.flatten({ background: fundo });
  return imagem.png({ compressionLevel: 9 }).toBuffer();
}

/** ICO com um PNG dentro (formato aceito por todos os navegadores atuais). */
function ico(pngBuffer, tamanho) {
  const cabecalho = Buffer.alloc(6);
  cabecalho.writeUInt16LE(0, 0); // reservado
  cabecalho.writeUInt16LE(1, 2); // tipo: ícone
  cabecalho.writeUInt16LE(1, 4); // quantidade de imagens
  const entrada = Buffer.alloc(16);
  entrada.writeUInt8(tamanho % 256, 0);
  entrada.writeUInt8(tamanho % 256, 1);
  entrada.writeUInt8(0, 2); // paleta
  entrada.writeUInt8(0, 3); // reservado
  entrada.writeUInt16LE(1, 4); // planos
  entrada.writeUInt16LE(32, 6); // bits por pixel
  entrada.writeUInt32LE(pngBuffer.length, 8);
  entrada.writeUInt32LE(6 + 16, 12);
  return Buffer.concat([cabecalho, entrada, pngBuffer]);
}

await writeFile(new URL("favicon.ico", publico), ico(await png(32), 32));
// iOS arredonda os cantos sozinho: fundo preto preenchendo o quadrado todo.
await writeFile(new URL("apple-touch-icon.png", publico), await png(180, { fundo: "#000000" }));
await writeFile(new URL("logo-512.png", publico), await png(512));

console.log("Ícones gerados em public/: favicon.ico, apple-touch-icon.png, logo-512.png");

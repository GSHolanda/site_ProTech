/**
 * Fotos, vídeos e logo entregues pelo cliente em assets-cliente/.
 * No site.ts basta escrever o nome do arquivo ("fachada.jpg").
 */
import type { ImageMetadata } from "astro";

const fotos = import.meta.glob<{ default: ImageMetadata }>(
  "/assets-cliente/fotos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true },
);

const videos = import.meta.glob<string>("/assets-cliente/videos/*.{mp4,webm,MP4,WEBM}", {
  eager: true,
  query: "?url",
  import: "default",
});

const logos = import.meta.glob<{ default: ImageMetadata }>("/assets-cliente/logo.svg", { eager: true });

function buscar<T>(mapa: Record<string, T>, arquivo: string, pasta: string): T {
  const chave = Object.keys(mapa).find((caminho) => caminho.split("/").pop() === arquivo);
  if (!chave) {
    throw new Error(
      `Arquivo "${arquivo}" citado em src/data/site.ts não foi encontrado em ${pasta}. ` +
        `Confira o nome (maiúsculas, acentos e extensão).`,
    );
  }
  return mapa[chave]!;
}

/** Imagem otimizável pelo astro:assets a partir do nome do arquivo. */
export function buscarFoto(arquivo: string): ImageMetadata {
  return buscar(fotos, arquivo, "assets-cliente/fotos/").default;
}

/** URL final do vídeo a partir do nome do arquivo. */
export function buscarVideo(arquivo: string): string {
  return buscar(videos, arquivo, "assets-cliente/videos/");
}

/** Logo oficial, se o cliente já tiver entregue assets-cliente/logo.svg. */
export const logoCliente: ImageMetadata | undefined = Object.values(logos)[0]?.default;

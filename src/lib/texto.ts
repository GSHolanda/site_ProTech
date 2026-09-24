/**
 * Utilitários de texto.
 * No site.ts, códigos técnicos vêm entre crases: "DSG `DQ200` (`0AM`)".
 */

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Remove as crases: "DSG `DQ200`" -> "DSG DQ200". Para mensagens, alt e meta tags. */
export function semCrases(texto: string): string {
  return texto.replace(/`/g, "");
}

/** Converte o texto em HTML seguro, com os códigos entre crases em fonte mono. */
export function comCodigos(texto: string): string {
  return texto
    .split("`")
    .map((trecho, i) => (i % 2 === 1 ? `<span class="tech">${escaparHtml(trecho)}</span>` : escaparHtml(trecho)))
    .join("");
}

/** "Troca de óleo" -> "troca de óleo". Mantém siglas como "DSG" ou "UP!". */
export function minusculaInicial(texto: string): string {
  const [primeira = ""] = texto.split(" ");
  if (primeira.length > 1 && primeira === primeira.toUpperCase()) return texto;
  return texto.charAt(0).toLowerCase() + texto.slice(1);
}

/** 4.9 -> "4,9" */
export function formatarNota(nota: number): string {
  return nota.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

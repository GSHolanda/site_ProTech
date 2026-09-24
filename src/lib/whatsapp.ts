import { site } from "../data/site";
import { minusculaInicial, semCrases } from "./texto";

/** Monta o link wa.me com a mensagem já codificada. */
export function linkWhatsApp(mensagem: string = site.mensagens.padrao, numero: string = site.whatsapp.principal): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/** Mensagem citando um serviço: "…gostaria de um orçamento de troca de óleo e filtros." */
export function mensagemServico(servico: string): string {
  return site.mensagens.servico.replace("{servico}", minusculaInicial(semCrases(servico)));
}

/** Link direto do WhatsApp para um serviço. */
export function linkServico(servico: string): string {
  return linkWhatsApp(mensagemServico(servico));
}

/** "5561991533032" -> "(61) 99153-3032" */
export function formatarTelefone(numero: string): string {
  const local = numero.replace(/^55/, "");
  const ddd = local.slice(0, 2);
  const resto = local.slice(2);
  return `(${ddd}) ${resto.slice(0, -4)}-${resto.slice(-4)}`;
}

/** "5561991533032" -> "+55 61 99153-3032" (formato internacional, para o Google) */
export function telefoneInternacional(numero: string): string {
  const local = numero.replace(/^55/, "");
  return `+55 ${local.slice(0, 2)} ${local.slice(2, -4)}-${local.slice(-4)}`;
}

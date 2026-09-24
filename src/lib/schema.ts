/**
 * Dados estruturados (JSON-LD) para o Google.
 * Tudo vem de src/data/site.ts.
 */
import { site, especialidades } from "../data/site";
import type { PerguntaFaq } from "../data/site";
import { semCrases } from "./texto";
import { telefoneInternacional } from "./whatsapp";

const ID_OFICINA = `${site.url}/#oficina`;

export function schemaOficina() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": ID_OFICINA,
    name: site.nomeCompleto,
    alternateName: site.nome,
    slogan: site.slogan,
    description: site.descricao,
    url: site.url,
    logo: `${site.url}/logo-512.png`,
    image: `${site.url}/og-image.png`,
    telephone: telefoneInternacional(site.whatsapp.principal),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.endereco.logradouro} – ${site.endereco.bairro}`,
      addressLocality: site.endereco.cidade,
      addressRegion: site.endereco.uf,
      postalCode: site.endereco.cep,
      addressCountry: "BR",
    },
    // TODO: incluir "geo" (latitude e longitude) quando o endereço for confirmado.
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.horario.dias,
        opens: site.horario.abre,
        closes: site.horario.fecha,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.google.nota,
      reviewCount: site.google.totalAvaliacoes,
      bestRating: 5,
      worstRating: 1,
    },
    areaServed: {
      "@type": "City",
      name: "Brasília",
      containedInPlace: { "@type": "State", name: "Distrito Federal" },
    },
    knowsAbout: [
      "Volkswagen",
      "Audi",
      "Câmbio DSG",
      "Mecatrônica DQ200",
      "Mecatrônica DQ250",
      "Motores TSI",
      "Motores TFSI",
      ...especialidades,
    ],
    sameAs: [site.instagram.url],
  };
}

export function schemaFaq(perguntas: PerguntaFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntas.map((p) => ({
      "@type": "Question",
      name: semCrases(p.pergunta),
      acceptedAnswer: { "@type": "Answer", text: semCrases(p.resposta) },
    })),
  };
}

export function schemaBreadcrumb(itens: { nome: string; caminho: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      item: `${site.url}${item.caminho === "/" ? "" : item.caminho}`,
    })),
  };
}

export function schemaServico(nome: string, descricao: string, caminho: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nome,
    description: descricao,
    url: `${site.url}${caminho}`,
    provider: { "@id": ID_OFICINA },
    areaServed: { "@type": "City", name: "Brasília" },
  };
}

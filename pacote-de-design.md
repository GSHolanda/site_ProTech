# Pacote de design · PRO-TECH (Site 10K, Nível 1)

Documento único com as decisões criativas. A construção consome este arquivo e o texto
embarca ao pé da letra. Faixas e números são pontos de partida, validados pelo teste de flick.

## 1. Premissa da marca

**A peça certa.** Quem chega com um DSG dando tranco já ouviu que precisa trocar o câmbio ou a
mecatrônica inteira. A PRO-TECH desmonta o problema até achar a peça que falhou, mostra para o
cliente e troca só ela. O topo do site encena isso: o câmbio se abre, o scanner passa peça por
peça e só a mecatrônica acende. Cada seção abaixo serve a essa ideia.

## 2. Paleta

Tirada do mundo da oficina e do Instagram (grafite, aço, branco gelo e o azul dos destaques).

```css
:root{
  --canvas:#0b0e13;        /* grafite noturno, nunca preto puro */
  --canvas-2:#0f131a;      /* seções alternadas */
  --panel:#151a23;         /* cartões */
  --line:#262e3a;          /* traço técnico apagado */
  --steel:#8d98aa;         /* traço técnico e texto terciário */
  --text-secondary:#aab4c3;
  --text-primary:#eef2f6;  /* branco gelo */
  --ice:#e9edf2;           /* seção clara, nunca branco puro */
  --accent:#2f55f4;        /* azul PRO-TECH: CTA, foco e a peça certa */
  --accent-hover:#4466ff;
  --accent-bright:#8aa2ff; /* acento como texto sobre o escuro */
  --accent-muted:rgba(47,85,244,.28);
}
```

## 3. Fontes

- **Display:** Archivo expandido (largura 125, pesos 700 e 800). Larga e forte como os destaques
  "VW", "TSI" e "DSG" do Instagram. Na placa, a mesma família em largura 62 (condensada).
- **Texto:** Instrument Sans 400 e 500.
- **Mono:** IBM Plex Mono 500, para códigos (DQ200, 0AM) e rótulos da prancha técnica.

Desvio declarado: as fontes ficam hospedadas no próprio site (licença OFL), enxugadas para os
pesos e larguras em uso, com pré-carregamento. Com o Google Fonts a primeira pintura no celular
levava 3,2 s; hospedadas aqui, 1,1 s.

## 4. Mapa de faixas (hero de 560vh, jornada única)

| Faixa | Intervalo | Momento da animação | Texto (ao pé da letra) | Entrada |
|---|---|---|---|---|
| 1 | 0.00 a 0.20 | Câmbio montado, dentes girando devagar | Selo: "Oficina VW e Audi · Guará, Brasília". Título: "Especialistas em Volkswagen e Audi em Brasília." Apoio: "Câmbio DSG, motores TSI e mecatrônica DQ200 e DQ250." | Alinhamento em grade (letras deslizam para o lugar, como peça encaixando) |
| 2 | 0.24 a 0.46 | As peças se soltam aos trancos | "Tranco." "Luz no painel." "Travou na 2ª." Apoio: "Soa familiar? Quase todo defeito de DSG começa assim." | Soco de palavra com overshoot, no ritmo dos trancos |
| 3 | 0.50 a 0.72 | O scanner desce peça por peça; só a mecatrônica acende em azul | "Antes de trocar o câmbio, a gente procura a peça." Apoio: "Scanner, teste de vazamento e olho treinado, uma peça por vez." | Desfoque para nítido, como o foco do diagnóstico chegando |
| 4 | 0.78 a 1.00 | Prancha técnica em repouso, rótulos traçados, laudo "OK OK OK OK FALHA" | "A peça certa. Só ela." Apoio: "Diagnóstico antes de qualquer troca. Você aprova o orçamento antes de a gente começar." Botões: "Mandar o sintoma no WhatsApp" e "Ver serviços". | Subida palavra por palavra, apoio e botões em etapas |

Rótulos da prancha: 01 Volante bimassa · 02 Embreagem K1 · 03 Embreagem K2 · 04 Eixos e engrenagens · 05 Mecatrônica.

## 5. Hero estático (movimento reduzido, celular deitado, sem JavaScript)

A prancha técnica no estado final, com o laudo, e o texto:
"Especialistas em Volkswagen e Audi em Brasília." · "Câmbio DSG, motores TSI e mecatrônica DQ200
e DQ250. Diagnóstico antes da peça e preço justo." · selo "4,9 no Google · 141 avaliações" ·
botões "Chamar no WhatsApp" e "Ver serviços".

Desvio declarado: como a animação é feita em código e é leve, o celular em pé recebe o scroll
animado (o padrão da skill é imagem parada no celular, pensado para vídeo pesado).

## 6. Abaixo da dobra (tudo afunila para UMA ação: mandar o sintoma no WhatsApp)

1. **01 · Serviços.** "O que a gente resolve." · "Toque no serviço e a mensagem já vai pronta no WhatsApp." Índice técnico em linhas numeradas por sistema.
2. **02 · Câmbio DSG.** "Nem todo tranco significa câmbio novo." Duas fichas (DQ200 e DQ250) e os sintomas nas palavras de quem já passou: "Trepidação ao arrancar", "Tranco em baixa", "Demora para engatar o D ou a ré", "Painel piscando", "Travou numa marcha".
3. **03 · Como a gente trabalha.** "O teste acusou." **Momento interativo:** segurar o botão pressuriza a mecatrônica; o ponteiro sobe, estabiliza e cai: "A pressão caiu. Achamos o vazamento." Completar acende os três passos: "Você manda o sintoma", "A gente testa e mostra", "Você aprova antes".
4. **04 · Avaliações** (seção clara). "Preço justo e honestidade, nas palavras dos clientes." Nota 4,9, termos mais citados como leitura de scanner. Depoimentos só com texto literal autorizado.
5. **Letreiro de modelos** em nível de sussurro.
6. **05 · Dúvidas.** Cinco objeções reais da pesquisa, respondidas.
7. **06 · Sobre.** "Essa é a nova fase da PRO-TECH."
8. **Contato (assinatura).** A placa PROTECH, "Mande o sintoma. A gente acha a peça certa.", formulário que abre o WhatsApp e os dados de contato.
9. **Rodapé.**

Formulário: não há servidor. Ele monta a mensagem e abre o WhatsApp da oficina, e o estado de
sucesso diz isso com clareza, com um link direto caso a aba não abra.

## 7. Camada vetorial

- A prancha do hero, desenhada à mão em SVG: cilindros em perspectiva, dentes que giram, laudo.
- O traço técnico: linhas que se desenham sozinhas no scroll ao lado dos títulos de seção.
- Fundo fixo de ambiente: grade técnica, grão e um brilho azul que deriva em 90 segundos.
- Partículas em nível de sussurro só no hero. Tudo para em movimento reduzido.

## 8. Engenharia

Interpolação normalizada por dt num loop rAF que descansa, escritas de DOM só na mudança, faixas
ritmadas em vh com smoothstep e platôs longos, teste de flick, legibilidade com scrim e sombra,
portões do hero estático vivos (movimento reduzido e celular deitado), página completa sem
JavaScript, movimento reduzido ao vivo nas duas direções, pausa fora da tela e em aba escondida.

## 9. Gate de texto

Zero travessões, zero palavras de estoque, e varredura por sinais de texto de IA antes de mostrar.

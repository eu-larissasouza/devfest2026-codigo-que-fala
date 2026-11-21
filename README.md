# Palestra: Código que fala

Apresentação e demo da palestra "Código que fala: observabilidade na prática, sem jargão e sem depender de ferramenta", no DevFest São Paulo 2026 (GDG Cloud São Paulo), em 28/11/2026, na FIAP Paulista.

## Arquivos

| Arquivo                      | O que é                                                                                                         | Quando mexer                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `index.html`                 | A apresentação, com 40 slides. CSS, JavaScript, fontes e notas do apresentador ficam dentro do próprio arquivo. | Para mudar textos, slides, notas, links e cores. |
| `demo.html`                  | Demo ao vivo: um reembolso com logs e métricas, antes e depois da tag de erro. Dados simulados, sem servidor.   | Para mudar a simulação ou o texto da demo.       |
| `img/foto_perfil.jpg`        | Foto usada no slide 3 ("Quem sou eu").                                                                          | Para trocar a foto.                              |
| `README.md`                  | Este guia.                                                                                                      | Raramente.                                       |

Os elementos de identidade visual usados nos slides ficam em `img/`. Mantenha essa pasta junto com `index.html`.

## Como abrir

1. Dê dois cliques em `index.html`. Ele abre no navegador, sem instalar nada e sem servidor.
2. Para a demo, use o botão "Abrir a demo em outra aba", no slide 30, ou abra `demo.html` diretamente.
3. Mantenha `index.html`, `demo.html` e a pasta `img/` juntos. Sem a pasta `img/`, a foto do slide 3 não aparece.

## Como navegar

| Ação                  | Como                                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Próximo slide         | Setas → e ↓, espaço, PageDown, clique na metade direita da tela, deslizar para a esquerda (celular) ou o botão › |
| Slide anterior        | Setas ← e ↑, PageUp, clique na metade esquerda da tela, deslizar para a direita (celular) ou o botão ‹           |
| Notas do apresentador | Tecla N, que mostra e esconde as notas na parte de baixo da tela                                                 |
| Ir direto a um slide  | Acrescente `#número` ao endereço, por exemplo `index.html#30`                                                    |

Os botões ‹ e › aparecem em telas de até 860 px de largura. A barra no rodapé mostra o progresso, e o contador (por exemplo, `30 / 40`) fica no canto inferior direito. Clicar em um link não troca de slide.

## Mapa dos slides

| Slides  | Bloco                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------- |
| 1 a 6   | Abertura: capa, material, quem sou eu, roteiro, pergunta para a sala e palavras simples                              |
| 7 a 11  | Bloco 1, A história: um cliente sem saldo, a tela certa que não apareceu, a causa e o hotfix. Termina no slide 11     |
| 12 a 18 | Bloco 2, O que logar: log como mensagem, bom x ruim, contexto, id e a distinção entre regra tratada e falha a investigar. Termina no slide 18 |
| 19 a 23 | Bloco 3, O que medir: sintoma x causa, quatro sinais, percentis e métrica por etapa e tipo. Termina no slide 23       |
| 24 a 29 | Bloco 4, Quando alertar: o monitor antigo para HTTP 4xx–5xx, sintoma, ação e SLO. Termina no slide 29                 |
| 30 a 34 | Bloco 5, Demo e desfecho: a demo, os 15 minutos, dicas do livro e postmortem. Termina no slide 34                     |
| 35 a 40 | Para levar: recapitulação, antes e depois, checklist, referências, fechamento e slide final                           |

O slide 2 traz os links para a apresentação, a demo e o repositório; o QR code aponta para o repositório. O slide 30 abre a demo, o slide 38 tem as referências e o slide 40 inclui o perfil do LinkedIn com link e QR code.

## Estado atual

As confirmações de conteúdo foram incorporadas: cargo, confidencialidade do caso, tempos, faixa HTTP 4xx–5xx e referência do livro. Os números e cenários do slide 22 e da demo estão identificados como ilustrativos. O repositório público contém os arquivos do projeto, e o GitHub Pages está publicado.

## Como editar o `index.html`

O arquivo tem cerca de 130 KB, mas a edição é simples. Abra-o num editor de texto e use Ctrl+F para achar o trecho que quer mudar.

- **Texto de um slide.** Cada slide é um bloco `<section class="slide">` até o `</section>` correspondente.
- **Novo slide.** Copie um bloco `<section class="slide">` inteiro e cole na posição desejada. O contador se ajusta sozinho. Depois, acrescente a nota do novo slide na lista de notas, na mesma posição.
- **Notas do apresentador.** Ficam na lista `notesBySlide`, perto do fim do arquivo, com uma entrada por slide, na mesma ordem. Hoje são 40. Se a quantidade não bater com a de slides, as notas ficam deslocadas.
- **Links do material.** Os endereços dos slides, da demo e do repositório ficam no bloco `const LINKS`, perto do fim do arquivo. O QR code aponta para o repositório.
- **Cores.** Estão no início do `<style>`, em `:root`. `--bg` é o fundo (Noite), `--text` é o texto (Creme), `--lime` é o destaque (Amarelo), `--red` é o Rosa e `--violet` é o Roxo.
- **Fontes.** Plus Jakarta Sans para textos e títulos, e Fira Code para código. As duas estão embutidas no arquivo, então funcionam sem internet. Não apague os dois blocos `@font-face`.
- **Id `slide-demo`.** Não renomeie. A demo usa esse id para voltar ao slide certo.

## Demo (`demo.html`)

A demo simula um reembolso em quatro etapas: `receber_pedido`, `validar_saldo`, `solicitar_reembolso` e `montar_tela`. Cerca de 30% dos pedidos caem em saldo insuficiente, uma regra de negócio tratada. Cerca de 4% caem em erro fora dessa regra, na etapa `solicitar_reembolso`. Os dados são fictícios e gerados ao abrir a página, então cada recarga mostra números diferentes.

| Botão ou campo                  | O que faz                                                                                                                                                                               |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Modo 1 · antes                  | Logs genéricos ("Erro ao processar reembolso"). Nesta simulação, cada falha vira alerta, inclusive a regra de saldo já tratada.                                                         |
| Modo 2 · depois                 | Logs com `level`, `error_type`, `step` e `business_rule_handled`. Só a regra de negócio tratada não alerta; falhas fora dela, inclusive as desconhecidas, alertam para investigação. |
| Filtro de `request_id` (modo 2) | Mostra só os logs de um pedido. A caixa sugere os ids com falha.                                                                                                                        |
| + Gerar mais tráfego            | Adiciona 40 pedidos.                                                                                                                                                                    |
| ↺ Resetar                       | Limpa o filtro, volta ao modo 1 e gera uma nova rodada de 120 pedidos.                                                                                                                  |

Roteiro sugerido no palco: modo 1, mostrando que tudo alerta. Depois modo 2, mostrando que a regra de negócio tratada não alerta, enquanto falhas fora dela — como o erro desconhecido simulado — acionam investigação. Em seguida, filtrar um `request_id` com falha fora da regra e, por fim, usar o botão "voltar aos slides".

## Material publicado

- Slides: [abrir apresentação](https://eu-larissasouza.github.io/devfest2026-codigo-que-fala/)
- Demo: [abrir demo](https://eu-larissasouza.github.io/devfest2026-codigo-que-fala/demo.html)
- Código-fonte: [repositório no GitHub](https://github.com/eu-larissasouza/devfest2026-codigo-que-fala)

O slide 2 contém links diretos para os slides e para a demo. O QR code abre o repositório.

## Requisitos e observações

- Qualquer navegador atual: Chrome, Edge, Firefox ou Safari.
- Sem internet, a apresentação, as notas e a demo funcionam normalmente. Os QR codes dos slides 2 e 40 dependem da internet; os links também aparecem escritos.
- No celular e no tablet, o conteúdo dos slides curtos fica centralizado verticalmente; slides longos continuam roláveis.

## Antes da palestra

- [ ] Testar no notebook conectado ao projetor, com e sem internet.
- [ ] Testar a demo na mesma aba e em outra aba.
- [ ] Ler as notas (tecla N) e cronometrar a apresentação.
- [ ] Conferir no celular os links publicados e o QR code.

## Solução de problemas

- **A página abre sem cores ou sem fontes.** O `index.html` pode ter sido copiado incompleto. O arquivo deve ter cerca de 130 KB.
- **A foto do slide 3 não aparece.** Confirme que a pasta `img/` está ao lado do `index.html`.
- **O botão "Abrir a demo" não funciona.** Confirme que `demo.html` está na mesma pasta do `index.html`.
- **A demo não volta ao slide certo.** Não renomeie o id `slide-demo` e mantenha os dois arquivos juntos.

# Palestra: Código que fala

Apresentação e demo da palestra "Código que fala: observabilidade na prática, sem jargão e sem depender de ferramenta", no DevFest São Paulo 2026 (GDG Cloud São Paulo), em 28/11/2026, na FIAP Paulista.

## Arquivos

| Arquivo                      | O que é                                                                                                         | Quando mexer                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `index.html`                 | A apresentação, com 40 slides. CSS, JavaScript, fontes e notas do apresentador ficam dentro do próprio arquivo. | Para mudar textos, slides, notas, links e cores. |
| `demo.html`                  | Demo ao vivo: um reembolso com logs e métricas, antes e depois da tag de erro. Dados simulados, sem servidor.   | Para mudar a simulação ou o texto da demo.       |
| `img/foto_perfil.jpg`        | Foto usada no slide 2 ("Quem sou eu").                                                                          | Para trocar a foto.                              |
| `README.md`                  | Este guia.                                                                                                      | Raramente.                                       |

Os elementos de identidade visual usados nos slides ficam em `img/`. Mantenha essa pasta junto com `index.html`.

## Como abrir

1. Dê dois cliques em `index.html`. Ele abre no navegador, sem instalar nada e sem servidor.
2. Para a demo, use o botão "Abrir a demo em outra aba", no slide 29, ou abra `demo.html` diretamente.
3. Mantenha `index.html`, `demo.html` e a pasta `img/` juntos. Sem a pasta `img/`, a foto do slide 2 não aparece.

## Como navegar

| Ação                  | Como                                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Próximo slide         | Setas → e ↓, espaço, PageDown, clique na metade direita da tela, deslizar para a esquerda (celular) ou o botão › |
| Slide anterior        | Setas ← e ↑, PageUp, clique na metade esquerda da tela, deslizar para a direita (celular) ou o botão ‹           |
| Notas do apresentador | Tecla N, que mostra e esconde as notas na parte de baixo da tela                                                 |
| Ir direto a um slide  | Acrescente `#número` ao endereço, por exemplo `index.html#29`                                                    |

Os botões ‹ e › aparecem em telas de até 860 px de largura. A barra no rodapé mostra o progresso, e o contador (por exemplo, `29 / 40`) fica no canto inferior direito. Clicar em um link não troca de slide.

## Mapa dos slides

| Slides  | Bloco                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------- |
| 1 a 5   | Abertura: capa, quem sou eu, roteiro, pergunta para a sala e palavras simples                                         |
| 6 a 10  | Bloco 1, A história: um cliente sem saldo, a tela certa que não apareceu, a causa e o hotfix. Termina no slide 10     |
| 11 a 17 | Bloco 2, O que logar: log como mensagem, bom x ruim, contexto, id e a distinção entre regra tratada e falha a investigar. Termina no slide 17 |
| 18 a 22 | Bloco 3, O que medir: sintoma x causa, quatro sinais, percentis e métrica por etapa e tipo. Termina no slide 22       |
| 23 a 28 | Bloco 4, Quando alertar: o monitor antigo para HTTP 4xx–5xx, sintoma, ação e SLO. Termina no slide 28                 |
| 29 a 33 | Bloco 5, Demo e desfecho: a demo, os 15 minutos, dicas do livro e postmortem. Termina no slide 33                     |
| 34 a 40 | Para levar: recapitulação, antes e depois, checklist, referências, material, fechamento e slide final                 |

O slide 29 abre a demo. O slide 37 tem as referências. O slide 38 traz o QR code e o link do repositório.

## Estado atual

As confirmações de conteúdo foram incorporadas: cargo, confidencialidade do caso, tempos, faixa HTTP 4xx–5xx e referência do livro. Os números e cenários do slide 21 e da demo estão identificados como ilustrativos. O repositório público existe, mas atualmente contém apenas `LICENSE` na raiz. Publique `index.html`, `demo.html` e `img/` antes de divulgar o QR code. O GitHub Pages também retorna 404; habilite-o se quiser oferecer links hospedados.

## Como editar o `index.html`

O arquivo tem cerca de 130 KB, mas a edição é simples. Abra-o num editor de texto e use Ctrl+F para achar o trecho que quer mudar.

- **Texto de um slide.** Cada slide é um bloco `<section class="slide">` até o `</section>` correspondente.
- **Novo slide.** Copie um bloco `<section class="slide">` inteiro e cole na posição desejada. O contador se ajusta sozinho. Depois, acrescente a nota do novo slide na lista de notas, na mesma posição.
- **Notas do apresentador.** Ficam na lista `notesBySlide`, perto do fim do arquivo, com uma entrada por slide, na mesma ordem. Hoje são 40. Se a quantidade não bater com a de slides, as notas ficam deslocadas.
- **Link do material.** O slide 38 e o QR code apontam para o repositório, configurado no bloco `const LINKS`, perto do fim do arquivo.
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

## Publicar no GitHub Pages

1. Use o repositório público existente: https://github.com/eu-larissasouza/devfest2026-codigo-que-fala.
2. Envie para a raiz do repositório o `index.html`, o `demo.html` e a pasta `img/`.
3. Em Settings, depois Pages, escolha "Deploy from a branch", branch `main` e pasta `/ (root)`.
4. Aguarde alguns minutos e confira `https://eu-larissasouza.github.io/devfest2026-codigo-que-fala/`. No momento, esse endereço retorna 404 porque o GitHub Pages ainda não está publicado.

O slide 38 e o QR code apontam para o repositório até que o GitHub Pages esteja ativo.

## Requisitos e observações

- Qualquer navegador atual: Chrome, Edge, Firefox ou Safari.
- Sem internet, a apresentação, as notas e a demo funcionam normalmente. Só o QR code do slide 38 depende da internet. Se a rede do evento for instável, deixe o link escrito no slide ou troque o QR por uma imagem gerada antes.
- No celular, os slides ficam empilhados e podem rolar por dentro quando não cabem na tela.

## Antes da palestra

- [ ] Testar no notebook conectado ao projetor, com e sem internet.
- [ ] Testar a demo na mesma aba e em outra aba.
- [ ] Ler as notas (tecla N) e cronometrar a apresentação.
- [ ] Publicar `index.html`, `demo.html` e `img/` na raiz do repositório.
- [ ] Opcional: habilitar o GitHub Pages para oferecer links hospedados dos slides e da demo.

## Solução de problemas

- **A página abre sem cores ou sem fontes.** O `index.html` pode ter sido copiado incompleto. O arquivo deve ter cerca de 130 KB.
- **A foto do slide 2 não aparece.** Confirme que a pasta `img/` está ao lado do `index.html`.
- **O botão "Abrir a demo" não funciona.** Confirme que `demo.html` está na mesma pasta do `index.html`.
- **A demo não volta ao slide certo.** Não renomeie o id `slide-demo` e mantenha os dois arquivos juntos.

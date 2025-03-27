# BrAVIdex - O Card Game das Aves Brasileiras

Um jogo de cartas estilo Super Trunfo sobre aves brasileiras.

## Sobre o Jogo

BrAVIdex é um jogo de cartas que utiliza um baralho de aves brasileiras. Cada carta representa uma ave e contém informações como força, ameaça, peso, nível trófico e ano de descoberta.

### Como jogar:

1. O jogador clica em "Comprar Cartas" para obter 3 cartas
2. O jogador seleciona uma carta clicando nela
3. Ao clicar no botão "Selecionar Carta", apenas essa carta fica centralizada na tela
4. O jogador pode comparar a carta selecionada com a do adversário (fora do aplicativo)
5. Após a comparação, o jogador clica em "Nova Rodada" para iniciar novamente o processo

## Funcionalidades

- Baralho com diversas aves brasileiras
- Interface intuitiva de seleção de cartas
- Visualização centralizada da carta selecionada
- Sistema fácil de compra de cartas
- Redimensionamento automático de imagens para o tamanho ideal do card
- Fácil de expandir com novas cartas

## Como Executar Localmente

### Opção 1: Executar diretamente (sem servidor)
1. Faça o download ou clone este repositório
2. Abra o arquivo `iniciar-jogo.html` no seu navegador
3. Clique no botão "Iniciar Jogo"

### Opção 2: Executar com servidor local
1. Clone o repositório
2. Instale as dependências com `npm install`
3. Execute o servidor local com `npm start`
4. Acesse `http://localhost:5000` no navegador

## Como adicionar novas cartas

Para adicionar novas cartas ao jogo, siga estes passos:

1. Adicione a imagem da ave na pasta `public/images/` (o sistema redimensionará automaticamente para 220x150 pixels)
2. Edite o arquivo `js/data.js` e adicione um novo objeto com as informações da ave ao array `avesBrasileiras`:

```javascript
{
    "nome": "Nome da Ave",
    "cientifico": "Nome científico",
    "imagem": "nome-do-arquivo.jpg",
    "forca": 5, // valor de 1 a 10
    "ameaca": 3, // valor de 1 a 10
    "peso": 150, // em gramas
    "trofico": 2, // nível trófico de 1 a 5
    "ano": 1800 // ano de descoberta científica
}
```

## Tecnologias Utilizadas

- HTML5, CSS3, JavaScript
- Canvas API para redimensionamento de imagens

## Notas

- As imagens são redimensionadas automaticamente para 220x150 pixels, portanto você pode usar imagens de qualquer tamanho
- Para utilizar o BrAVIdex como um PWA completo com funcionalidade offline, é necessário utilizar a Opção 2 (com servidor local)
- A Opção 1 (execução direta) permite jogar o jogo sem necessidade de instalação de dependências ou servidor, mas não terá as funcionalidades de PWA 
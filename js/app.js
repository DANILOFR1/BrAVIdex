// Variáveis globais do jogo
let selectedCard = null;
let currentDeck = [...window.avesBrasileiras];
let currentHand = [];
let isCardOnlyView = false;

// Elementos do DOM
const cardHand = document.getElementById('card-hand');
const selectedCardArea = document.getElementById('selected-card');
const drawCardsBtn = document.getElementById('draw-cards');
const selectCardBtn = document.getElementById('next-turn');
const newRoundBtn = document.getElementById('new-round');
const playerTurnIndicator = document.getElementById('player-turn');
const gameContainer = document.querySelector('.game-container');

// Tamanho ideal para as imagens dos cards
const CARD_IMAGE_WIDTH = 220;
const CARD_IMAGE_HEIGHT = 260;

// Funções de navegação entre as cartas
const nextCardBtn = document.getElementById('next-card');
const prevCardBtn = document.getElementById('prev-card');

// Funções do jogo
function embaralharCartas(array) {
    // Algoritmo de Fisher-Yates para embaralhar
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function comprarCartas(quantidade) {
    // Se o baralho estiver vazio, recarregue-o
    if (currentDeck.length < quantidade) {
        currentDeck = [...window.avesBrasileiras];
        embaralharCartas(currentDeck);
    }
    
    // Comprar as cartas do topo do baralho
    const novasCartas = currentDeck.splice(0, quantidade);
    return novasCartas;
}

// Função para redimensionar imagem ao tamanho ideal do card
// Esta função foi desativada para evitar problemas com as imagens
function redimensionarImagem(imageSrc) {
    // Simplificando a função, retornando diretamente o caminho da imagem
    return Promise.resolve(imageSrc);
}

// Função para detectar se estamos em um dispositivo móvel
function isMobileDevice() {
    return (window.innerWidth <= 768);
}

// Função para criar uma imagem de fallback quando necessário
function criarImagemFallback(nomeAve = '') {
    const canvas = document.createElement('canvas');
    
    // Ajustar tamanho para mobile se necessário
    const isMobile = isMobileDevice();
    const width = isMobile ? (window.innerWidth <= 480 ? 260 : 190) : CARD_IMAGE_WIDTH;
    const height = isMobile ? (window.innerWidth <= 480 ? 250 : 230) : CARD_IMAGE_HEIGHT;
    
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    
    // Escolher uma cor de fundo baseada na primeira letra do nome
    const cores = ['#e57373', '#81c784', '#64b5f6', '#ffd54f', '#9575cd', '#4db6ac', '#ff8a65'];
    let corIndex = 0;
    
    if (nomeAve && nomeAve.length > 0) {
        // Usar a primeira letra para determinar a cor
        const primeiraLetra = nomeAve.charAt(0).toLowerCase();
        corIndex = primeiraLetra.charCodeAt(0) % cores.length;
    }
    
    // Desenhar o fundo
    ctx.fillStyle = cores[corIndex];
    ctx.fillRect(0, 0, width, height);
    
    // Adicionar um padrão
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const tamanho = 20 + Math.random() * 30;
        ctx.beginPath();
        ctx.arc(x, y, tamanho, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Desenhar o nome da ave
    if (nomeAve) {
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 4;
        ctx.font = isMobile ? 'bold 18px Arial' : 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Limitar o tamanho do texto
        let textoExibir = nomeAve;
        if (textoExibir.length > 15) {
            textoExibir = textoExibir.substring(0, 12) + '...';
        }
        
        ctx.fillText(textoExibir, width / 2, height / 2);
    } else {
        // Texto genérico se não houver nome de ave
        ctx.fillStyle = '#555';
        ctx.font = isMobile ? '14px Arial' : '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Imagem não disponível', width / 2, height / 2);
    }
    
    return canvas.toDataURL('image/jpeg', 0.9);
}

async function criarElementoCard(carta) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.cardId = carta.nome;
    
    // Tentar diferentes caminhos para a imagem
    const possiveisCaminhos = [
        `public/images/${carta.imagem}`,
        `./public/images/${carta.imagem}`,
        `../public/images/${carta.imagem}`,
        `/public/images/${carta.imagem}`,
        `images/${carta.imagem}`,
        `./images/${carta.imagem}`
    ];
    
    console.log(`Tentando carregar imagem para: ${carta.nome} (${carta.imagem})`);
    
    // Encontrar o caminho correto da imagem
    let imagemCarregada = null;
    
    // Tentar cada caminho possível
    for (const path of possiveisCaminhos) {
        try {
            console.log(`Tentando caminho: ${path}`);
            
            // Criar uma Image para tentar carregar e verificar se funciona
            const testImg = new Image();
            const imgLoaded = await new Promise((resolve) => {
                testImg.onload = () => resolve(testImg);
                testImg.onerror = () => resolve(null);
                testImg.src = path;
            });
            
            if (imgLoaded) {
                console.log(`Imagem carregada com sucesso de: ${path}`);
                imagemCarregada = testImg;
                break;
            } else {
                console.log(`Falha ao carregar de: ${path}`);
            }
        } catch (error) {
            console.error(`Erro ao tentar caminho ${path}:`, error);
        }
    }
    
    // Se nenhum caminho funcionou, usar imagem de fallback
    if (!imagemCarregada) {
        console.warn(`Não foi possível carregar a imagem para: ${carta.nome}`);
        const imagemFallback = criarImagemFallback(carta.nome);
        imagemCarregada = new Image();
        imagemCarregada.src = imagemFallback;
    }
    
    // Criar o HTML da carta
    cardElement.innerHTML = `
        <div class="card-image-container">
            <img src="${imagemCarregada.src}" alt="${carta.nome}" class="card-image">
        </div>
        <div class="card-content">
            <div>
                <div class="card-name">${carta.nome}</div>
                <div class="card-scientific">${carta.cientifico || carta.nome_cientifico || ''}</div>
                <div class="card-stats">
                    <div class="stat-item">
                        <div class="stat-label">Força Emblemática</div>
                        <div class="stat-value">${carta.forca || carta.forca_emblematica || 'undefined'}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Ameaça</div>
                        <div class="stat-value">${carta.ameaca || 'undefined'}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Peso</div>
                        <div class="stat-value">${carta.peso || 'undefined'}g</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Poder Trófico</div>
                        <div class="stat-value">${carta.trofico || carta.poder_trofico || 'undefined'}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Ano da publicação</div>
                        <div class="stat-value">${carta.ano || carta.ano_publicacao || 'undefined'}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Agilidade</div>
                        <div class="stat-value">${carta.agilidade || carta.velocidade || '0'}</div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <h1>BrAVIdex</h1>
            </div>
        </div>
    `;
    
    // Adicionar evento de clique para selecionar carta (se não estiver no modo de visualização única)
    if (!isCardOnlyView) {
        cardElement.addEventListener('click', () => {
            selecionarCarta(carta, cardElement);
        });
    }
    
    return cardElement;
}

async function renderizarMao(cartas) {
    // Limpar mão atual
    cardHand.innerHTML = '';
    
    // Mostrar indicador de carregamento
    cardHand.innerHTML = '<div class="loading">Carregando cartas...</div>';
    
    try {
        // Array para armazenar promessas de criação de cards
        const cardPromises = [];
        
        // Criar elementos de card para cada carta
        for (const carta of cartas) {
            cardPromises.push(criarElementoCard(carta));
        }
        
        // Esperar que todos os cards sejam criados
        const cardElements = await Promise.allSettled(cardPromises);
        
        // Limpar o indicador de carregamento
        cardHand.innerHTML = '';
        
        // Adicionar os cards bem-sucedidos à mão
        cardElements.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                cardHand.appendChild(result.value);
            } else {
                console.error('Erro ao criar carta:', result.reason);
                
                // Adicionar um card de fallback com imagem gerada
                const carta = cartas[index];
                const errorCard = document.createElement('div');
                errorCard.className = 'card';
                
                // Gerar uma imagem com o nome da ave
                const imagemFallback = criarImagemFallback(carta.nome);
                
                errorCard.innerHTML = `
                    <div class="card-image-container">
                        <img src="${imagemFallback}" alt="${carta.nome}" class="card-image">
                    </div>
                    <div class="card-content">
                        <div>
                            <div class="card-name">${carta.nome}</div>
                            <div class="card-scientific">${carta.cientifico || carta.nome_cientifico || ''}</div>
                            <div class="card-stats">
                                <div class="stat-item">
                                    <div class="stat-label">Força Emblemática</div>
                                    <div class="stat-value">${carta.forca || carta.forca_emblematica || 'undefined'}</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-label">Ameaça</div>
                                    <div class="stat-value">${carta.ameaca || 'undefined'}</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-label">Peso</div>
                                    <div class="stat-value">${carta.peso || 'undefined'}g</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-label">Poder Trófico</div>
                                    <div class="stat-value">${carta.trofico || carta.poder_trofico || 'undefined'}</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-label">Ano da publicação</div>
                                    <div class="stat-value">${carta.ano || carta.ano_publicacao || 'undefined'}</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-label">Agilidade</div>
                                    <div class="stat-value">${carta.agilidade || carta.velocidade || '0'}</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <h1>BrAVIdex</h1>
                        </div>
                    </div>
                `;
                
                // Adicionar evento de clique
                errorCard.addEventListener('click', () => {
                    selecionarCarta(carta, errorCard);
                });
                
                cardHand.appendChild(errorCard);
            }
        });
    } catch (error) {
        console.error('Erro ao renderizar mão:', error);
        cardHand.innerHTML = '<div class="error-message">Erro ao carregar cartas. Por favor, tente novamente.</div>';
        
        // Reabilitar o botão de comprar para tentar novamente
        drawCardsBtn.disabled = false;
    }
}

function selecionarCarta(carta, cardElement) {
    // Deselecionar qualquer carta anterior
    const previousSelected = document.querySelector('.card.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    
    // Selecionar a carta atual
    cardElement.classList.add('selected');
    selectedCard = carta;
    
    // Habilitar o botão de selecionar carta
    selectCardBtn.disabled = false;
    
    // Garantir que a carta esteja visível
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function mostrarCartaSelecionada() {
    // Exibir a carta selecionada na área de carta selecionada
    if (selectedCard) {
        selectedCardArea.innerHTML = '<div class="loading">Carregando carta...</div>';
        
        try {
            // Usar a mesma função criarElementoCard para garantir consistência
            const cardElement = await criarElementoCard(selectedCard);
            
            selectedCardArea.innerHTML = '';
            cardElement.classList.add('selected');
            selectedCardArea.appendChild(cardElement);
            
            // Desabilitar eventos de clique na carta mostrada
            cardElement.style.cursor = 'default';
            cardElement.onclick = null;
        } catch (error) {
            console.error('Erro ao mostrar carta selecionada:', error);
            selectedCardArea.innerHTML = '';
            
            // Criar um card de erro como fallback
            const errorCard = document.createElement('div');
            errorCard.className = 'card selected';
            
            // Gerar uma imagem com o nome da ave
            const imagemFallback = criarImagemFallback(selectedCard.nome);
            
            errorCard.innerHTML = `
                <div class="card-image-container">
                    <img src="${imagemFallback}" alt="${selectedCard.nome}" class="card-image">
                </div>
                <div class="card-content">
                    <div>
                        <div class="card-name">${selectedCard.nome}</div>
                        <div class="card-scientific">${selectedCard.cientifico || selectedCard.nome_cientifico || ''}</div>
                        <div class="card-stats">
                            <div class="stat-item">
                                <div class="stat-label">Força Emblemática</div>
                                <div class="stat-value">${selectedCard.forca || selectedCard.forca_emblematica || 'undefined'}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">Ameaça</div>
                                <div class="stat-value">${selectedCard.ameaca || 'undefined'}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">Peso</div>
                                <div class="stat-value">${selectedCard.peso || 'undefined'}g</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">Poder Trófico</div>
                                <div class="stat-value">${selectedCard.trofico || selectedCard.poder_trofico || 'undefined'}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">Ano da publicação</div>
                                <div class="stat-value">${selectedCard.ano || selectedCard.ano_publicacao || 'undefined'}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">Agilidade</div>
                                <div class="stat-value">${selectedCard.agilidade || selectedCard.velocidade || '0'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <h1>BrAVIdex</h1>
                    </div>
                </div>
            `;
            selectedCardArea.appendChild(errorCard);
        }
    }
}

function ativarVisualizacaoUnica() {
    // Esconder a mão e mostrar apenas a carta selecionada
    gameContainer.classList.add('card-only-view');
    
    // Atualizar o indicador
    playerTurnIndicator.textContent = 'Sua carta selecionada';
    
    // Esconder botões de comprar e selecionar
    drawCardsBtn.style.display = 'none';
    selectCardBtn.style.display = 'none';
    
    // Mostrar botão de nova rodada
    newRoundBtn.style.display = 'inline-block';
}

function iniciarNovaRodada() {
    // Limpar área de carta selecionada
    selectedCardArea.innerHTML = '';
    selectedCard = null;
    
    // Limpar área de cartas
    cardHand.innerHTML = '';
    currentHand = [];
    
    // Resetar interface
    drawCardsBtn.disabled = false;
    selectCardBtn.disabled = true;  // Garantir que o botão de selecionar comece desabilitado
    newRoundBtn.style.display = 'none';
    playerTurnIndicator.textContent = 'Compre e selecione uma carta';
    
    // Resetar modo de visualização
    isCardOnlyView = false;
    
    // Restaurar visibilidade dos botões
    drawCardsBtn.style.display = 'inline-block';
    selectCardBtn.style.display = 'inline-block';
    
    // Remover a classe de visualização única para mostrar a interface completa
    gameContainer.classList.remove('card-only-view');
    
    // Reembaralhar o deck se necessário
    if (currentDeck.length < 10) {
        currentDeck = [...avesBrasileiras];
        embaralharCartas(currentDeck);
    }
}

// Eventos
drawCardsBtn.addEventListener('click', async () => {
    // Comprar 3 cartas
    currentHand = comprarCartas(3);
    
    // Renderizar a mão
    await renderizarMao(currentHand);
    
    // Desabilitar o botão de comprar
    drawCardsBtn.disabled = true;
    
    // Atualizar o texto do indicador para orientar o jogador a selecionar uma carta
    playerTurnIndicator.textContent = 'Selecione uma carta';
    
    // Manter o botão de selecionar desabilitado até que uma carta seja escolhida
    selectCardBtn.disabled = true;
});

selectCardBtn.addEventListener('click', async () => {
    // Mostrar a carta selecionada
    await mostrarCartaSelecionada();
    
    // Ativar o modo de visualização única
    ativarVisualizacaoUnica();
    
    // Marcar que estamos em modo de visualização única
    isCardOnlyView = true;
});

newRoundBtn.addEventListener('click', () => {
    // Iniciar nova rodada
    iniciarNovaRodada();
});

// Inicializar o jogo
function inicializarJogo() {
    // Embaralhar o baralho
    embaralharCartas(currentDeck);
    
    // Inicializar texto
    playerTurnIndicator.textContent = 'Compre e selecione uma carta';
    
    // Desabilitar o botão de selecionar carta inicialmente
    selectCardBtn.disabled = true;
    
    // Esconder o botão de nova rodada inicialmente
    newRoundBtn.style.display = 'none';
}

// Iniciar o jogo quando a página carregar
window.addEventListener('DOMContentLoaded', inicializarJogo);

// Adicionar evento de redimensionamento da janela
window.addEventListener('resize', function() {
    // Se estiver no modo de visualização de carta única, reajustar a carta selecionada
    if (isCardOnlyView && selectedCard) {
        mostrarCartaSelecionada();
    }
    
    // Se tiver cartas na mão, reajustar a exibição
    if (currentHand.length > 0) {
        renderizarMao(currentHand);
    }
});

// Adicionar event listeners para os botões de navegação
nextCardBtn.addEventListener('click', scrollToNextCard);
prevCardBtn.addEventListener('click', scrollToPrevCard);

// Função para rolar para a próxima carta
function scrollToNextCard() {
    const handContainer = document.getElementById('card-hand');
    // Ajuste o scrollAmount com base no tamanho da tela
    let scrollAmount = 240; // Desktop (largura de card + gap)
    
    if (window.innerWidth <= 480) {
        scrollAmount = 280; // Mobile
    } else if (window.innerWidth <= 768) {
        scrollAmount = 210; // Tablet
    }
    
    handContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// Função para rolar para a carta anterior
function scrollToPrevCard() {
    const handContainer = document.getElementById('card-hand');
    // Ajuste o scrollAmount com base no tamanho da tela
    let scrollAmount = 240; // Desktop (largura de card + gap)
    
    if (window.innerWidth <= 480) {
        scrollAmount = 280; // Mobile
    } else if (window.innerWidth <= 768) {
        scrollAmount = 210; // Tablet
    }
    
    handContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
}

// Função para copiar PIX para área de transferência
function copyToClipboard() {
    const pixKey = document.getElementById('pix-key');
    const range = document.createRange();
    range.selectNode(pixKey);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    
    const copyButton = document.querySelector('.copy-button');
    copyButton.textContent = 'Copiado!';
    setTimeout(() => {
        copyButton.textContent = 'Copiar';
    }, 2000);
} 
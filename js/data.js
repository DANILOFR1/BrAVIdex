// Informações das cartas do jogo

const avesBrasileiras = [
    {
        "nome": "Atobá Marrom",
        "cientifico": "Sula leucogaster",
        "imagem": "sulaleucogaster.jpg",
        "forca": 3,
        "ameaca": 2,
        "peso": 1300,
        "trofico": 1,
        "ano": 1783,
        "agilidade": 4
    },
    {
        "nome": "tauató-miúdo",
        "cientifico": "Accipiter striatus",
        "imagem": "tauatomiudo.jpg",
        "forca": 2,
        "ameaca": 2,
        "peso": 150,
        "trofico": 3,
        "ano": 1808,
        "agilidade": 9
    },
    {
        "nome": "Tico-tico-rei-cinza",
        "cientifico": "Coryphospingus pileatus",
        "imagem": "Coryphospinguspileatus.jpg",
        "forca": 3,
        "ameaca": 1,
        "peso": 15,
        "trofico": 2,
        "ano": 1847,
        "agilidade": 5
    },
    {
        "nome": "Corruíra",
        "cientifico": "Troglodytes musculus",
        "imagem": "corruira.jpg",
        "forca": 3,
        "ameaca": 1,
        "peso": 11,
        "trofico": 2,
        "ano": 1823,
        "agilidade": 6
    },
    {
        "nome": "Suindara",
        "cientifico": "Tyto furcata",
        "imagem": "suindara.jpg",
        "forca": 6,
        "ameaca": 2,
        "peso": 340,
        "trofico": 5,
        "ano": 1827,
        "agilidade": 4
    },
    {
        "nome": "Bem-te-vi",
        "cientifico": "Pitangus sulphuratus",
        "imagem": "bem-te-vi.jpg",
        "forca": 4,
        "ameaca": 8,
        "peso": 75,
        "trofico": 3,
        "ano": 1766,
        "agilidade": 7
    },
    {
        "nome": "Saí-Azul",
        "cientifico": "Dacnis cayana",
        "imagem": "saiazul.jpg",
        "forca": 3,
        "ameaca": 1,
        "peso": 16,
        "trofico": 2,
        "ano": 1766,
        "agilidade": 3
    },
    {
        "nome": "Harpia",
        "cientifico": "Harpia harpyja",
        "imagem": "harpia.jpg",
        "forca": 10,
        "ameaca": 2,
        "peso": 9000,
        "trofico": 4,
        "ano": 1758,
        "agilidade": 9
    },
    {
        "nome": "Arara-azul-grande",
        "cientifico": "Anodorhynchus hyacinthinus",
        "imagem": "arara-azul.jpg",
        "forca": 7,
        "ameaca": 1,
        "peso": 1300,
        "trofico": 2,
        "ano": 1790,
        "agilidade": 6
    },
    {
        "nome": "Coruja-buraqueira",
        "cientifico": "Athene cunicularia",
        "imagem": "coruja.jpg",
        "forca": 5,
        "ameaca": 6,
        "peso": 170,
        "trofico": 4,
        "ano": 1782,
        "agilidade": 7
    },
    {
        "nome": "João-de-barro",
        "cientifico": "Furnarius rufus",
        "imagem": "joao-de-barro.jpg",
        "forca": 3,
        "ameaca": 9,
        "peso": 55,
        "trofico": 2,
        "ano": 1821,
        "agilidade": 5
    },
    {
        "nome": "Pica-pau-de-banda-branca",
        "cientifico": "Dryocopus lineatus",
        "imagem": "pica-pau.jpg",
        "forca": 4,
        "ameaca": 7,
        "peso": 190,
        "trofico": 3,
        "ano": 1766,
        "agilidade": 8
    }
];

// Exporta o objeto globalmente
window.avesBrasileiras = avesBrasileiras;

/* 
EXEMPLO: Como adicionar uma nova carta

Para adicionar uma nova carta ao jogo, copie e cole o modelo abaixo e preencha as informações:

{
    "nome": "Nome da Ave",            // Nome popular da ave
    "cientifico": "Nome Científico",  // Nome científico (em itálico)
    "imagem": "nome-do-arquivo.jpg",  // Nome do arquivo de imagem na pasta public/images
    "forca": 5,                       // Força emblemática (valor numérico, maior é melhor)
    "ameaca": 3,                      // Nível de ameaça (valor numérico, maior é melhor)
    "peso": 120,                      // Peso em gramas (valor numérico, maior é melhor)
    "trofico": 2,                     // Poder trófico (valor numérico, maior é melhor)
    "ano": 1800,                      // Ano da publicação/descoberta (maior é melhor)
    "agilidade": 7                    // Agilidade (valor numérico, maior é melhor)
}

Depois de criar a carta, adicione-a ao array avesBrasileiras acima.
Não se esqueça de colocar uma vírgula após o objeto anterior!
*/ 
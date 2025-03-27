// Este arquivo deve ser usado em um ambiente Node.js com canvas instalado
// Instale as dependências: npm install canvas fs

const { createCanvas } = require('canvas');
const fs = require('fs');

function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Cores
    const green = '#4CAF50';
    const darkGreen = '#388E3C';
    const yellow = '#FFC107';
    
    // Fundo
    ctx.fillStyle = green;
    ctx.fillRect(0, 0, size, size);
    
    // Círculo de fundo
    ctx.fillStyle = darkGreen;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Silhueta de pássaro
    ctx.fillStyle = '#FFFFFF';
    
    // Corpo principal do pássaro
    ctx.beginPath();
    ctx.ellipse(size * 0.5, size * 0.5, size * 0.25, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cabeça do pássaro
    ctx.beginPath();
    ctx.arc(size * 0.65, size * 0.4, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
    
    // Bico
    ctx.fillStyle = yellow;
    ctx.beginPath();
    ctx.moveTo(size * 0.75, size * 0.38);
    ctx.lineTo(size * 0.85, size * 0.4);
    ctx.lineTo(size * 0.75, size * 0.42);
    ctx.fill();
    
    // Asa
    ctx.fillStyle = darkGreen;
    ctx.beginPath();
    ctx.ellipse(size * 0.5, size * 0.52, size * 0.18, size * 0.1, Math.PI * 0.15, 0, Math.PI);
    ctx.fill();
    
    // Olho
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(size * 0.68, size * 0.37, size * 0.03, 0, Math.PI * 2);
    ctx.fill();
    
    // Texto "BR"
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${size * 0.15}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText("BR", size * 0.5, size * 0.7);
    
    // Texto "AVIdex"
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${size * 0.12}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText("AVIdex", size * 0.5, size * 0.82);
    
    return canvas.toBuffer('image/png');
}

// Criar os ícones nos tamanhos necessários
const sizes = [192, 512];

sizes.forEach(size => {
    const iconData = createIcon(size);
    const filePath = `public/images/icon-${size}x${size}.png`;
    
    fs.writeFileSync(filePath, iconData);
    console.log(`Ícone ${size}x${size} criado com sucesso: ${filePath}`);
});

// Criar também um ícone padrão "icon.png"
const iconData = createIcon(512);
fs.writeFileSync('public/images/icon.png', iconData);
console.log('Ícone principal criado com sucesso: public/images/icon.png'); 
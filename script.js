// --- SISTEMA DE CITAÇÕES (REFLEXÃO DO MOMENTO) ---
const quotes = [
    { text: "A felicidade de sua vida depende da qualidade de seus pensamentos.", author: "Marco Aurélio" },
    { text: "Não é que temos pouco tempo, é que perdemos muito dele.", author: "Sêneca" },
    { text: "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.", author: "Epicteto" },
    { text: "O homem que move montanhas começa carregando pedras pequenas.", author: "Provérbio Chinês" },
    { text: "A vida é muito curta para ser pequena.", author: "Benjamin Disraeli" },
    { text: "A sabedoria começa na reflexão.", author: "Sócrates" },
    { text: "O que não nos mata, torna-nos mais fortes.", author: "Friedrich Nietzsche" },
    { text: "Onde quer que o seu pensamento esteja, lá estará a sua vida.", author: "Desconhecido" },
    { text: "Viver é a coisa mais rara do mundo. A maioria das pessoas apenas existe.", author: "Oscar Wilde" },
    { text: "A paz vem de dentro. Não a procure à sua volta.", author: "Buda" },
    { text: "Aquele que conquista a si mesmo é o guerreiro mais poderoso.", author: "Confúcio" },
    { text: "O destino conduz quem quer e arrasta quem não quer.", author: "Cleantes de Assos" },
    { text: "Não procure que os eventos aconteçam como deseja, mas deseje que aconteçam como acontecem.", author: "Epicteto" },
    { text: "A melhor vingança é não ser como o seu inimigo.", author: "Marco Aurélio" },
    { text: "Onde há amor pela humanidade, há amor pela arte da cura e da sabedoria.", author: "Hipócrates" },
    { text: "Coragem não é a ausência de medo, mas o julgamento de que algo é mais importante que o medo.", author: "Ambrose Redmoon" },
    { text: "Somos o que fazemos repetidamente. A excelência, portanto, não é um ato, mas um hábito.", author: "Aristóteles" },
    { text: "O segredo da mudança é focar toda a sua energia não em lutar contra o velho, mas em construir o novo.", author: "Sócrates" },
    { text: "Nada é tão terrível para quem não teme a morte.", author: "Sêneca" },
    { text: "Se queres ser amado, ama.", author: "Hecatão de Rodes" }
];

const quoteBox = document.getElementById("quote-box");
const newQuoteBtn = document.getElementById("new-quote-btn");
const shareQuoteBtn = document.getElementById("share-quote-btn");
const quoteSound = document.getElementById("quote-sound"); // Seleciona o áudio

let currentQuote = {}; 

function getNewQuote() {
    if (!quoteBox) return;

    // 1. DISPARO DO SOM
    if (quoteSound) {
        quoteSound.volume = 0.4; // Volume em 40% para ser agradável
        quoteSound.currentTime = 0; // Reinicia para permitir cliques rápidos
        quoteSound.play().catch(e => console.log("Som aguardando interação do usuário."));
    }

    // 2. ANIMAÇÃO DE SAÍDA E LIMPEZA DO BRILHO
    quoteBox.style.opacity = 0;
    quoteBox.classList.remove("glow-effect");
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        currentQuote = quotes[randomIndex]; 
        
        quoteBox.innerHTML = `
            ${currentQuote.text}
            <br>
            <small style="font-size: 0.9rem; color: #888; font-style: normal; display: block; margin-top: 15px; font-family: 'Montserrat', sans-serif;">
                — ${currentQuote.author}
            </small>
        `;
        
        // 3. ANIMAÇÃO DE ENTRADA E DISPARO DO BRILHO
        quoteBox.style.opacity = 1;
        quoteBox.classList.add("glow-effect");
        
        // Remove a classe após a animação (0.6s) para que possa ser disparada de novo
        setTimeout(() => {
            quoteBox.classList.remove("glow-effect");
        }, 600);

    }, 300);
}

// Lógica de Partilha
if (shareQuoteBtn) {
    shareQuoteBtn.addEventListener("click", () => {
        const textToShare = `"${currentQuote.text}" — ${currentQuote.author}\n\nVeja mais reflexões em: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Sabedoria Simples',
                text: textToShare,
                url: window.location.href
            }).catch((error) => console.log('Erro ao partilhar', error));
        } else {
            const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
            window.open(waUrl, '_blank');
        }
    });
}

if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", getNewQuote);
    getNewQuote(); 
}

// --- CONTROLE DO MENU MOBILE ---
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuToggle.innerHTML = menu.classList.contains("open") ? "✕" : "☰";
    });
}

const navLinks = document.querySelectorAll("#menu a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (menu && menu.classList.contains("open")) {
            menu.classList.remove("open");
            if (menuToggle) menuToggle.innerHTML = "☰";
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const grid = document.querySelector(".portal-grid");
    
    // Busca os dados do arquivo JSON
    fetch('artigos.json')
        .then(response => response.json())
        .then(artigos => {
            // Limpa a grid antes de inserir (opcional)
            grid.innerHTML = "";

            artigos.forEach(artigo => {
                // Cria a estrutura do card estilo Mistérios do Mundo
                const card = `
                    <a href="${artigo.link}" class="portal-card">
                        <img src="${artigo.imagem}" class="portal-thumbnail" alt="${artigo.titulo}">
                        <div class="portal-content">
                            <span class="portal-tag">${artigo.tag}</span>
                            <h3 class="portal-title">${artigo.titulo}</h3>
                            <p class="portal-excerpt">${artigo.resumo}</p>
                            <span style="font-size:0.7rem; color:#bbb;">${artigo.data}</span>
                        </div>
                    </a>
                `;
                grid.innerHTML += card;
            });
        })
        .catch(error => console.error('Erro ao carregar artigos:', error));
});

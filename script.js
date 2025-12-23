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

let currentQuote = {}; // Variável para guardar a frase que está no ecrã

function getNewQuote() {
    if (!quoteBox) return;

    quoteBox.style.opacity = 0;
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        currentQuote = quotes[randomIndex]; // Guarda a frase atual
        
        quoteBox.innerHTML = `
            ${currentQuote.text}
            <br>
            <small style="font-size: 0.9rem; color: #888; font-style: normal; display: block; margin-top: 15px; font-family: 'Montserrat', sans-serif;">
                — ${currentQuote.author}
            </small>
        `;
        
        quoteBox.style.opacity = 1;
    }, 300);
}

// Lógica de Partilha
if (shareQuoteBtn) {
    shareQuoteBtn.addEventListener("click", () => {
        const textToShare = `"${currentQuote.text}" — ${currentQuote.author}\n\nVeja mais reflexões em: ${window.location.href}`;
        
        if (navigator.share) {
            // Partilha Nativa (Telemóveis)
            navigator.share({
                title: 'Sabedoria Simples',
                text: textToShare,
                url: window.location.href
            }).then(() => console.log('Partilhado com sucesso'))
              .catch((error) => console.log('Erro ao partilhar', error));
        } else {
            // Partilha via WhatsApp (Computadores/Fallback)
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

// Frases Estoicas
const quotes = [
    "A felicidade da sua vida depende da qualidade dos seus pensamentos. — Marco Aurélio",
    "Dificuldades fortalecem a mente, assim como o trabalho fortalece o corpo. — Sêneca",
    "Quem teme a dor, sofre antes de sofrer. — Sêneca",
    "Você tem poder sobre sua mente, não sobre os acontecimentos. — Marco Aurélio",
    "Primeiro diga a si o que você seria; depois, faça o que precisa fazer. — Epicteto"
];

const quoteBox = document.getElementById("quote-box");
const newQuoteBtn = document.getElementById("new-quote-btn");

if (quoteBox && newQuoteBtn) {
    function newQuote() {
        const index = Math.floor(Math.random() * quotes.length);
        quoteBox.textContent = quotes[index];
    }

    newQuote();
    newQuoteBtn.addEventListener("click", newQuote);
}

// Menu Mobile
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
}

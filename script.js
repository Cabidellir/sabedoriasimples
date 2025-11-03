// Script Motivacional + Menu Mobile

// ======= FRASES =======
const quotes = [
    "A felicidade da sua vida depende da qualidade dos seus pensamentos. — Marco Aurélio",
    "Dificuldades fortalecem a mente, assim como o trabalho fortalece o corpo. — Sêneca",
    "Quem teme a dor, sofre antes de sofrer. — Sêneca",
    "Não reclame das circunstâncias: você é mais forte do que elas. — Epicteto",
    "A maior vitória está em conquistar a si mesmo. — Platão",
    "A verdadeira liberdade é ser senhor de si próprio. — Sêneca",
    "Você tem poder sobre sua mente, não sobre os acontecimentos. — Marco Aurélio",
    "Primeiro diga a si o que você seria; depois, faça o que precisa fazer. — Epicteto"
];

// Só executa as frases se existir a caixa de frases na página
const quoteBox = document.getElementById("quote-box");
const newQuoteBtn = document.getElementById("new-quote-btn");

function newQuote() {
    if (!quoteBox) return;
    const index = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = quotes[index];
}

if (quoteBox) {
    newQuote();
    newQuoteBtn.addEventListener("click", newQuote);
}


// ======= MENU MOBILE =======
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
}

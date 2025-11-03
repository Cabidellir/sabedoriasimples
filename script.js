// Frases
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

// Troca de frase
const quoteBox = document.getElementById("quote-box");
const newQuoteBtn = document.getElementById("new-quote-btn");

function newQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = quotes[index];
}

if (quoteBox) newQuote();
if (newQuoteBtn) newQuoteBtn.addEventListener("click", newQuote);

// ✅ Header com efeito ao rolar
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
});

// ✅ Menu Mobile em todas as páginas
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector("nav ul");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
}

// ✅ Título clicável → página inicial
const title = document.querySelector("header h1");
if (title) {
    title.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

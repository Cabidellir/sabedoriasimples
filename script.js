// Script Motivacional - Filosofia Estoica (M1)

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

const quoteBox = document.getElementById("quote-box");
const newQuoteBtn = document.getElementById("new-quote-btn");

function newQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = quotes[index];
}

// Ao carregar a página, já mostra uma frase
newQuote();

// Ao clicar no botão, troca a frase
newQuoteBtn.addEventListener("click", newQuote);

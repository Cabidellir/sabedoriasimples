/**
 * Sabedoria Simples - Script Principal Otimizado
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DAS FRASES (REFLEXÕES) ---
    const quotes = [
        "A felicidade da sua vida depende da qualidade dos seus pensamentos. — Marco Aurélio",
        "Dificuldades fortalecem a mente, assim como o trabalho fortalece o corpo. — Sêneca",
        "Quem teme a dor, sofre antes de sofrer. — Sêneca",
        "Você tem poder sobre sua mente, não sobre os acontecimentos. — Marco Aurélio",
        "Primeiro diga a si o que você seria; depois, faça o que precisa fazer. — Epicteto",
        "A sorte é o que acontece quando a preparação encontra a oportunidade. — Sêneca",
        "Não espere que os eventos aconteçam como você deseja. Deseje que eles aconteçam como acontecem. — Epicteto",
        "A vida é muito curta para ser pequena. — Benjamin Disraeli",
        "Onde quer que haja um ser humano, há uma oportunidade para a bondade. — Sêneca"
    ];

    // Cores suaves para o fundo da seção de frases (Dinamismo Visual)
    const softColors = ['#fdfdfd', '#fcf9f2', '#f2f7f1', '#f1f4f7', '#f9f6f1'];

    const quoteBox = document.getElementById("quote-box");
    const newQuoteBtn = document.getElementById("new-quote-btn");
    const quotesSection = document.getElementById("quotes-section");

    if (quoteBox && newQuoteBtn) {
        function newQuote() {
            // Efeito de fade out
            quoteBox.style.opacity = 0;
            
            setTimeout(() => {
                // Sorteia nova frase
                const quoteIndex = Math.floor(Math.random() * quotes.length);
                quoteBox.textContent = quotes[quoteIndex];

                // Sorteia nova cor de fundo sutil (se a seção existir)
                if (quotesSection) {
                    const colorIndex = Math.floor(Math.random() * softColors.length);
                    quotesSection.style.backgroundColor = softColors[colorIndex];
                }

                // Fade in
                quoteBox.style.opacity = 1;
            }, 300);
        }

        // Configuração de transição suave
        quoteBox.style.transition = "opacity 0.4s ease";
        if (quotesSection) quotesSection.style.transition = "background-color 0.8s ease";
        
        newQuote();
        newQuoteBtn.addEventListener("click", newQuote);
    }

    // --- MENU MOBILE ---
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (menu.classList.contains("open") && !menu.contains(e.target) && e.target !== menuToggle) {
                menu.classList.remove("open");
            }
        });
    }

    // --- EFEITOS DINÂMICOS DE SCROLL ---
    const header = document.querySelector('header');
    
    // Throttle simples para performance no scroll
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (window.scrollY > 50) {
                header.style.boxShadow = "0 2px 15px rgba(0,0,0,0.08)";
                header.style.padding = "15px 20px"; // Header encolhe um pouco ao rolar
            } else {
                header.style.boxShadow = "none";
                header.style.padding = "30px 20px"; // Volta ao tamanho normal
            }
        }, 50);
    });

});

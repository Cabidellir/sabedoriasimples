/**
 * Sabedoria Simples - Script Principal
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
        "Não espere que os eventos aconteçam como você deseja. Deseje que eles aconteçam como acontecem. — Epicteto"
    ];

    const quoteBox = document.getElementById("quote-box");
    const newQuoteBtn = document.getElementById("new-quote-btn");

    if (quoteBox && newQuoteBtn) {
        function newQuote() {
            // Adiciona um efeito de fade out suave
            quoteBox.style.opacity = 0;
            
            setTimeout(() => {
                const index = Math.floor(Math.random() * quotes.length);
                quoteBox.textContent = quotes[index];
                // Fade in
                quoteBox.style.opacity = 1;
            }, 300);
        }

        // Configuração inicial de transição via JS para garantir que funcione
        quoteBox.style.transition = "opacity 0.4s ease";
        
        // Carrega a primeira frase
        newQuote();
        
        newQuoteBtn.addEventListener("click", newQuote);
    }

    // --- MENU MOBILE ---
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que o clique feche o menu imediatamente
            menu.classList.toggle("open");
        });

        // Fecha o menu se clicar em qualquer lugar fora dele (Melhoria de UX)
        document.addEventListener("click", (e) => {
            if (menu.classList.contains("open") && !menu.contains(e.target) && e.target !== menuToggle) {
                menu.classList.remove("open");
            }
        });
    }

    // --- MELHORIA DE ACESSIBILIDADE ---
    // Faz o header sumir ou mudar de cor ao rolar a página (opcional)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        } else {
            header.style.boxShadow = "none";
        }
    });

});

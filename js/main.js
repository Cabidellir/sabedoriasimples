document.addEventListener("DOMContentLoaded", function() {
    // Injetar o Header
    const headerElement = document.querySelector("header");
    if (headerElement) {
        fetch('/header.html')
            .then(response => response.text())
            .then(data => {
                headerElement.innerHTML = data;
                highlightActiveMenu(); // Função para marcar onde o usuário está
            });
    }
});

// Função para deixar o link do menu "ativo" automaticamente
function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll("#menu ul li a");
    
    menuLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage || 
           (currentPage === "/" && link.getAttribute("href") === "/index.html")) {
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    
    // Injetar o HEADER
    const headerElement = document.querySelector("header");
    if (headerElement) {
        fetch('/header.html')
            .then(response => response.text())
            .then(data => {
                headerElement.innerHTML = data;
                highlightActiveMenu();
            });
    }

    // Injetar o FOOTER (Novo)
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        fetch('/footer.html')
            .then(response => response.text())
            .then(data => {
                footerElement.innerHTML = data;
            });
    }
});

function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll("#menu ul li a");
    
    menuLinks.forEach(link => {
        // Verifica se o link corresponde à página atual
        if (currentPage.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Descobre o caminho base do projeto (ajuste para o nome da sua pasta no GitHub)
    const repoName = '/sabedoriasimples';
    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    const base = isLocal ? "" : repoName;

    // Injetar o HEADER
    const headerElement = document.querySelector("header");
    if (headerElement) {
        fetch(`${base}/header.html`)
            .then(response => {
                if (!response.ok) throw new Error('Header não encontrado');
                return response.text();
            })
            .then(data => {
                headerElement.innerHTML = data;
                highlightActiveMenu();
            })
            .catch(err => console.error(err));
    }

    // Injetar o FOOTER
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        fetch(`${base}/footer.html`)
            .then(response => {
                if (!response.ok) throw new Error('Footer não encontrado');
                return response.text();
            })
            .then(data => {
                footerElement.innerHTML = data;
            })
            .catch(err => console.error(err));
    }
});

function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll("#menu ul li a");
    
    menuLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPage.endsWith(href) || (currentPage.endsWith('/') && href === "index.html")) {
            link.classList.add("active");
        }
    });
}

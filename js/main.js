document.addEventListener("DOMContentLoaded", function() {
    
    // Função para carregar componentes de forma dinâmica
    function loadComponent(selector, file) {
        const element = document.querySelector(selector);
        if (!element) return;

        // Tenta carregar o arquivo da raiz relativa
        fetch('/' + file)
            .then(response => {
                if (!response.ok) {
                    // Se falhar (Netlify às vezes exige caminho sem a barra), tenta caminho relativo
                    return fetch(file);
                }
                return response;
            })
            .then(response => {
                if (!response.ok) {
                    // Se ainda falhar, tenta subir um nível (para páginas dentro de /posts/)
                    return fetch('../' + file);
                }
                return response;
            })
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
                if (selector === 'header') highlightActiveMenu();
            })
            .catch(err => console.warn("Aviso: Não foi possível carregar " + file + ". Verifique se o arquivo existe na raiz."));
    }

    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
});

function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll("#menu ul li a");
    
    menuLinks.forEach(link => {
        const href = link.getAttribute("href");
        // Remove caminhos relativos para comparar apenas o nome do arquivo
        if (currentPage.includes(href.replace('../', '')) && href !== "index.html") {
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    
    // Função para carregar componentes de forma inteligente
    function loadComponent(selector, file) {
        const element = document.querySelector(selector);
        if (!element) return;

        // Tenta carregar o arquivo. Se falhar, tenta um caminho alternativo.
        // Isso resolve o problema de estar na Home ou dentro de /posts/
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    // Se não achou (404), tenta subir um nível (caso esteja em /posts/)
                    return fetch('../' + file);
                }
                return response;
            })
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
                if (selector === 'header') highlightActiveMenu();
            })
            .catch(err => console.error("Erro ao carregar " + file, err));
    }

    // Chama o carregamento sem a barra inicial "/"
    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
});

function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll("#menu ul li a");
    
    menuLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPage.includes(href) && href !== "index.html") {
            link.classList.add("active");
        }
    });
}

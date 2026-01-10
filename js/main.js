document.addEventListener("DOMContentLoaded", function() {
    
    // Função para carregar componentes de forma dinâmica
    function loadComponent(selector, file) {
        const element = document.querySelector(selector);
        if (!element) return;

        // Tenta carregar o arquivo da raiz relativa
        fetch('/' + file)
            .then(response => {
                if (!response.ok) return fetch(file);
                return response;
            })
            .then(response => {
                if (!response.ok) return fetch('../' + file);
                return response;
            })
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;

                // --- INÍCIO DA CORREÇÃO DE LINKS PARA SUBPASTAS ---
                const links = element.querySelectorAll('a');
                const isInSubfolder = window.location.pathname.includes('/posts/');

                links.forEach(link => {
                    let href = link.getAttribute('href');
                    
                    // Se estiver em /posts/, ajusta links que não são externos e não estão subindo nível
                    if (isInSubfolder && href && !href.startsWith('http') && !href.startsWith('../') && !href.startsWith('#')) {
                        link.setAttribute('href', '../' + href);
                    }
                });
                // --- FIM DA CORREÇÃO ---

                if (selector === 'header') highlightActiveMenu();
            })
            .catch(err => console.warn("Aviso: Erro ao carregar " + file));
    }

    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
});

function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll("#menu ul li a");
    
    menuLinks.forEach(link => {
        const href = link.getAttribute("href");
        // Remove o prefixo de subida de nível para a comparação de classe ativa
        const cleanHref = href.replace('../', '');
        if (currentPage.includes(cleanHref) && cleanHref !== "index.html") {
            link.classList.add("active");
        }
    });
}

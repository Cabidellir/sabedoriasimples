document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Carregamento de Componentes (Header/Footer)
    function loadComponent(selector, file) {
        const element = document.querySelector(selector);
        if (!element) return;

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

                // Correção de links para subpastas
                const links = element.querySelectorAll('a');
                const isInSubfolder = window.location.pathname.includes('/posts/');

                links.forEach(link => {
                    let href = link.getAttribute('href');
                    if (isInSubfolder && href && !href.startsWith('http') && !href.startsWith('../') && !href.startsWith('#')) {
                        link.setAttribute('href', '../' + href);
                    }
                });

                if (selector === 'header') highlightActiveMenu();
            })
            .catch(err => console.warn("Erro ao carregar componente: " + file));
    }

    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');

    // 2. Renderização Dinâmica dos 15 Artigos
    const gridArtigos = document.getElementById('grid-artigos');
    if (gridArtigos) {
        // Busca o JSON (ajusta o caminho se estiver dentro de /posts/ ou na raiz)
        const jsonPath = window.location.pathname.includes('/posts/') ? '../js/artigos.json' : 'js/artigos.json';
        
        fetch(jsonPath)
            .then(res => res.json())
            .then(artigos => {
                console.log("Total de artigos carregados:", artigos.length); // Validação no console
                renderizarCards(artigos, gridArtigos);
            })
            .catch(err => console.error("Erro ao carregar artigos.json", err));
    }
});

// Função Auxiliar para Criar os Cards HTML
function renderizarCards(artigos, container) {
    container.innerHTML = ""; // Limpa o container
    artigos.forEach(artigo => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.innerHTML = `
            <div class="post-card-image">
                <img src="${artigo.imagem}" alt="${artigo.titulo}">
            </div>
            <div class="post-card-content">
                <span class="post-tag">${artigo.tag}</span>
                <h3>${artigo.titulo}</h3>
                <p>${artigo.resumo}</p>
                <a href="${artigo.link}" class="read-more">Ler Artigo</a>
            </div>
        `;
        container.appendChild(card);
    });
}

function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll("#menu ul li a");
    
    menuLinks.forEach(link => {
        const href = link.getAttribute("href");
        const cleanHref = href.replace('../', '');
        if (currentPage.includes(cleanHref) && cleanHref !== "index.html") {
            link.classList.add("active");
        }
    });
}

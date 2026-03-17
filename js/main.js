document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Carregamento de Componentes (Header/Footer/Share)
    function loadComponent(selector, file) {
        const element = document.querySelector(selector);
        if (!element) return;

        // Tenta carregar da raiz, se falhar tenta subir um nível (para posts)
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

                // Correção de links para subpastas (apenas para header/footer)
                const links = element.querySelectorAll('a');
                const isInSubfolder = window.location.pathname.includes('/posts/');

                links.forEach(link => {
                    let href = link.getAttribute('href');
                    if (isInSubfolder && href && !href.startsWith('http') && !href.startsWith('../') && !href.startsWith('#')) {
                        link.setAttribute('href', '../' + href);
                    }
                });

                // Se for o header, destaca o menu
                if (selector === 'header') highlightActiveMenu();
                
                // SE FOR O SHARE, configura os links após carregar o HTML
                if (selector === 'share-component') configurarCompartilhamento();
            })
            .catch(err => console.warn("Erro ao carregar componente: " + file));
    }

    // Carrega os 3 componentes da raiz
    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
    loadComponent('share-component', 'share.html'); // Novo componente na raiz

    // 2. Renderização Dinâmica dos Artigos
    const gridArtigos = document.getElementById('grid-artigos');
    if (gridArtigos) {
        const jsonPath = window.location.pathname.includes('/posts/') ? '../js/artigos.json' : 'js/artigos.json';
        
        fetch(jsonPath)
            .then(res => res.json())
            .then(artigos => {
                renderizarCards(artigos, gridArtigos);
            })
            .catch(err => console.error("Erro ao carregar artigos.json", err));
    }
});

// --- FUNÇÕES AUXILIARES ---

function configurarCompartilhamento() {
    // Agora o seletor busca dentro do componente recém-carregado
    const shareContainer = document.querySelector('.share-buttons');
    if (!shareContainer) return;

    const urlBase = window.location.href;
    const titulo = document.title;

    const btnWhats = shareContainer.querySelector('.whatsapp');
    const btnTwitter = shareContainer.querySelector('.twitter');
    const btnLinkedin = shareContainer.querySelector('.linkedin');

    if (btnWhats) btnWhats.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(titulo + " - " + urlBase)}`;
    if (btnTwitter) btnTwitter.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(urlBase)}`;
    if (btnLinkedin) btnLinkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlBase)}`;
}

function renderizarCards(artigos, container) {
    container.innerHTML = ""; 
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
        if(href) {
            const cleanHref = href.replace('../', '');
            if (currentPage.includes(cleanHref) && cleanHref !== "index.html") {
                link.classList.add("active");
            }
        }
    });
}

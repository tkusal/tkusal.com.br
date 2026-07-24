document.addEventListener('DOMContentLoaded', () => {

    const menu = document.querySelector("#menu");
    const nav = document.querySelector(".links");
    const navLinks = document.querySelectorAll(".links li a");

    if (menu && nav) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('bx-x');
            nav.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('bx-x');
                nav.classList.remove('active');
            });
        });
    }

    const professionElement = document.getElementById('profissao');
    if (professionElement) {
        const professions = [
            "Infraestrutura",
            "Sys Admin",
            "Arquitetura Cloud",
            "DevOps/SRE",
            "Automação",
            "Aspirante a Microsoft MVP",
            "Dev entusiasta"
        ];

        let currentProfessionIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const erasingSpeed = 50;
        const newProfessionDelay = 1000;

        function typeProfession() {
            const currentProfession = professions[currentProfessionIndex];
            if (!isDeleting) {
                professionElement.textContent = currentProfession.slice(0, currentCharIndex++);
                if (currentCharIndex > currentProfession.length) {
                    isDeleting = true;
                    setTimeout(typeProfession, newProfessionDelay);
                } else {
                    setTimeout(typeProfession, typingSpeed);
                }
            } else {
                professionElement.textContent = currentProfession.slice(0, currentCharIndex--);
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
                    setTimeout(typeProfession, typingSpeed);
                } else {
                    setTimeout(typeProfession, erasingSpeed);
                }
            }
        }
        typeProfession();
    }

    try {
        tsParticles.load("tsparticles", {
            background: { color: { value: "transparent" } },
            particles: {
                color: { value: ["#34ffc9", "#1a8cff"] },
                links: { color: "#3cbce6", distance: 150, enable: true, opacity: 0.3, width: 1 },
                move: { enable: true, speed: 1 },
                number: { value: 60 },
                size: { value: 3 }
            },
            interactivity: {
                events: { onHover: { enable: true, mode: "repulse" } },
                modes: { repulse: { distance: 100, duration: 0.4 } }
            }
        });
    } catch (error) {
        console.error("Erro ao carregar o fundo de partículas:", error);
    }

    fetchRSS();
});

async function fetchRSS() {
    const carousel = document.getElementById('rss-carousel');
    if(!carousel) return;

    const rssUrl = 'https://rookieops.dev/rss.xml';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Falha na rede');

        const data = await response.json();

        if (data.status === 'ok' && data.items.length > 0) {
            carousel.innerHTML = '';
            const posts = data.items.slice(0, 6);

            posts.forEach(post => {
                const pubDate = new Date(post.pubDate);
                const formattedDate = pubDate.toLocaleDateString('pt-BR');

                const card = document.createElement('div');
                card.className = 'post-card';
                card.innerHTML = `
                    <div>
                        <div class="post-date">${formattedDate}</div>
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-desc">${post.description ? post.description.substring(0, 120) + '...' : 'Leia o artigo completo no blog.'}</p>
                    </div>
                    <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="post-link">Ler artigo <i class='bx bx-right-arrow-alt'></i></a>
                `;
                carousel.appendChild(card);
            });
        } else {
            throw new Error('Sem artigos');
        }
    } catch (error) {
        // Exibe um layout limpo de "Em Construção" caso o blog ainda não exista.
        carousel.innerHTML = `
            <div class="post-card" style="min-width: 100%; text-align: center; border-style: dashed; border-color: rgba(255,255,255,0.2);">
                <div>
                    <h3 class="post-title" style="color: var(--primary-color); font-size: 1.8em;"><i class='bx bx-code-alt'></i> Blog em Construção</h3>
                    <p class="post-desc" style="font-size: 1.1em;">A infraestrutura do RookieOps está sendo configurada.<br>Em breve, muito conteúdo sobre Cloud, Kubernetes, Terraform e DevOps!</p>
                </div>
            </div>
        `;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector("#menu");
    const nav = document.querySelector(".links");
    const professionElement = document.getElementById('profissao');

    menu.addEventListener('click', () => {
        menu.classList.toggle('bx-x');
        nav.classList.toggle('active');
    });

    const professions = [
        "Infraestrutura",
        "Sys Admin",
        "Arquitetura Cloud",
        "Futuro DevOps/SRE",
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
});

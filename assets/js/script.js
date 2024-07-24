document.addEventListener('DOMContentLoaded', () => {
    const professions = [
        "Infraestrutura",
        "Sys Admin",
        "Arquitetura Cloud",
        "DevOps em treinamento",
        "Dev por hobby"
    ];

    let currentProfessionIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const professionElement = document.getElementById('profissao');
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newProfessionDelay = 1000; // Tempo de espera entre profissões

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

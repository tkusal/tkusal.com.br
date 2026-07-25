document.addEventListener("DOMContentLoaded", () => {
    const isPortuguese = document.documentElement.lang.toLowerCase().startsWith("pt");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const assetPrefix = isPortuguese ? "assets" : "../assets";
    const copy = isPortuguese
        ? {
            professions: [
                "Sys Admin",
                "Infraestrutura, Segurança e Cloud",
                "Microsoft 365, Azure e AWS",
                "Automação, IaC e Containerização",
                "Aspirante a Microsoft MVP",
                "Dev por Diversão"
            ],
            openMenu: "Abrir menu",
            closeMenu: "Fechar menu"
        }
        : {
            professions: [
                "System Admin",
                "Infrastructure, Security & Cloud",
                "Microsoft 365, Azure & AWS",
                "Automation, IaC & Containerization",
                "Aspiring Microsoft MVP",
                "Dev for Fun"
            ],
            openMenu: "Open menu",
            closeMenu: "Close menu"
        };

    const menu = document.getElementById("menu");
    const menuIcon = menu?.querySelector("img");
    const nav = document.querySelector(".links");
    const navLinks = document.querySelectorAll(".links a");

    const closeMenu = () => {
        if (!menu || !nav || !menuIcon) return;
        nav.classList.remove("active");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", copy.openMenu);
        menuIcon.src = `${assetPrefix}/vendor/boxicons/bx-menu-alt-right.svg`;
    };

    if (menu && nav && menuIcon) {
        menu.addEventListener("click", () => {
            const willOpen = !nav.classList.contains("active");
            nav.classList.toggle("active", willOpen);
            menu.setAttribute("aria-expanded", String(willOpen));
            menu.setAttribute("aria-label", willOpen ? copy.closeMenu : copy.openMenu);
            menuIcon.src = willOpen
                ? `${assetPrefix}/vendor/boxicons/bx-x.svg`
                : `${assetPrefix}/vendor/boxicons/bx-menu-alt-right.svg`;
        });

        navLinks.forEach((link) => link.addEventListener("click", closeMenu));
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });
    }

    const profilePicture = document.querySelector(".profile-picture");
    const supportsPrecisePointer = window.matchMedia("(pointer: fine)").matches;

    if (profilePicture && supportsPrecisePointer && !reducedMotion) {
        let spotlightFrame;
        let spotlightResetTimer;

        const updateSpotlight = (event) => {
            const bounds = profilePicture.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width) * 100;
            const y = ((event.clientY - bounds.top) / bounds.height) * 100;

            window.cancelAnimationFrame(spotlightFrame);
            spotlightFrame = window.requestAnimationFrame(() => {
                profilePicture.style.setProperty("--spot-x", `${x}%`);
                profilePicture.style.setProperty("--spot-y", `${y}%`);
            });
        };

        profilePicture.addEventListener("pointerenter", (event) => {
            window.clearTimeout(spotlightResetTimer);
            profilePicture.classList.add("spotlight-active");
            updateSpotlight(event);
        });

        profilePicture.addEventListener("pointermove", updateSpotlight, { passive: true });

        profilePicture.addEventListener("pointerleave", () => {
            profilePicture.classList.remove("spotlight-active");
            spotlightResetTimer = window.setTimeout(() => {
                profilePicture.style.setProperty("--spot-x", "50%");
                profilePicture.style.setProperty("--spot-y", "42%");
            }, 260);
        });
    }

    const professionElement = document.getElementById("profissao");
    if (professionElement) {
        professionElement.textContent = copy.professions[0];

        if (!reducedMotion) {
            let professionIndex = 0;
            let characterIndex = copy.professions[0].length;
            let deleting = true;
            const typingSpeed = 75;
            const erasingSpeed = 38;
            const pause = 1500;

            const typeProfession = () => {
                const profession = copy.professions[professionIndex];

                if (deleting) {
                    characterIndex -= 1;
                    professionElement.textContent = profession.slice(0, Math.max(characterIndex, 0));

                    if (characterIndex <= 0) {
                        deleting = false;
                        professionIndex = (professionIndex + 1) % copy.professions.length;
                        window.setTimeout(typeProfession, 250);
                        return;
                    }

                    window.setTimeout(typeProfession, erasingSpeed);
                    return;
                }

                characterIndex += 1;
                const nextProfession = copy.professions[professionIndex];
                professionElement.textContent = nextProfession.slice(0, characterIndex);

                if (characterIndex >= nextProfession.length) {
                    deleting = true;
                    window.setTimeout(typeProfession, pause);
                    return;
                }

                window.setTimeout(typeProfession, typingSpeed);
            };

            window.setTimeout(typeProfession, pause);
        }
    }

    if (!reducedMotion && window.tsParticles) {
        const particleCount = window.innerWidth < 768 ? 24 : 48;

        window.tsParticles.load("tsparticles", {
            background: { color: { value: "transparent" } },
            particles: {
                color: { value: ["#34ffc9", "#1a8cff"] },
                links: {
                    color: "#3cbce6",
                    distance: 150,
                    enable: true,
                    opacity: 0.24,
                    width: 1
                },
                move: { enable: true, speed: 0.75 },
                number: { value: particleCount },
                opacity: { value: 0.7 },
                size: { value: 2.5 }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" }
                },
                modes: {
                    repulse: { distance: 90, duration: 0.4 }
                }
            }
        }).catch((error) => {
            console.warn("Particle background could not be initialized.", error);
        });
    }

    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        const updateBackToTop = () => {
            backToTop.classList.toggle("show", window.scrollY > 320);
        };

        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();
    }

    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }
});

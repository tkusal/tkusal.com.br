document.addEventListener("DOMContentLoaded", () => {
    const isPortuguese = document.documentElement.lang.toLowerCase().startsWith("pt");
    const assetPrefix = isPortuguese ? "assets" : "../assets";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    const menuBackdrop = document.getElementById("menuBackdrop");
    const backgroundElements = document.querySelectorAll(".logo, .lang-btn, main, footer");
    let focusBeforeMenu = null;

    const setBackgroundInert = (isInert) => {
        backgroundElements.forEach((element) => {
            element.inert = isInert;
        });
    };

    const closeMenu = ({ restoreFocus = true } = {}) => {
        if (!menu || !nav || !menuIcon) return;

        const wasOpen = nav.classList.contains("active");
        nav.classList.remove("active");
        document.body.classList.remove("menu-open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", copy.openMenu);
        menuIcon.src = assetPrefix + "/vendor/boxicons/bx-menu-alt-right.svg";

        if (menuBackdrop) {
            menuBackdrop.hidden = true;
        }

        setBackgroundInert(false);

        if (wasOpen && restoreFocus && focusBeforeMenu instanceof HTMLElement) {
            focusBeforeMenu.focus();
        }

        focusBeforeMenu = null;
    };

    const openMenu = () => {
        if (!menu || !nav || !menuIcon) return;

        focusBeforeMenu = document.activeElement;
        nav.classList.add("active");
        document.body.classList.add("menu-open");
        menu.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-label", copy.closeMenu);
        menuIcon.src = assetPrefix + "/vendor/boxicons/bx-x.svg";

        if (menuBackdrop) {
            menuBackdrop.hidden = false;
        }

        setBackgroundInert(true);
        navLinks[0]?.focus();
    };

    if (menu && nav && menuIcon) {
        menu.addEventListener("click", () => {
            if (nav.classList.contains("active")) {
                closeMenu();
                return;
            }

            openMenu();
        });

        menuBackdrop?.addEventListener("click", closeMenu);
        navLinks.forEach((link) => link.addEventListener("click", () => closeMenu({ restoreFocus: false })));

        document.addEventListener("keydown", (event) => {
            if (!nav.classList.contains("active")) return;

            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableElements = [...navLinks, menu];
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768 && nav.classList.contains("active")) {
                closeMenu({ restoreFocus: false });
            }
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

    const commandForm = document.getElementById("commandPrompt");
    const commandInput = document.getElementById("commandInput");
    const commandOutput = document.getElementById("commandOutput");

    if (commandForm && commandInput && commandOutput) {
        const commandText = isPortuguese
            ? {
                help: "comandos disponíveis: help, whoami, about, skills, blog, contact, rookieops, clear",
                whoami: "Thiago Kusal | Infraestrutura, Identidade e Cloud | 15+ anos em produção",
                about: "abrindo ./about.md",
                skills: "listando ./stack e ./certifications",
                blog: "lendo os logs mais recentes do RookieOps",
                contact: "abrindo canal seguro no LinkedIn",
                rookieops: "conectando a rookieops.dev",
                cleared: "",
                invalid: "comando não encontrado. Digite 'help' para ver as opções."
            }
            : {
                help: "available commands: help, whoami, about, skills, blog, contact, rookieops, clear",
                whoami: "Thiago Kusal | Infrastructure, Identity & Cloud | 15+ years in production",
                about: "opening ./about.md",
                skills: "listing ./stack and ./certifications",
                blog: "reading the latest RookieOps logs",
                contact: "opening a secure LinkedIn channel",
                rookieops: "connecting to rookieops.dev",
                cleared: "",
                invalid: "command not found. Type 'help' to see the options."
            };
        const history = [];
        let historyIndex = 0;

        const showCommandResult = (message, isError = false) => {
            commandOutput.textContent = message ? `> ${message}` : "";
            commandOutput.classList.toggle("error", isError);
            commandOutput.classList.toggle("success", Boolean(message) && !isError);
        };

        const scrollToTarget = (selector) => {
            document.querySelector(selector)?.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });
        };

        commandForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const command = commandInput.value.trim().toLowerCase();

            if (!command) {
                showCommandResult(commandText.help);
                return;
            }

            history.push(command);
            historyIndex = history.length;
            commandInput.value = "";

            switch (command) {
                case "help":
                    showCommandResult(commandText.help);
                    break;
                case "whoami":
                    showCommandResult(commandText.whoami);
                    break;
                case "about":
                case "sobre":
                    showCommandResult(commandText.about);
                    scrollToTarget("#sobre");
                    break;
                case "skills":
                case "stack":
                    showCommandResult(commandText.skills);
                    scrollToTarget(".sobre-secoes");
                    break;
                case "blog":
                case "logs":
                    showCommandResult(commandText.blog);
                    scrollToTarget("#blog");
                    break;
                case "contact":
                case "contato":
                    showCommandResult(commandText.contact);
                    window.open("https://www.linkedin.com/in/tkusal/", "_blank", "noopener,noreferrer");
                    break;
                case "rookieops":
                    showCommandResult(commandText.rookieops);
                    window.open("https://rookieops.dev", "_blank", "noopener,noreferrer");
                    break;
                case "clear":
                case "cls":
                    showCommandResult(commandText.cleared);
                    break;
                default:
                    showCommandResult(commandText.invalid, true);
            }
        });

        commandInput.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp" && historyIndex > 0) {
                event.preventDefault();
                historyIndex -= 1;
                commandInput.value = history[historyIndex];
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                historyIndex = Math.min(historyIndex + 1, history.length);
                commandInput.value = history[historyIndex] || "";
            }
        });
    }

    const carousel = document.getElementById("rss-carousel");
    if (carousel && !reducedMotion) {
        const cards = [...carousel.querySelectorAll(".post-card")];
        const pixelsPerSecond = 60;
        let animationFrame;
        let previousTimestamp;
        let focusPaused = false;
        let pointerPaused = false;

        const stopAutoplay = () => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = undefined;
            previousTimestamp = undefined;
        };

        const advanceCarousel = (timestamp) => {
            const firstClone = carousel.querySelector(".carousel-clone");
            const cycleWidth = firstClone
                ? firstClone.offsetLeft - cards[0].offsetLeft
                : 0;

            if (previousTimestamp !== undefined && cycleWidth > 0) {
                const elapsedSeconds = Math.min(timestamp - previousTimestamp, 100) / 1000;
                carousel.scrollLeft += pixelsPerSecond * elapsedSeconds;

                if (carousel.scrollLeft >= cycleWidth) {
                    carousel.scrollLeft -= cycleWidth;
                }
            }

            previousTimestamp = timestamp;
            animationFrame = window.requestAnimationFrame(advanceCarousel);
        };

        const startAutoplay = () => {
            if (cards.length < 2 || animationFrame || document.hidden || focusPaused || pointerPaused) return;
            animationFrame = window.requestAnimationFrame(advanceCarousel);
        };

        carousel.addEventListener("pointerover", (event) => {
            if (event.target.closest?.(".post-card")) {
                pointerPaused = true;
                stopAutoplay();
            }
        });
        carousel.addEventListener("pointerout", (event) => {
            if (!event.relatedTarget?.closest?.(".post-card")) {
                pointerPaused = false;
                startAutoplay();
            }
        });
        carousel.addEventListener("focusin", () => {
            focusPaused = true;
            stopAutoplay();
        });
        carousel.addEventListener("focusout", (event) => {
            if (!carousel.contains(event.relatedTarget)) {
                focusPaused = false;
                startAutoplay();
            }
        });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                stopAutoplay();
                return;
            }

            startAutoplay();
        });

        if (cards.length > 1 && carousel.scrollWidth > carousel.clientWidth + 1) {
            cards.forEach((card) => {
                const clone = card.cloneNode(true);
                clone.classList.add("carousel-clone");
                clone.setAttribute("aria-hidden", "true");
                clone.querySelectorAll("a, button, [tabindex]").forEach((element) => {
                    element.setAttribute("tabindex", "-1");
                });
                carousel.append(clone);
            });
            carousel.classList.add("is-autoplaying");
            startAutoplay();
        }
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

document.addEventListener("DOMContentLoaded", () => {
    const isPortuguese = document.documentElement.lang.toLowerCase().startsWith("pt");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const usesCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const supportsViewTransitions = typeof document.startViewTransition === "function" && !reducedMotion;
    const copy = isPortuguese
        ? {
            professions: [
                "Sys Admin",
                "Infraestrutura, Segurança e Cloud",
                "Microsoft 365, Azure e AWS",
                "Automação, IaC e Containerização",
                "Aspirante a Microsoft MVP",
                "Dev por Diversão"
            ]
        }
        : {
            professions: [
                "System Admin",
                "Infrastructure, Security & Cloud",
                "Microsoft 365, Azure & AWS",
                "Automation, IaC & Containerization",
                "Aspiring Microsoft MVP",
                "Dev for Fun"
            ]
        };

    if (supportsViewTransitions) {
        document.documentElement.classList.add("view-transitions-ready");
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
    const commandSuggestions = document.getElementById("commandSuggestions");
    const terminalViewport = document.getElementById("terminalViewport");
    const terminalPanels = [...document.querySelectorAll("[data-terminal-view]")];
    const commandShortcuts = [...document.querySelectorAll("[data-terminal-command]")];

    if (commandForm && commandInput && commandOutput && terminalViewport && terminalPanels.length) {
        const commandText = isPortuguese
            ? {
                help: "comandos disponíveis: help, whoami, about, skills, blog, rookieops, clear",
                whoami: "carregando ./profile",
                about: "abrindo ./about.md",
                skills: "listando ./stack e ./certifications",
                blog: "lendo os logs mais recentes do RookieOps",
                rookieops: "conectando a rookieops.dev",
                cleared: "saída limpa. Digite help para continuar.",
                invalid: "comando não encontrado. Digite 'help' para ver as opções."
            }
            : {
                help: "available commands: help, whoami, about, skills, blog, rookieops, clear",
                whoami: "loading ./profile",
                about: "opening ./about.md",
                skills: "listing ./stack and ./certifications",
                blog: "reading the latest RookieOps logs",
                rookieops: "connecting to rookieops.dev",
                cleared: "output cleared. Type help to continue.",
                invalid: "command not found. Type 'help' to see the options."
            };
        const commandOptions = isPortuguese
            ? [
                { command: "whoami", description: "abrir o perfil profissional" },
                { command: "about", description: "ler a trajetória profissional" },
                { command: "skills", description: "listar competências e certificações" },
                { command: "blog", description: "abrir os artigos do RookieOps" },
                { command: "help", description: "mostrar todos os comandos" },
                { command: "rookieops", description: "acessar rookieops.dev" },
                { command: "clear", description: "limpar a saída do terminal" }
            ]
            : [
                { command: "whoami", description: "open the professional profile" },
                { command: "about", description: "read the professional journey" },
                { command: "skills", description: "list skills and certifications" },
                { command: "blog", description: "open the latest RookieOps posts" },
                { command: "help", description: "show every command" },
                { command: "rookieops", description: "visit rookieops.dev" },
                { command: "clear", description: "clear the terminal output" }
            ];
        const history = [];
        const hashCommands = {
            home: "whoami",
            whoami: "whoami",
            sobre: "about",
            about: "about",
            skills: "skills",
            stack: "skills",
            blog: "blog",
            logs: "blog"
        };
        let historyIndex = 0;
        let visibleSuggestions = [];
        let suggestionIndex = 0;
        let activeViewTransition;

        const closeCommandSuggestions = () => {
            visibleSuggestions = [];
            suggestionIndex = 0;
            commandInput.setAttribute("aria-expanded", "false");
            commandInput.removeAttribute("aria-activedescendant");

            if (commandSuggestions) {
                commandSuggestions.hidden = true;
                commandSuggestions.replaceChildren();
            }
        };

        const updateSuggestionSelection = () => {
            if (!commandSuggestions) return;

            const options = [...commandSuggestions.querySelectorAll("[role='option']")];
            options.forEach((option, index) => {
                option.setAttribute("aria-selected", String(index === suggestionIndex));
            });

            const activeOption = options[suggestionIndex];
            if (activeOption) {
                commandInput.setAttribute("aria-activedescendant", activeOption.id);
            }
        };

        const renderCommandSuggestions = () => {
            if (!commandSuggestions) return;

            const query = commandInput.value.trim().toLowerCase();
            if (!query) {
                closeCommandSuggestions();
                return;
            }

            const prefixMatches = commandOptions.filter(({ command }) => command.startsWith(query));
            const partialMatches = commandOptions.filter(({ command }) => !command.startsWith(query) && command.includes(query));
            visibleSuggestions = [...prefixMatches, ...partialMatches].slice(0, 5);

            if (!visibleSuggestions.length) {
                closeCommandSuggestions();
                return;
            }

            suggestionIndex = 0;
            const fragment = document.createDocumentFragment();

            visibleSuggestions.forEach(({ command, description }, index) => {
                const option = document.createElement("li");
                const commandLabel = document.createElement("span");
                const descriptionLabel = document.createElement("span");

                option.id = `command-suggestion-${index}`;
                option.className = "command-suggestion";
                option.dataset.commandSuggestion = command;
                option.setAttribute("role", "option");
                option.setAttribute("aria-selected", String(index === suggestionIndex));

                commandLabel.className = "command-suggestion-name";
                commandLabel.textContent = command;
                descriptionLabel.className = "command-suggestion-description";
                descriptionLabel.textContent = description;

                option.append(commandLabel, descriptionLabel);
                fragment.append(option);
            });

            commandSuggestions.replaceChildren(fragment);
            commandSuggestions.hidden = false;
            commandInput.setAttribute("aria-expanded", "true");
            updateSuggestionSelection();
        };

        const autocompleteCommand = (suggestion = visibleSuggestions[suggestionIndex]) => {
            if (!suggestion) return;

            commandInput.value = suggestion.command;
            commandInput.setSelectionRange(suggestion.command.length, suggestion.command.length);
            closeCommandSuggestions();
        };

        const showCommandResult = (message, isError = false) => {
            commandOutput.textContent = message ? `> ${message}` : "";
            commandOutput.classList.toggle("error", isError);
            commandOutput.classList.toggle("success", Boolean(message) && !isError);
        };

        const updateShortcuts = (activeCommand) => {
            commandShortcuts.forEach((shortcut) => {
                const isActive = shortcut.dataset.terminalCommand === activeCommand;
                if (isActive) {
                    shortcut.setAttribute("aria-current", "page");
                } else {
                    shortcut.removeAttribute("aria-current");
                }
            });
        };

        const activateView = (view, activeCommand, hash, targetSelector, updateHash = true, animate = true) => {
            const activePanel = terminalPanels.find((panel) => panel.dataset.terminalView === view);
            if (!activePanel) return;

            const updateView = () => {
                terminalPanels.forEach((panel) => {
                    panel.hidden = panel !== activePanel;
                });

                terminalViewport.scrollTo({ top: 0, behavior: "auto" });
                updateShortcuts(activeCommand);

                if (updateHash && window.location.hash !== `#${hash}`) {
                    window.history.pushState({ terminalCommand: activeCommand }, "", `#${hash}`);
                }
            };

            let viewChangeAnnounced = false;
            const announceViewChange = () => {
                if (viewChangeAnnounced) return;
                viewChangeAnnounced = true;

                window.requestAnimationFrame(() => {
                    if (targetSelector) {
                        activePanel.querySelector(targetSelector)?.scrollIntoView({
                            behavior: reducedMotion ? "auto" : "smooth",
                            block: "start"
                        });
                    }

                    window.dispatchEvent(new CustomEvent("terminal:viewchange", { detail: { view, activeCommand } }));
                });
            };

            const shouldAnimate = supportsViewTransitions && animate && activePanel.hidden;
            if (!shouldAnimate) {
                updateView();
                announceViewChange();
                return;
            }

            activeViewTransition?.skipTransition();

            try {
                const transition = document.startViewTransition(updateView);
                activeViewTransition = transition;
                transition.updateCallbackDone.then(announceViewChange, () => {
                    updateView();
                    announceViewChange();
                });

                const clearTransition = () => {
                    if (activeViewTransition === transition) {
                        activeViewTransition = undefined;
                    }
                };
                transition.finished.then(clearTransition, clearTransition);
            } catch {
                updateView();
                announceViewChange();
            }
        };

        const runCommand = (rawCommand, { updateHash = true, showOutput = true, animate = true } = {}) => {
            const command = rawCommand.trim().toLowerCase();

            switch (command) {
                case "help":
                    if (showOutput) showCommandResult(commandText.help);
                    break;
                case "whoami":
                case "home":
                case "inicio":
                    if (showOutput) showCommandResult(commandText.whoami);
                    activateView("home", "whoami", "home", null, updateHash, animate);
                    break;
                case "about":
                case "sobre":
                    if (showOutput) showCommandResult(commandText.about);
                    activateView("about", "about", "sobre", null, updateHash, animate);
                    break;
                case "skills":
                case "stack":
                    if (showOutput) showCommandResult(commandText.skills);
                    activateView("skills", "skills", "skills", null, updateHash, animate);
                    break;
                case "blog":
                case "logs":
                    if (showOutput) showCommandResult(commandText.blog);
                    activateView("blog", "blog", "blog", null, updateHash, animate);
                    break;
                case "rookieops":
                    if (showOutput) showCommandResult(commandText.rookieops);
                    window.open("https://rookieops.dev", "_blank", "noopener,noreferrer");
                    break;
                case "clear":
                case "cls":
                    showCommandResult(commandText.cleared);
                    break;
                default:
                    if (showOutput) showCommandResult(commandText.invalid, true);
            }
        };

        commandForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const command = commandInput.value.trim().toLowerCase();

            if (!command) {
                closeCommandSuggestions();
                showCommandResult(commandText.help);
                return;
            }

            history.push(command);
            historyIndex = history.length;
            commandInput.value = "";
            closeCommandSuggestions();
            runCommand(command);
        });

        commandShortcuts.forEach((shortcut) => {
            shortcut.addEventListener("click", (event) => {
                event.preventDefault();
                commandInput.value = "";
                closeCommandSuggestions();
                runCommand(shortcut.dataset.terminalCommand || "help");
            });
        });

        commandSuggestions?.addEventListener("pointerdown", (event) => {
            const target = event.target instanceof Element
                ? event.target.closest("[data-command-suggestion]")
                : null;
            if (!target) return;

            const suggestion = commandOptions.find(({ command }) => command === target.dataset.commandSuggestion);
            if (!suggestion) return;

            event.preventDefault();
            autocompleteCommand(suggestion);
            commandInput.focus();
        });

        commandInput.addEventListener("input", () => {
            historyIndex = history.length;
            renderCommandSuggestions();
        });

        commandInput.addEventListener("blur", () => {
            window.setTimeout(closeCommandSuggestions, 120);
        });

        commandInput.addEventListener("keydown", (event) => {
            if (event.key === "Tab" && visibleSuggestions.length) {
                event.preventDefault();
                autocompleteCommand();
            } else if (event.key === "ArrowDown" && visibleSuggestions.length) {
                event.preventDefault();
                suggestionIndex = (suggestionIndex + 1) % visibleSuggestions.length;
                updateSuggestionSelection();
            } else if (event.key === "ArrowUp" && visibleSuggestions.length) {
                event.preventDefault();
                suggestionIndex = (suggestionIndex - 1 + visibleSuggestions.length) % visibleSuggestions.length;
                updateSuggestionSelection();
            } else if (event.key === "Escape" && visibleSuggestions.length) {
                event.preventDefault();
                closeCommandSuggestions();
            } else if (event.key === "Enter") {
                event.preventDefault();
                commandForm.requestSubmit();
            } else if (event.key === "ArrowUp" && historyIndex > 0) {
                event.preventDefault();
                historyIndex -= 1;
                commandInput.value = history[historyIndex];
                renderCommandSuggestions();
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                historyIndex = Math.min(historyIndex + 1, history.length);
                commandInput.value = history[historyIndex] || "";
                renderCommandSuggestions();
            }
        });

        const restoreViewFromHash = ({ animate = true } = {}) => {
            const hash = window.location.hash.slice(1).toLowerCase();
            runCommand(hashCommands[hash] || "whoami", { updateHash: false, showOutput: Boolean(hash), animate });
        };

        window.addEventListener("popstate", restoreViewFromHash);
        restoreViewFromHash({ animate: false });
    }

    const carousel = document.getElementById("rss-carousel");
    if (carousel && !reducedMotion && !usesCoarsePointer) {
        const cards = [...carousel.querySelectorAll(".post-card")];
        const pixelsPerSecond = 60;
        let animationFrame;
        let carouselInitialized = false;
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
            if (!carouselInitialized || cards.length < 2 || animationFrame || document.hidden || focusPaused || pointerPaused || carousel.closest("[hidden]")) return;
            animationFrame = window.requestAnimationFrame(advanceCarousel);
        };

        const initializeCarousel = () => {
            if (carouselInitialized || cards.length < 2 || carousel.closest("[hidden]")) return;
            if (carousel.scrollWidth <= carousel.clientWidth + 1) return;

            cards.forEach((card) => {
                const clone = card.cloneNode(true);
                clone.classList.add("carousel-clone");
                clone.setAttribute("aria-hidden", "true");
                clone.querySelectorAll("a, button, [tabindex]").forEach((element) => {
                    element.setAttribute("tabindex", "-1");
                });
                carousel.append(clone);
            });

            carouselInitialized = true;
            carousel.classList.add("is-autoplaying");
            startAutoplay();
        };

        const synchronizeCarousel = () => {
            if (carousel.closest("[hidden]")) return;
            initializeCarousel();
            startAutoplay();
        };

        const scheduleCarouselStart = () => {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(synchronizeCarousel);
            });
        };

        carousel.addEventListener("pointerenter", () => {
            pointerPaused = true;
            stopAutoplay();
        });
        carousel.addEventListener("pointerleave", () => {
            pointerPaused = false;
            startAutoplay();
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

        window.addEventListener("terminal:viewchange", (event) => {
            if (event.detail?.view !== "blog") {
                stopAutoplay();
                return;
            }

            scheduleCarouselStart();
        });

        const carouselResizeObserver = new ResizeObserver(synchronizeCarousel);
        carouselResizeObserver.observe(carousel);

        if (!carousel.closest("[hidden]")) {
            scheduleCarouselStart();
        }
    }

});

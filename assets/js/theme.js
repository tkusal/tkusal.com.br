(() => {
    // Language Negotiation
    try {
        const langKey = "tkusal-lang-pref";
        
        document.addEventListener("click", (event) => {
            const langBtn = event.target.closest(".terminal-lang");
            if (langBtn) {
                window.localStorage.setItem(langKey, langBtn.getAttribute("lang") === "en" ? "en" : "pt");
            }
        }, { capture: true });

        const currentPath = window.location.pathname;
        const isRoot = currentPath === "/" || (currentPath.endsWith("/index.html") && !currentPath.includes("/en/"));

        if (isRoot) {
            const storedLang = window.localStorage.getItem(langKey);
            if (storedLang === "en") {
                window.location.replace("/en/");
            } else if (!storedLang) {
                const browserLang = navigator.language || navigator.userLanguage || "";
                if (browserLang && !browserLang.toLowerCase().startsWith("pt")) {
                    window.location.replace("/en/");
                }
            }
        }
    } catch (e) {}

    const storageKey = "tkusal-color-theme";
    const root = document.documentElement;

    const readStoredTheme = () => {
        try {
            return window.localStorage.getItem(storageKey);
        } catch {
            return null;
        }
    };

    const persistTheme = (theme) => {
        try {
            window.localStorage.setItem(storageKey, theme);
        } catch {
            // The selected theme still applies for the current page.
        }
    };

    const applyTheme = (theme, { persist = false } = {}) => {
        const isLight = theme === "light";

        if (isLight) {
            root.dataset.theme = "light";
        } else {
            delete root.dataset.theme;
        }

        const themeColor = document.querySelector("meta[name='theme-color']");
        if (themeColor) {
            themeColor.setAttribute("content", isLight ? "#eef5f0" : "#050806");
        }

        const toggle = document.getElementById("themeToggle");
        if (toggle) {
            toggle.setAttribute("aria-pressed", String(isLight));
            const status = toggle.querySelector(".theme-toggle-state-text");
            if (status) {
                status.textContent = isLight
                    ? toggle.dataset.onLabel || "ON"
                    : toggle.dataset.offLabel || "OFF";
            }
            toggle.title = isLight
                ? toggle.dataset.disableLabel || "Disable light mode"
                : toggle.dataset.enableLabel || "Enable light mode";
        }

        if (persist) {
            persistTheme(isLight ? "light" : "dark");
        }
    };

    applyTheme(readStoredTheme() === "light" ? "light" : "dark");

    document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.getElementById("themeToggle");
        if (!toggle) return;

        applyTheme(root.dataset.theme === "light" ? "light" : "dark");
        toggle.addEventListener("click", () => {
            applyTheme(root.dataset.theme === "light" ? "dark" : "light", { persist: true });
        });
    });

    window.addEventListener("storage", (event) => {
        if (event.key === storageKey) {
            applyTheme(event.newValue === "light" ? "light" : "dark");
        }
    });
})();

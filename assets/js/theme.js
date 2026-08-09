(() => {
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

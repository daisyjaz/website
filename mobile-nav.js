(() => {
    const siteNav = document.querySelector(".site-nav");
    if (!siteNav) {
        return;
    }

    const menuToggle = document.createElement("button");
    menuToggle.className = "mobile-menu-toggle";
    menuToggle.type = "button";
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.setAttribute("aria-controls", "mobile-menu-panel");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<img src="moon_menu_icon.png" alt="">';

    const backdrop = document.createElement("button");
    backdrop.className = "mobile-menu-backdrop";
    backdrop.type = "button";
    backdrop.setAttribute("aria-label", "Close navigation menu");
    backdrop.tabIndex = -1;

    const panel = document.createElement("aside");
    panel.className = "mobile-menu-panel";
    panel.id = "mobile-menu-panel";
    panel.setAttribute("aria-label", "Page navigation");
    panel.setAttribute("aria-hidden", "true");

    const heading = document.createElement("div");
    heading.className = "mobile-menu-heading";
    heading.innerHTML = '<button class="mobile-menu-close" type="button" aria-label="Close navigation menu"><span class="mobile-menu-close-mark" aria-hidden="true"></span></button>';

    const links = document.createElement("nav");
    links.className = "mobile-menu-links";
    links.setAttribute("aria-label", "Mobile navigation");

    siteNav.querySelectorAll("a[href]").forEach((link) => {
        const mobileLink = link.cloneNode(true);
        mobileLink.className = "mobile-menu-link";
        links.appendChild(mobileLink);
    });

    panel.append(heading, links);
    document.body.append(backdrop, panel, menuToggle);

    const closeButton = panel.querySelector(".mobile-menu-close");
    const firstLink = links.querySelector("a");

    function closeMenu(returnFocus = true) {
        document.body.classList.remove("mobile-nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.removeAttribute("aria-hidden");
        menuToggle.tabIndex = 0;
        panel.setAttribute("aria-hidden", "true");
        if (returnFocus) {
            menuToggle.focus();
        }
    }

    function openMenu() {
        document.body.classList.add("mobile-nav-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-hidden", "true");
        menuToggle.tabIndex = -1;
        panel.setAttribute("aria-hidden", "false");
        closeButton.focus();
    }

    menuToggle.addEventListener("click", () => {
        if (menuToggle.getAttribute("aria-expanded") === "true") {
            closeMenu(false);
        } else {
            openMenu();
        }
    });

    closeButton.addEventListener("click", () => closeMenu());
    backdrop.addEventListener("click", () => closeMenu());
    links.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeMenu(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            closeMenu();
        }
    });
})();
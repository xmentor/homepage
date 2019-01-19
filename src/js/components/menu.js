export default class Menu {
    constructor() {
        this.menu = document.getElementById('menu');
        this.menuToggler = document.getElementById('menu-toggler');

        this.bind();
    }

    isMobile() {
        return window.matchMedia('(max-width: 640px').matches;
    }

    toggleMenu() {
        if(!this.isMobile()) {
            return false;
        }

        const isOpen = this.menu.classList.contains('nav__menu--open');

        if(isOpen) {
            this.menu.classList.remove('nav__menu--open');
        } else {
            this.menu.classList.add('nav__menu--open');
        }

        this.menuToggler.setAttribute('aria-expanded', !isOpen);
    }

    menuClickHandler(e) {
        e.preventDefault();

        const t = e.target;

        if(!t.classList.contains('menu__link')) {
            return false;
        }

        this.toggleMenu();
    }

    menuTogglerClickHandler(e) {
        e.preventDefault();

        this.toggleMenu();
    }

    bind() {
        this.menu.addEventListener('click', this.menuClickHandler.bind(this));
        this.menuToggler.addEventListener('click', this.menuTogglerClickHandler.bind(this));
    }
}
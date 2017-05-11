(function(menuToggler, menu) {
    'use strict';
    if(640 > window.innerWidth) {
        menuToggler.setAttribute('role', 'button');
        menuToggler.setAttribute('aria-expanded', 'false');
        menuToggler.setAttribute('aria-controls', 'menu');
        menuToggler.setAttribute('aria-label', 'Pokaż/ukryj menu');

        function toggleMenu() {
            const isOpen = menu.classList.contains('nav__menu--open');

            if(isOpen) {
                menuToggler.setAttribute('aria-expanded', !isOpen);
                menu.classList.remove('nav__menu--open');
            } else {
                menuToggler.setAttribute('aria-expanded', !isOpen);
                menu.classList.add('nav__menu--open');
            }
        }   
        menuToggler.addEventListener('click', (e) => {     
            toggleMenu();
            e.preventDefault();
        });
        menuToggler.addEventListener('keydown', (e) => {
            const enterKeyCode = 13;
            const spaceKeyCode = 32;
            const key = e.keyCode;
            if((key !== enterKeyCode) || (key !== spaceKeyCode)) {
                return false;
            }
            toggleMenu();

            e.preventDefault();
        });
    }
}(document.getElementById('menu-toggle'), document.getElementById('menu')));
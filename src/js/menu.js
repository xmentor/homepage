(function(menuToggler, menu) {
    'use strict';
    if(640 > window.innerWidth) {
        function toggleMenu() {
            const isOpen = menu.classList.contains('nav__menu--open');

            if(isOpen) {
                menu.classList.remove('nav__menu--open');
            } else {
                menu.classList.add('nav__menu--open');
            }
            menuToggler.setAttribute('aria-expanded', !isOpen);
        }   
        menuToggler.addEventListener('click', (e) => {     
            toggleMenu();
            e.preventDefault();
        });
        menu.addEventListener('click', (e) => {
            const t = e.target;
            if(!t.classList.contains('menu__link')) {
                return false;
            }
            toggleMenu();
        });
    }
}(document.getElementById('menu-toggle'), document.getElementById('menu')));
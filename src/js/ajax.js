(function(contactForm) {
    'use strict';
    
    let activedElement = null;
    
    const infoContainer = document.querySelector('.contact__info');
    
    function hideInfo() {
        infoContainer.classList.remove('contact__info--visible');
        activedElement.focus();
    }
    
    function clickHandler(e) {
        const t = e.target;
        if(!t.classList.contains('info__button')) {
            return false;
        }

        hideInfo();
    }
    
    function keyHandler(e) {
        const escKey = 27;
        if (e.keyCode !== escKey) {
            return false;
        }
        
        hideInfo();
    }

    function showInfo(info) {       
        const infoContainerIsVisible = infoContainer.classList.contains('contact__info--visible');
        const infoContent = document.querySelector('.info__content');
        
        if(!infoContainerIsVisible) {
            infoContainer.classList.add('contact__info--visible');
        }
        activedElement = document.activeElement;
        infoContainer.focus();
        infoContent.textContent = info;
    }
    
    function sendMessage(e) {
        e.preventDefault();
        if (contactForm.checkValidity()) {
            const XHR = new XMLHttpRequest();
            const formData = new FormData(contactForm);
            
            XHR.onreadystatechange = () => {
                if(XHR.readyState === 4) {
                    if(XHR.status === 200) {
                        showInfo(XHR.responseText);
                        contactForm.reset();
                    } else {
                        showInfo('Problem z żądaniem - spróbuj później.');
                    }
                }
            };
            
            XHR.open("POST", "mail.php", true);
            XHR.send(formData);
        }
    }
    
    if(!window.XMLHttpRequest) {
        throw Error('Twoja przeglądarka nie obsługuje XMLHttpRequest.');
    }
    
    contactForm.addEventListener("submit", sendMessage);
    document.addEventListener("keydown", keyHandler);
    document.addEventListener("click", clickHandler);
    
})(document.querySelector(".contact__form"));
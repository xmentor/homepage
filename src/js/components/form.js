export default class Form {
    constructor() {
        this.form = document.querySelector(".contact__form");
        this.infoContainer = document.querySelector('.contact__info');
        this. activedElement = null;
        this.escKey = 27;
        
        this.bind();
    }

    hideInfo() {
        this.infoContainer.classList.remove('contact__info--visible');
        this.activedElement.focus();
    }
    
    clickHandler(e) {
        const t = e.target;
        if(!t.classList.contains('info__button')) {
            return false;
        }

        this.hideInfo();
    }
    
    keyHandler(e) {
        if(e.keyCode !== this.escKey) {
            return false;
        }
        
        this.hideInfo();
    }

    showInfo(info) {       
        const infoContainerIsVisible = this.infoContainer.classList.contains('contact__info--visible');
        const infoContent = document.querySelector('.info__content');
        
        if(!infoContainerIsVisible) {
            this.infoContainer.classList.add('contact__info--visible');
        }

        this.activedElement = document.activeElement;
        this.infoContainer.focus();
        infoContent.textContent = info;
    }
    
    sendMessage(e) {
        e.preventDefault();
        if(this.form.checkValidity()) {
            const XHR = new XMLHttpRequest();
            const formData = new FormData(this.form);
            
            XHR.onreadystatechange = () => {
                if(XHR.readyState === 4) {
                    if(XHR.status === 200) {
                        const response = JSON.parse(XHR.responseText);
                        this.showInfo(response.info);
                        if(response.type === 4) {
                            this.form.reset();
                        }
                    } else {
                        this.showInfo('Problem z żądaniem - spróbuj później.');
                    }
                }
            };
            
            XHR.open("POST", "mail.php", true);
            XHR.send(formData);
        }
    }

    bind() {
        this.form.addEventListener("submit", this.sendMessage.bind(this));
        document.addEventListener("keydown", this.keyHandler.bind(this));
        document.addEventListener("click", this.clickHandler.bind(this));   
    }
}
(function(c) {
    function elementMsgExsist() {
        return document.querySelector(".contact__msg") !== null;
    }
    function e(b) {
        const tabKey = 9,
            enterKey = 13,
            escKey = 27;
        if ((b.keyCode !== tabKey) || (b.keyCode !== enterKey) || (b.keyCode !== escKey) || !elementMsgExsist()) {
            return false;
        }
        b.preventDefault();
        const msg = document.querySelector(".contact__msg");

        msg.parentNode.removeChild(msg);
        document.removeEventListener("keydown", e);
    }
    function d(b) {
        if (!elementMsgExsist()) {
            var a = document.createElement("div"),
                contact = document.querySelector(".article__content--contact")
            a.classList.add("contact__msg");
            a.classList.add("msg");
            a.setAttribute("role", "dialog");
            a.setAttribute("aria-labelledby", "msg-content");
            a.setAttribute("tabindex", "-1");
            a.innerHTML = "<button class='msg__close' aria-label='Zamknij wiadomo\u015b\u0107'>\n<span class='visuallyhidden'>Zamknij wiadomo\u015b\u0107</span>\n</button>\n<div id='msg-content' class='msg__content'>" + b + "</div>";
            contact.appendChild(a);
            a.focus();
            document.querySelector(".msg__close").addEventListener("click", function(a) {
                const t = a.target,
                    parentTarget = t.parentNode;
                parentTarget.parentNode.removeChild(parentTarget);
            });
            document.addEventListener("keydown", e);
        } else {
            const msg = document.querySelector(".contact__msg");
            msg.parentNode.removeChild(msg);
            d(b);
        }
    }
    function f(b) {
        b.preventDefault();
        if (c.checkValidity()) {
            var a = new XMLHttpRequest;
            b = new FormData(c);
            a.open("POST", "mail.php", !0);
            a.onreadystatechange = function(b) {
                4 === a.readyState && (200 === a.status ? d(a.responseText) : d("B\u0142\u0105d - spr\u00f3buj p\u00f3\u017aniej"));
            };
            a.send(b);
            c.reset();
        }
    }
    if (!window.XMLHttpRequest) {
        return !1;
    }
    c.addEventListener("submit", f);
})(document.querySelector("#contact-form"));
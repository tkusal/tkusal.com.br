document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector("#menu");
    const nav = document.querySelector(".links");
    const professionElement = document.getElementById('profissao');

    menu.addEventListener('click', () => {
        menu.classList.toggle('bx-x');
        nav.classList.toggle('active');
    });

    const professions = [
        "Infraestrutura",
        "Sys Admin",
        "Arquitetura Cloud",
        "Futuro DevOps/SRE",
        "Dev entusiasta"
    ];

    let currentProfessionIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newProfessionDelay = 1000;

    function typeProfession() {
        const currentProfession = professions[currentProfessionIndex];
        if (!isDeleting) {
            professionElement.textContent = currentProfession.slice(0, currentCharIndex++);
            if (currentCharIndex > currentProfession.length) {
                isDeleting = true;
                setTimeout(typeProfession, newProfessionDelay);
            } else {
                setTimeout(typeProfession, typingSpeed);
            }
        } else {
            professionElement.textContent = currentProfession.slice(0, currentCharIndex--);
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
                setTimeout(typeProfession, typingSpeed);
            } else {
                setTimeout(typeProfession, erasingSpeed);
            }
        }
    }

    typeProfession();

    class FormSubmit {
        constructor(settings) {
            this.settings = settings;
            this.form = document.querySelector(settings.form);
            this.formButton = document.querySelector(settings.button);
            if (this.form) {
                this.url = this.form.getAttribute("action");
            }
            this.sendForm = this.sendForm.bind(this);
        }

        displaySuccess() {
            this.form.innerHTML = this.settings.success;
        }

        displayError() {
            this.form.innerHTML = this.settings.error;
        }

        getFormObject() {
            const formObject = {};
            const fields = this.form.querySelectorAll("[name]");
            fields.forEach((field) => {
                formObject[field.getAttribute("name")] = field.value;
            });
            return formObject;
        }

        onSubmission(event) {
            event.preventDefault();
            event.target.disabled = true;
            event.target.innerText = "Enviando...";
        }

        async sendForm(event) {
            try {
                this.onSubmission(event);
                await fetch(this.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(this.getFormObject()),
                });
                this.displaySuccess();
            } catch (error) {
                this.displayError();
                throw new Error(error);
            }
        }

        init() {
            if (this.form) this.formButton.addEventListener("click", this.sendForm);
            return this;
        }
    }

    const formSubmit = new FormSubmit({
        form: "[data-form]",
        button: "[data-button]",
        success: "<h2 class='success'>Obrigado por seu contato!</h2>",
        error: "<h2 class='error'>Desculpe, nãoo foi possível enviar sua mensagem.</h2>",
    });
    formSubmit.init();
});
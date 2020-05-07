class WhatsAppController {

    constructor() {
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    /*
    * Carrega todos os elementos com id para o atributo this.el
    */
    loadElements(){
        this.el = {};
        document.querySelectorAll('[id]').forEach( element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    /*
    * Cria prototypes úteis para todos os Element do document.
    */
    elementsPrototype() {
        
        // Esconde
        Element.prototype.hide = function() {
            this.style.display = 'none';
            return this;
        }

        // Mosta
        Element.prototype.show = function() {
            this.style.display = 'block';
            return this;
        }
        
        // Alterna entre mostrar/ocultar
        Element.prototype.toggle = function() {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        // Aplica addEventListener para mais de um tipo de evento
        Element.prototype.on = function(events, callback) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, callback);
            });
            return this;
        }

        // Recebe um JSON e aplica todas as configurações de css descritas nele
        Element.prototype.css = function(styles) {
            for (let name in styles) {
                this.style[name] = styles[name];
            }
            return this;
        }

        // Adiciona uma classe
        Element.prototype.addClass = function(name) {
            this.classList.add(name);
            return this;
        }

        // Remove uma classe
        Element.prototype.removeClass = function(name) {
            this.classList.remove(name);
            return this;
        }

        // Alterna o uso de uma classe
        Element.prototype.toggleClass = function(name) {
            this.classList.toggle(name);
            return this;
        }

        // Informar se o elemento possui a clase @name
        Element.prototype.hasClass = function(name) {
            return this.classList.contains(name);
        }

        // Retorna um FormData para os elementos HTMLFormElement
        HTMLFormElement.prototype.getForm = function() {
            return new FormData(this);
        }

        // Converte os campos de um formullario em JSON
        HTMLFormElement.prototype.tojSON = function() {
            let json = {};

            this.getForm().forEach((value, key) => {
                json[key] = value;
            });

            return json;
        }

    }


    /*
    * Adiciona listeners para diversos elementos.
    */
    initEvents() {
        // Abrir panel de edição de perfil
        this.el.myPhoto.on('click', event => {
            this.closeAllLeftPanels();
            this.el.panelEditProfile.show();
            // Para manter a animação do transform
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);
        });

        // Abrir panel de novo contato
        this.el.btnNewContact.on('click', event => {
            this.closeAllLeftPanels();
            this.el.panelAddContact.show();
            // Para manter a animação do transform
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);
        });

        // Fechar panel de edição de perfil
        this.el.btnClosePanelEditProfile.on('click', event => {
            this.el.panelEditProfile.removeClass('open');
        });

        // Fechar panel de novo contato
        this.el.btnClosePanelAddContact.on('click', event => {
            this.el.panelAddContact.removeClass('open');
        });

        // Enviar uma foto para o perfil
        this.el.photoContainerEditProfile.on('click', event => {
            this.el.inputProfilePhoto.click();
        });

        // Editando o nome do perfil
        this.el.inputNamePanelEditProfile.on('keypress', event => {
            if(event.key === 'Enter') {
                event.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        });

        // Campo para editar nome do perfil
        this.el.btnSavePanelEditProfile.on('click', event => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });

        // Formulario para adicionar novo contato
        this.el.formPanelAddContact.on('submit', event => {
            event.preventDefault();

            this.getForm();
        });
        
    }

    /*
    * Escone todos os panels.
    */
    closeAllLeftPanels() {
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }

}
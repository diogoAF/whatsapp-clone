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

        // Clique em qualquer contato da listagem de contatos
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', event => {
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });
            });
        });

        // Botão de inserir anexos
        this.el.btnAttach.on('click', event => {
            event.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        // Anexar Foto
        this.el.btnAttachPhoto.on('click', event => {
            this.el.inputPhoto.click();
        });

        // Anexar Câmera
        this.el.btnAttachCamera.on('click', event => {
            this.closeAllMainPanels();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                height: 'calc(100% - 120px)'
            });
        });

        // Anexar Documento
        this.el.btnAttachDocument.on('click', event => {
            this.closeAllMainPanels();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                height: 'calc(100% - 120px)'
            });
        });

        // Anexar Contato
        this.el.btnAttachContact.on('click', event => {
            this.el.modalContacts.show();
        });

        // Carrega todos os arquivos selecionados pelo usuário
        this.el.inputPhoto.on('change', event => {
            console.log(this.el.inputPhoto.files);
            // Spread para converter a collection en array
            let files = [...this.el.inputPhoto.files];

            files.forEach(file => {
                console.log(file);
            });
        });

        // Fecha o Panel da Câmera
        this.el.btnClosePanelCamera.on('click', event => {
            this.closeAllMainPanels();
            this.el.panelMessagesContainer.show();
        });

        // Tirar foto pela WebCam
        this.el.btnTakePicture.on('click', event => {
            console.log('take picture');
        });

        // Fecha o Panel de Preview de Documento
        this.el.btnClosePanelDocumentPreview.on('click', event => {
            this.closeAllMainPanels();
            this.el.panelMessagesContainer.show();
        });

        // Envia documento para o chat
        this.el.btnSendDocument.on('click', event => {
            console.log('Document sent');
        });

        // Fecha a modal de anexar contato
        this.el.btnCloseModalContacts.on('click', event => {
            this.el.modalContacts.hide();
        });

        // Iniciar gravação de audio
        this.el.btnSendMicrophone.on('click', event => {
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTimer();
        });

        // Cancelar a gravação de audio
        this.el.btnCancelMicrophone.on('click', event => {
            this.closeRecordMicrophone();
        });

        // Finalizar a gravação de audio
        this.el.btnFinishMicrophone.on('click', event => {
            console.log('Finished recording');
            this.closeRecordMicrophone();
        });
        
    }

    /*
    * Inicia a contabilizar a duração do audio gravado.
    */
    startRecordMicrophoneTimer() {
        let start = Date.now();
        
        this._recordMicrophoneTimer = setInterval(() => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);
        }, 1000);

    }

    /*
    * Fecha todos os elementos referentes a gravação de audio.
    */
    closeRecordMicrophone() {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneTimer);
        this.el.recordMicrophoneTimer.innerHTML = '00:00'
    }

    /*
    * Esconte os botões de anexo se o usuário clicar em qualquer local do
    * documento.
    */
    closeMenuAttach() {
        document.removeEventListener('click', this.removeAttach);
        this.el.menuAttach.removeClass('open');
    }

    /*
    * Escone todos os panels da esquerda.
    */
    closeAllLeftPanels() {
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }

    /*
    * Escone todos os panels da área principal.
    */
    closeAllMainPanels() {
        this.el.panelMessagesContainer.hide();
        this.el.panelCamera.removeClass('open');
        this.el.panelDocumentPreview.removeClass('open');
    }

}
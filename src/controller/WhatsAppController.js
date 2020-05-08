import Format from './../util/Format';
import CameraController from './CameraController';

export default class WhatsAppController {

    constructor() {
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    /**
    * Carrega todos os elementos com id para o atributo this.el
    */
    loadElements(){
        this.el = {};
        document.querySelectorAll('[id]').forEach( element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    /**
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


    /**
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

            // Cria o controlodar da camera passando o elemento onde o video deve ser transmitido
            this._camera = new CameraController(this.el.videoCamera);
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
            this._camera.stop();
        });

        // Tirar foto pela WebCam
        this.el.btnTakePicture.on('click', event => {
            // Efetivamente tira a foto
            let dataUrl = this._camera.takePicture();
            this.el.pictureCamera.src = dataUrl;
            // Eventos
            this.el.pictureCamera.show();
            this.el.videoCamera.hide();
            this.el.btnReshootPanelCamera.show();
            this.el.containerTakePicture.hide();
            this.el.containerSendPicture.show();
        });

        // Tirar outra foto pela Webcam
        this.el.btnReshootPanelCamera.on('click', event => {
            this.el.pictureCamera.hide();
            this.el.videoCamera.show();
            this.el.btnReshootPanelCamera.hide();
            this.el.containerTakePicture.show();
            this.el.containerSendPicture.hide();
        });

        // Enviar a foto tirada pela WebCam
        this.el.btnSendPicture.on('click', event => {
            console.log('Picture sent', this.el.pictureCamera.src);
        })

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

        // Captura a mensagem escrita pelo usuário
        this.el.inputText.on('keyup', event => {
            if(this.el.inputText.innerHTML.length) {
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }
        });

        // Trata o envio da mensagem pela telca Enter
        this.el.inputText.on('keypress', event => {
            if(event.key === 'Enter' && !event.ctrlKey) {
                event.preventDefault();
                this.el.btnSend.click();
            }
        });

        // Trata o envio da mensagem
        this.el.btnSend.on('click', event => {
            console.log(this.el.inputText.innerHTML);
        });

        // Mostra/Esconde a lista de emojis
        this.el.btnEmojis.on('click', event => {
            this.el.panelEmojis.toggleClass('open');
        });

        // Cria os eventos de click em cada emoji
        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            emoji.on('click', event => {

                // Clona o elemento HTML para inserir o emoji
                let clone = this.el.imgEmojiDefault.cloneNode();
                
                // Insere os dados do emoji no clone
                clone.style.cssText = emoji.style.cssText;
                clone.dataset.unicode = emoji.dataset.unicode;
                clone.alt = emoji.dataset.unicode;
                emoji.classList.forEach( name => {
                    clone.addClass(name);
                });

                // Pega onde o cursor do mouse está focado
                let cursor = window.getSelection();
                // Se o mouse não estiver focado no inputText, faz ele ficar
                if(!cursor.focusNode || cursor.focusNode.id != this.el.inputText.id){
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                // Pega o range do cursor, útil caso o usuário tela selecionado parte do texto
                // e apaga o contudo da seleção
                let range = cursor.getRangeAt(0);
                range.deleteContents();

                // Cria um fragmento e insere nele o clone personalizado do emoji 
                let frag = document.createDocumentFragment();
                frag.appendChild(clone);

                // Insere o fragmento no range e coloca o cursor do mouse logo após o fragmento
                range.insertNode(frag);
                range.setStartAfter(clone);

                // Dispara o evento de keyup no inputText
                this.el.inputText.dispatchEvent(new Event('keyup'));
            });
        });
        
    }

    /**
    * Inicia a contabilizar a duração do audio gravado.
    */
    startRecordMicrophoneTimer() {
        let start = Date.now();
        
        this._recordMicrophoneTimer = setInterval(() => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);
        }, 1000);

    }

    /**
    * Fecha todos os elementos referentes a gravação de audio.
    */
    closeRecordMicrophone() {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneTimer);
        this.el.recordMicrophoneTimer.innerHTML = '00:00'
    }

    /**
    * Esconte os botões de anexo se o usuário clicar em qualquer local do
    * documento.
    */
    closeMenuAttach() {
        document.removeEventListener('click', this.removeAttach);
        this.el.menuAttach.removeClass('open');
    }

    /**
    * Escone todos os panels da esquerda.
    */
    closeAllLeftPanels() {
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }

    /**
    * Escone todos os panels da área principal.
    */
    closeAllMainPanels() {
        this.el.panelMessagesContainer.hide();
        this.el.panelCamera.removeClass('open');
        this.el.panelDocumentPreview.removeClass('open');
    }

}
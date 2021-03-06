import Format from './../util/Format';
import CameraController from './CameraController';
import MicrophoneController from './MicrophoneController';
import DocumentPreviewController from './DocumentPreviewController';
import Firebase from './../util/Firebase';
import User from './../model/User';
import Chat from '../model/Chat';

export default class WhatsAppController {

    constructor() {

        this._firebase = new Firebase();

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
        this.initAuth();
    }

    /**
    * Inicia a autenticação do sistema
    */
    initAuth() {
        this.el.appContent.css({display: 'none'});

        this._firebase.initAuth().then(response => {

            this._user = new User(response.user.email);

            // Listener para o evento datachange
            this._user.on('datachange', data => {

                document.querySelector('title').innerHTML = data.name + ' - ' + document.querySelector('title').innerHTML;

                this.el.inputNamePanelEditProfile.innerHTML = data.name;

                if(data.photo) {
                    let photoLG = this.el.imgPanelEditProfile;
                    photoLG.src = data.photo;
                    photoLG.show();
                    this.el.imgDefaultPanelEditProfile.hide();

                    let photoSM = this.el.myPhoto.querySelector('img');
                    photoSM.src = data.photo;
                    photoSM.show();
                }

                this.initContacts();
                
            });

            // Coleta os dados recebidos pela Autenticação
            this._user.name = response.user.displayName;
            this._user.email = response.user.email;
            this._user.photo = response.user.photoURL;

            // Salva no banco os novos dados
            this._user.save().then(() => {

                this.el.appContent.css({display: 'flex'});

            }).catch(error => {
                console.error('Save', error);
            });

        }).catch(error => {
            console.error('Auth', error);
        });
    }

    /**
    * Carrega todos os contatos
    */
    initContacts() {

        this._user.on('contactschange', contacts => {
            this.el.contactsMessagesList.innerHTML = '';

            contacts.forEach(contact => {

                let div = document.createElement('div');
                div.addClass('contact-item');

                div.innerHTML = `
                    <div class="dIyEr">
                        <div class="_1WliW" style="height: 49px; width: 49px;">
                            <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                            <div class="_3ZW2E">
                                <span data-icon="default-user" class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                        <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                        <g fill="#FFF">
                                            <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="_3j7s9">
                        <div class="_2FBdJ">
                            <div class="_25Ooe">
                                <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                            </div>
                            <div class="_3Bxar">
                                <span class="_3T2VG">${contact.lastMessageTime}</span>
                            </div>
                        </div>
                        <div class="_1AwDx">
                            <div class="_itDl">
                                <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>

                                <span class="_2_LEW last-message">
                                    <div class="_1VfKB">
                                        <span data-icon="status-dblcheck" class="">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                                <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                                    <div class="_3Bxar">
                                        <span>
                                            <div class="_15G96">
                                                <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                            </div>
                                    </div>
                                    </span>
                            </div>
                        </div>
                    </div>`;

                if(contact.photo) {
                    let img = div.querySelector('.photo');
                    img.src = contact.photo
                    img.show();
                }

                // Eventos de clique no contato
                div.on('click' , event => {
                    this.el.activeName.innerHTML = contact.name;
                    this.el.activeStatus.innerHTML = contact.status;

                    if(contact.photo) {
                        this.el.activePhoto.src = contact.photo;
                        this.el.activePhoto.show();
                    }

                    this.el.home.hide();
                    this.el.main.css({
                        display: 'flex'
                    });
                    
                });

                this.el.contactsMessagesList.appendChild(div);
            });

        });

        this._user.getContacts();

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
            this.el.btnSavePanelEditProfile.disabled = true;

            this._user.name = this.el.inputNamePanelEditProfile.innerHTML;

            this._user.save().then(() => {
                this.el.btnSavePanelEditProfile.disabled = false;
            }).catch(error => {
                console.error('btnSavePanelEditProfile', error);
            });
        });

        // Formulario para adicionar novo contato
        this.el.formPanelAddContact.on('submit', event => {
            event.preventDefault();

            // Utiliza o prototype getForm()
            let form = this.el.formPanelAddContact.getForm();

            let contact = new User(form.get('email'));

            contact.on('datachange', data => {

                // Caso o usuário foi encontrado no banco, salva
                if (data.name) {
                    Chat.createIfNotExists(this._user.email, contact.email).then(chat => {
                        //Salva o ID do chat nos dois usuários
                        contact.chatId = chat.id;
                        this._user.chatId = chat.id;

                        //Adiciona o user na listagem de contatos também
                        contact.addContact(this._user).then();

                        //Adiciona o novo contato
                        this._user.addContact(contact).then(() => {
                            console.log('Contado adicionado!');
                            this.el.btnClosePanelAddContact.click();
                        }).catch(error => {
                            console.error('addContact', error);
                        });
                    });
                    
                } else {
                    console.error('Usuário não encontrado');
                }

            });
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
            this.el.inputDocument.click();
        });

        // Anexar Contato
        this.el.btnAttachContact.on('click', event => {
            this.el.modalContacts.show();
        });

        // Trata o envio de documentos
        this.el.inputDocument.on('change', event => {
            if(this.el.inputDocument.files){

                // Retorna o panelDocumentPreview para ter a altura padrão
                this.el.panelDocumentPreview.css({
                    height: '100%'
                });

                // Atualmente o usuário só pode enviar um arquivo por vez
                let file = this.el.inputDocument.files[0];
                this._documentPreviewController = new DocumentPreviewController(file);
                
                // Recebe a imagem de preview
                this._documentPreviewController.getPreviewData().then(result => {
                    this.el.imgPanelDocumentPreview.src = result.src;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.imagePanelDocumentPreview.show();
                    this.el.filePanelDocumentPreview.hide();

                }).catch(err => {
                    // Trata tipos que não são reconhecidos pelo JS
                    switch(file.type) {
                        case 'application/vnd.ms-excel':
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';
                            break;
                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
                            break;
                        case 'application/msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                            break;
                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                    }

                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                    this.el.imagePanelDocumentPreview.hide();
                    this.el.filePanelDocumentPreview.show();
                });
            }
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

            this._microphoneController = new MicrophoneController(this.el.audioMicrophone);

            // Listener para quando o MicrophoneController estiver pronto para iniciar a gravação
            this._microphoneController.on('ready', audio => {
                this._microphoneController.startRecorder();
            });

            // Listener para acompanhar a duração da gravação 
            this._microphoneController.on('recordtimer', timer => {
                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
            });
        });

        // Cancelar a gravação de audio
        this.el.btnCancelMicrophone.on('click', event => {
            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();
        });

        // Finalizar a gravação de audio
        this.el.btnFinishMicrophone.on('click', event => {
            this._microphoneController.stopRecorder();
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
    * Fecha todos os elementos referentes a gravação de audio.
    */
    closeRecordMicrophone() {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
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
import Model from "./Model";
import Firebase from "../util/Firebase";

export default class Chat extends Model {
    constructor(){
        super();
    }

    /**
    * Retorna a referência da collection 'chats'
    */
    static getRef(){
        return Firebase.db().collection('/chats');
    }

    /**
    * Cria um novo chat para os dois usuários informados
    */
    static create(senderEmail, contactEmail) {
        return new Promise((resolve, recject) => {

            let users = {};
            users[btoa(senderEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRef()
                .add({
                    users,
                    timeStamp: new Date(),
                })
                .then(doc => {
                    Chat.getRef().doc(doc.id).get().then(chat => {
                        resolve(chat);
                    }).catch(error => {
                        reject(error);
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
    * Procura pelo chat referente aos dois usuários
    */
    static find(senderEmail, contactEmail) {
        return Chat.getRef()
            .where(btoa(senderEmail), '==', true)
            .where(btoa(contactEmail), '==', true)
            .get();
    }

    /**
    * Cria um novo chat se ele não existir
    */
    static createIfNotExists(senderEmail, contactEmail) {

        return new Promise((resolve, reject) => {
            
            Chat.find(senderEmail, contactEmail).then(chats => {

                if(chats.empty) {
                    Chat.create(senderEmail, contactEmail)
                        .then(chat => resolve(chat))
                        .catch(error => {reject(error)});
                } else {
                    chats.forEach(chat => {resolve(chat)});
                }

            }).catch(error => {
                reject(error);
            });
        });

    }

    /************************************************************
    ************************** GETTERS
    *************************************************************/ 
   get users(){
       return this._data.users;
   }

   get timeStamp(){
       return this._data.timeStamp;
   }

   /************************************************************
    ************************** SETTERS
    *************************************************************/ 
   set users(value) {
       this._data.users = value;
   }

   set timeStamp(value) {
       this._data.timeStamp = value;
   }
}
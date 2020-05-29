import Firebase from './../util/Firebase';
import Model from './Model';

export default class User extends Model {

    constructor(email) {
        super();

        if(email) this.getUser(email);
    }

    /**
    * Retorna a referência da colllection 'users'
    */
    static getRef(){
        return Firebase.db().collection('/users');
    }

    /**
    * Retorna a referência da colllection 'contacts' do usuário refente ao @email
    */
    static getContactsRef(email) {
        return User.findByEmail(email)
        .collection('contacts');
    }

    /**
    * Retorna a referência do usuário identificado pelo @email informado.
    */
    static findByEmail(email) {
        return User.getRef().doc(email);
    }

    /**
    * Retorna os dados do usuário identificado pelo @email
    */
    getUser(email) {
        return new Promise((resolve, reject) => {

            User.findByEmail(email).onSnapshot(doc => {
                this.fromJSON(doc.data());
                resolve(doc);
            });
        });
    }

    /**
    * Salva no Firebase os dados do usuário
    */
    save() {
        return User.findByEmail(this.email).set(this.toJSON());
    }

    /**
    * Salva no Firebase os dados do novo contato @contact
    * dentro do document do usuário ativo
    */
    addContact(contact) {
        return User.getContactsRef(this.email)
            .doc(btoa(contact.email))
            .set(contact.toJSON());
    }

    /**
    * Retorna todos os contatos do usuário
    */
    getContacts() {
        return new Promise((resolve, reject) => {
            User.getContactsRef(this.email).onSnapshot(docs => {
                let contacts = [];

                docs.forEach(doc => {
                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);
                });

                this.trigger('contactschange', contacts);

                resolve(contacts);
            });
        });
    }

    /************************************************************
    ************************** GETTERS
    *************************************************************/  
   
    get name() {
        return this._data.name;
    }

    get email() {
        return this._data.email;
    }

    get photo() {
        return this._data.photo;
    }

    /************************************************************
    ************************** SETTERS
    *************************************************************/  
   
    set name(value) {
        this._data.name = value;
    }

    set email(value) {
        this._data.email = value;
    }

    set photo(value) {
        this._data.photo = value;
    }
}
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
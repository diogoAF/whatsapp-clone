import Firebase from './../util/Firebase';
import ClassEvent from './../util/ClassEvent';

export default class User extends ClassEvent {

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
        return this.getRef().doc(email);
    }
}
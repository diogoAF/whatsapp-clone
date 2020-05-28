const firebase = require('firebase/app');
require('firebase/analytics');
require('firebase/firestore');
require('firebase/auth');

import {firebaseConfig} from '../../firebase-config';

export default class Firebase {

    constructor() {
        this._initialized = false
        this.init();
    }

    /**
    * Inicializa o App do Firebase
    */
    init() {
        if(!this.isInitialized()) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
            this._initialized = true;
        }
        
    }

    /**
    * Verifica se o App do Firebase já foi inicializado. 
    */
    isInitialized() {
        return this._initialized;
    }

    /**
    * Retonar a referência do Firestore
    */
    db() {
        return firebase.firestore();
    }

    /**
    * Retornar a referência do Storage
    */
    storage() {
        return firebase.storage();
    }

    /**
    * Inicializa o processo de autenticação via Firebase.
    */
    initAuth() {
        return new Promise((resolve, reject) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken;
                let user = result.user;

                resolve({user, token});
            }).catch(error => {
                reject(error);
            });
        });
    }
}
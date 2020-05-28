const firebase = require('firebase/app');
require('firebase/analytics');
require('firebase/firestore');

import {firebaseConfig} from '../../firebase-config';

export default class Firebase {

    constructor() {
        this._initialized = false
        this.init();
    }

    init() {
        if(!this.isInitialized()) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
            this._initialized = true;
        }
        
    }

    isInitialized() {
        return this._initialized;
    }

    db() {
        return firebase.firestore();
    }

    storage() {
        return firebase.storage();
    }
}
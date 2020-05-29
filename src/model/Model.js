import ClassEvent from './../util/ClassEvent';

export default class Model extends ClassEvent {

    constructor() {
        super();
        this._data = {};
    }

    /**
    * Mescla os dados do @json com o objeto this._data
    */
    fromJSON(json) {
        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());
    }

    /**
    * Retorna o objeto json
    */
    toJSON() {
        return this._data;
    }
}
export default class ClassEvent {
    constructor(){
        // Listagem dos eventos
        this._events ={}; 
    }

    /**
     * Adiciona o evento de nome @eventName na lista de eventos observados
     * e faz a sua referencia para a função @eventFunction
     */ 
    on(eventName, eventFunction) {
        if(!this._events[eventName]) {
            this._events[eventName] = new Array();
        }

        this._events[eventName].push(eventFunction);
    }

    /**
     * Recebe o @eventName e procura por ele na listagem de eventos.
     * Caso seja encontrado, todas as funções refentes ao evento são executadas.
     */
    trigger() {
        let args = [...arguments];
        let eventName = args.shift();

        args.push(new Event(eventName));

        if(this._events[eventName] instanceof Array) {
            this._events[eventName].forEach(eventFunction => {
                eventFunction.apply(null, args);
            });
        }
    }

}
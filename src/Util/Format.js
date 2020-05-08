export default class Format {

    /**
    * Cria uma DIV temporaria para utilizar o dataset dela
    * para converter o parametro @text para o formato camelCase
    * que o dataset gera automaticamente. 
    */
    static getCamelCase(text) {
        let div = document.createElement('div');

        div.innerHTML= `<div data-${text}="data"></div>`;

        return Object.keys(div.firstChild.dataset)[0];
    }

    /**
    * Formato @duration (em milisegundos) no padrão 0:00:00
    */
    static toTime(duration) {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}
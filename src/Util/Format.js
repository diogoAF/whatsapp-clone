class Format {

    /*
    * Cria uma DIV temporaria para utilizar o dataset dela
    * para converter o parametro @text para o formato camelCase
    * que o dataset gera automaticamente. 
    */
    static getCamelCase(text) {
        let div = document.createElement('div');

        div.innerHTML= `<div data-${text}="data"></div>`;

        return Object.keys(div.firstChild.dataset)[0];
    }
}
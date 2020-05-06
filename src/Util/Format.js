class Format {
    static getCamelCase(text) {
        let div = document.createElement('div');

        div.innerHTML= `<div data-${text}="data"></div>`;

        return Object.keys(div.firstChild.dataset)[0];
    }
}
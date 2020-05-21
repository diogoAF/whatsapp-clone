const pdfjsLib = require('pdfjs-dist');
const path = require('path');

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js');

export default class DocumentPreviewController {
    constructor(file) {
        this._file = file;
    }

    /**
     * Prepara o preview dos tipos de arquivos que são reconhecidos pelo JS
     */
    getPreviewData() {
        return new Promise((resolve, reject) => {

            let reader = new FileReader();
            
            switch(this._file.type){
            case 'application/pdf':
                reader.onload = event => {
                    pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                        pdf.getPage(1).then(page => {

                            let viewport = page.getViewport(1);
                            let canvas = document.createElement('canvas');
                            let canvasContext = canvas.getContext('2d');

                            canvas.width = viewport.width;
                            canvas.height = viewport.height;

                            page.render({
                                canvasContext,
                                viewport,
                            }).then(() => {
                                let pgText = (pdf.numPages == 1) ? 'página' : 'páginas';
                                resolve({
                                    src: canvas.toDataURL('image/png'),
                                    info: `${pdf.numPages} ${pgText}`,
                                });
                            }).catch(err => {
                                reject(err);
                            });

                        }).catch(err => {
                            reject(err);
                        });

                    }).catch(err => {
                        reject(err);
                    });
                }

                reader.readAsArrayBuffer(this._file);
                break;
            case 'audio/mp3':
            case 'audio/midi':
            case 'audio/ogg':
            case 'audio/mpeg':
                break;
            case 'video/mp4':
            case 'video/mkv':
            case 'video/avi':
            case 'video/flv':
            case 'video/quicktime':
                break;
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
            case 'image/gif':
            case 'image/jiff':
                reader.onload = event => {
                    resolve({
                        src: reader.result,
                        info: this._file.name,
                        type: this._file.type
                    });
                }

                reader.onerror = err => {
                    reject(err);
                }
                
                reader.readAsDataURL(this._file);
                break;
            default:
                // Rejeita os que não são reconhecidos pelo JS
                reject();
            }
        });
    }
}
import ClassEvent from "../util/ClassEvent";

export default class MicrophoneController extends ClassEvent {
    constructor(audioMicrophone) {
        super();

        this._audioMicrophoneEl = audioMicrophone;
        this._isAvailable = false;
        this._mimeType = 'audio/webm';

        // Pede a permissão para acessar o microfone
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {

            this._stream = stream;
            this._audioMicrophoneEl.srcObject = this._stream;

            this._isAvailable = true;

            // Ativa o evento de ready
            this.trigger('ready', this._stream);

        }).catch(err => {
            console.error(err);
        });

    }

    /**
     * Para todos os tracks ativos do Stream
     */
    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop();
        });

        this._isAvailable = false;
    }

    /**
     * Inicia a gravação do audio
     */
    startRecorder() {

        if(this._isAvailable) {
            // Cria um MediaRecorder para capturar o stream de audio
            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });

            // Buffer dos bytes capturados
            this._recordedChunks = [];

            // Listener para colocar os pedaços de dados no Buffer
            this._mediaRecorder.addEventListener('dataavailable', event => {
                if(event.data.size > 0) this._recordedChunks.push(event.data);
            });

            // Listener para converter o Buffer num arquivo definitivo
            this._mediaRecorder.addEventListener('stop', event => {
                // Converte o array do Buffer em um Blob
                let bytes = new Blob(this._recordedChunks, {type: this._mimeType});
                let filename = `rec_${Date.now()}`;

                // Converte o Blob gerado em um arquivo real
                let file = new File([bytes], filename, {
                    type: this._mimeType,
                    lastModified: Date.now(),
                });

            });

            // Efetivamente inicia a gravação
            this._mediaRecorder.start();
        }
    }

    /**
     * Para a captura do microfone e a gravação do audio
     */
    stopRecorder() {
        if(this._isAvailable) {
            this._mediaRecorder.stop();
            this.stop();
        }
    }
}
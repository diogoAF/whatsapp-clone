import ClassEvent from "../util/ClassEvent";

export default class MicrophoneController extends ClassEvent {
    constructor(audioMicrophone) {
        super();

        this._audioMicrophoneEl = audioMicrophone;

        // Pede a permissão para acessar o microfone
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {

            this._stream = stream;
            this._audioMicrophoneEl.srcObject = this._stream;

            this._audioMicrophoneEl.play();

            // Ativa o evento de play
            this.trigger('play', this._audioMicrophoneEl);

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
    }
}
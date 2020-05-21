export default class MicrophoneController {
    constructor(audioMicrophone) {

        this._audioMicrophoneEl = audioMicrophone;

        // Pede a permissão para acessar o microfone
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {

            this._stream = stream;
            this._audioMicrophoneEl.srcObject = this._stream;

            this._audioMicrophoneEl.play();

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
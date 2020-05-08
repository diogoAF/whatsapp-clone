export default class CameraController {
    constructor(videoEl) {
        this._videoEl = videoEl;

        // Pede a permissão para acessar o vídeo
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {

            this._stream = stream;
            this._videoEl.srcObject = stream;
            this._videoEl.play();

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
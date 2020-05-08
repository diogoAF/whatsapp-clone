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

    /**
     * Pega a imagem atual da WebCam e salva em um canvas
     * @mineType é o formato em que a imagem será salva.
     */
    takePicture(mineType = 'image/png') {
        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mineType);
    }
}
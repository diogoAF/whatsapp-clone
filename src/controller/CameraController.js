class CameraController {
    constructor(videoEl) {
        this._videoEl = videoEl;

        // Pede a permissão para acessar o vídeo
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {
            // O elemento video do HTML trabalha apenas com URL
            // por isso devemos converter o stream da camera em uma URL
            this._videoEl.src = URL.createObjectURL(stream);
            this._videoEl.play();
            
        }).catch(err => {
            console.error(err);
        });
    }
}
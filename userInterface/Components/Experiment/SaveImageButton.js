const ImageCanvas = require("../Canvas/ImageCanvas.js")

class SaveImageButton {
    constructor(ImageCanvasClass) {
        this.button = document.getElementById("saveImageButton")
        this.imageCanvas = ImageCanvasClass
    }

    listenToClickEvent() {
        this.button.addEventListener("click", (e) => {
            this.start(e)
        })
    }

    start(){
        const image = this.imageCanvas.mainCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        this.downloadImage(image)
        //window.location.href = image; // it will save locally
        //return canvas1.toDataURL();
    }

    // Save | Download image
    downloadImage(data, filename = 'untitled.png') {
        let a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }
}

module.exports = new SaveImageButton(ImageCanvas)
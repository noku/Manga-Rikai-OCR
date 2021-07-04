const ImagesDataCollection = require("../ImagesDataCollection.js")

const ImageCanvas = require("../Canvas/ImageCanvas.js")
const OverlayCanvas = require("../Canvas/OverlayCanvas.js")


class LoadFileImageToCanvas {
    constructor(ImageCanvas, OverlayCanvas) {
        this.inputElement = document.getElementById("imageInput")
        this.imageCanvas = ImageCanvas
        this.overlayCanvas = OverlayCanvas
    }

    listenToFileInputEvent() {
        this.inputElement.addEventListener("change", (e) => {
            this.start(e)
        })
    }

    start(e) {
        let uploadedImagesArray = e.target.files
        console.log(uploadedImagesArray)
        console.log(uploadedImagesArray.length != 0)
        if (uploadedImagesArray.length != 0) {
            ImagesDataCollection.initiateAndSaveAllNewImagesData(uploadedImagesArray)
            let imageFile = uploadedImagesArray[0];
            let imageObj = new Image();
            let URLObj = window.URL || window.webkitURL;
            imageObj.src = imageFile
            //imageObj.src = URLObj.createObjectURL(imageFile);
            imageObj.onload =() => {
                this.imageCanvas.resizeCanvasFromImage(imageObj)
                this.overlayCanvas.resizeCanvasFromImage(imageObj)

                this.imageCanvas.mainContext.drawImage(imageObj, 0, 0, this.imageCanvas.mainCanvas.width, this.imageCanvas.mainCanvas.height);
            };
        }

    }

    
}

module.exports = new LoadFileImageToCanvas(ImageCanvas, OverlayCanvas)

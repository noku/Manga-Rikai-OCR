const ImagesDataCollection = require("../ImagesDataCollection.js")

const ImageCanvas = require("../Canvas/ImageCanvas.js")
const OverlayCanvas = require("../Canvas/OverlayCanvas.js")
const ModeSwitch = require("../ModeSwitch.js")


class PasteImageToCanvas {
    constructor(ImageCanvas, OverlayCanvas) {
        this.imageCanvas = ImageCanvas
        this.overlayCanvas = OverlayCanvas
    }

    start(event) {
        this.retrieveImageFromClipboardAsBlob(event, (imageBlob) => {
            if(imageBlob){
                ImagesDataCollection.initiateAndSaveImageData(imageBlob)
                this.putImageFromBlob(imageBlob)
            }
        })
    }

    putImageFromBlob(imageBlob) {
        let imageObj = new Image();
        let URLObj = window.URL || window.webkitURL;
        imageObj.src = URLObj.createObjectURL(imageBlob);
        imageObj.onload = () => {
            ModeSwitch.editModeActivate()

            this.imageCanvas.resizeCanvas(imageObj.width, imageObj.height)
            this.overlayCanvas.resizeCanvas(imageObj.width, imageObj.height)

            this.imageCanvas.mainContext.drawImage(imageObj, 0, 0, this.imageCanvas.mainCanvas.width, this.imageCanvas.mainCanvas.height);
        };
    }

    retrieveImageFromClipboardAsBlob(pasteEvent, callback){
        if(pasteEvent.clipboardData == false){
                if(typeof(callback) == "function"){
                    callback(undefined);
                }
            };
            let items = pasteEvent.clipboardData.items;
            if(items == undefined){
                if(typeof(callback) == "function"){
                    callback(undefined);
                }
            };
            for (let i = 0; i < items.length; i++) {
                // Skip content if not image
                if (items[i].type.indexOf("image") == -1) continue;
                // Retrieve image on clipboard as blob
                let blob = items[i].getAsFile();
                if(typeof(callback) == "function"){
                    callback(blob);
                }
            }
    }
}

module.exports = new PasteImageToCanvas(ImageCanvas, OverlayCanvas) 
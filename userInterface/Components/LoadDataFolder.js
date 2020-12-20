const ImageCanvas = require("./ImageCanvas.js")
const OverlayCanvas = require("./OverlayCanvas.js")
const folderInputElement = document.getElementById("folderInput")
const TranslationTextContainer = require("./TranslationTextContainer.js")

class LoadDataFolder {
    constructor(folderInputElement, ImageCanvas, OverlayCanvas, TranslationTextContainer) {
        this.inputElement = folderInputElement
        this.imageCanvas = ImageCanvas
        this.overlayCanvas = OverlayCanvas
        this.translationTextContainer = TranslationTextContainer
    }

    listenToFolderUploadEvent() {
        this.inputElement.addEventListener("change", (e) => {
            this.loadImageAndDataFromFolder(e)
        })
    }

    loadImageAndDataFromFolder(e) {
        this.loadImageFromFolder(e)
        this.loadDataFromFolder(e)
    }

    loadDataFromFolder(e) {
        console.log(e.target.files)
        console.log(e.target.files[0])

        let JSONsavedData = e.target.files[0]
        this.readJSONdata(JSONsavedData)
    }

    readJSONdata(data) {
        const reader = new FileReader();
      
        reader.onload = () => {
            let fileContent = JSON.parse(reader.result)
            console.log(fileContent)
            this.translationTextContainer.displayText(fileContent.extractedText, fileContent.translatedText);
        }
      
        reader.readAsText(data);
    }

    loadImageFromFolder(e) {
        let imageFile = e.target.files[1];
        let imageObj = new Image();
        let URLObj = window.URL || window.webkitURL;
        imageObj.src = URLObj.createObjectURL(imageFile);
        imageObj.onload =() => {
            this.imageCanvas.resizeCanvas(imageObj.width, imageObj.height)
            this.overlayCanvas.resizeCanvas(imageObj.width, imageObj.height)
            this.imageCanvas.mainContext.drawImage(imageObj, 0, 0, this.imageCanvas.mainCanvas.width, this.imageCanvas.mainCanvas.height);
        };
    }
}

module.exports = new LoadDataFolder(folderInputElement, ImageCanvas, OverlayCanvas, TranslationTextContainer)

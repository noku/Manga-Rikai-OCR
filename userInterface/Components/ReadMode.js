const ImagesDataCollection = require("./ImagesDataCollection.js")

const OverlayCanvas = require("./Canvas/OverlayCanvas.js")
const ImageCanvas = require("./Canvas/ImageCanvas.js")

const OutLinesContainerDiv = require("./OutlinesContainerDiv.js")


class ReadMode {
    constructor(OutLinesContainerDiv) {
        this.outLinesContainerDiv = OutLinesContainerDiv
        this.container = OutLinesContainerDiv.container
        this.button = document.getElementById("readMode")
    }

    turnOn(e) {
        ImageCanvas.show()
        OverlayCanvas.hide()
        this.turnOffButtonColor()
        //this.outLinesContainerDiv.resizeContainerToFitCanvas()
        this.outLinesContainerDiv.showContainer()
        this.outLinesContainerDiv.removeAllPreviousOutlines()
        this.outLinesContainerDiv.injectAllReadModeOutlines(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())
    }

    turnOffButtonColor() {
        this.button.disabled = true;
    }

}

module.exports = new ReadMode(OutLinesContainerDiv)
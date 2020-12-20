const ImagesDataCollection = require("./ImagesDataCollection.js")


const OutLinesContainerDiv = require("./OutlinesContainerDiv.js")


class ReadMode {
    constructor(OutLinesContainerDiv) {
        this.outLinesContainerDiv = OutLinesContainerDiv
        this.container = OutLinesContainerDiv.container
        this.button = document.getElementById("readMode")
    }

    turnOn(e) {
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
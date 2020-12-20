const ImagesDataCollection = require("./ImagesDataCollection.js")


const OutLinesContainerDiv = require("./OutlinesContainerDiv.js")


class EditMode {
    constructor(OutLinesContainerDiv) {
        this.outLinesContainerDiv = OutLinesContainerDiv
        this.container = OutLinesContainerDiv.container
        this.button = document.getElementById("editMode")
    }

    async turnOn(e) {
        this.turnOffButtonColor()
        //this.outLinesContainerDiv.resizeContainerToFitCanvas()
        this.outLinesContainerDiv.showContainer()
        this.outLinesContainerDiv.removeAllPreviousOutlines()
        this.outLinesContainerDiv.injectAllEditModeOutlines(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())
    }

    turnOffButtonColor() {
        this.button.disabled = true;
    }

}

module.exports = new EditMode(OutLinesContainerDiv)
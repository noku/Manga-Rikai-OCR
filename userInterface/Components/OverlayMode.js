const ImagesDataCollection = require("./ImagesDataCollection.js")

const OverlayCanvas = require("./Canvas/OverlayCanvas.js")
const ImageCanvas = require("./Canvas/ImageCanvas.js")

//const RectangleOutline = require("./RectangleOutline.js")

const OutLinesContainerDiv = require("./OutlinesContainerDiv.js")


class OverlayMode {
    constructor(OutLinesContainerDiv) {
        this.outLinesContainerDiv = OutLinesContainerDiv
        this.container = OutLinesContainerDiv.container
        this.button = document.getElementById("overlayMode")
    }

    async turnOn(e) {
        this.turnOffButtonColor()
        let currentImageFile = ImagesDataCollection.listOfImagesData[ImagesDataCollection.currentImageData].imageFile
        ImageCanvas.hide()
        OverlayCanvas.show()
        await OverlayCanvas.displayImage(currentImageFile)
        this.fillRegionsWithWhite(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())
        // this.outLinesContainerDiv.showContainer()
        // this.outLinesContainerDiv.removeAllPreviousOutlines()
        // this.outLinesContainerDiv.injectAllOverlayModeOutlines(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())
    }

    fillRegionsWithWhite(outlinesList) {
        outlinesList.forEach(outline => {
            let x = outline[1]
            let y = outline[2]
            let width = outline[3]
            let height = outline[4]

            OverlayCanvas.fillWithWhiteColor(x, y, width, height)
        });
    }

    turnOffButtonColor() {
        this.button.disabled = true;
    }

}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = new OverlayMode(OutLinesContainerDiv)
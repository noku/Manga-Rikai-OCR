const ImagesDataCollection = require("./ImagesDataCollection.js")


const OverlayCanvas = require("./Canvas/OverlayCanvas.js")
const ImageCanvas = require("./Canvas/ImageCanvas.js")
const RectangleOutline = require("./RectangleOutline.js")
const ServerConnection = require("./ServerConnection.js")
const TranslationTextContainer = require("./TranslationTextContainer.js")
const OutLinesContainerDiv = require("./OutlinesContainerDiv.js")


class EditMode {
    constructor(OverlayCanvas, RectangleOutlineClass, ServerConnectionClass, TranslationTextContainer, OutLinesContainerDiv) {
        this.button = document.getElementById("editMode")
        this.eventsListenerMode = "off"
        this.drag = false
        this.rect = {}
        this.overlayCanvas = OverlayCanvas
        this.mainCanvas = OverlayCanvas.mainCanvas
        this.mainContext = OverlayCanvas.mainContext

        this.rectangleOutline = RectangleOutlineClass
        this.serverConnection = ServerConnectionClass
        this.translationTextContainer = TranslationTextContainer
        this.outLinesContainerDiv = OutLinesContainerDiv
    }

    turnOn() {
        ImageCanvas.show()
        OverlayCanvas.show()
        this.turnOffButtonColor()
        this.removeAllThingsOnCanvas()
        this.updateOutlines()
        this.listenToDrag()
    }

    turnOffButtonColor() {
        this.button.disabled = true;
    }

    removeAllThingsOnCanvas() {
        this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    }

    showOverlayCanvas() {
        this.overlayCanvas.mainCanvas.style.display = "block"
    }

    listenToDrag() {
        if (this.eventsListenerMode == "off") {
            this.eventsListenerMode = "on"
            this.startDrawing()
            this.finishDrawing()
        }
    }

    startDrawing() {
        this.mainCanvas.addEventListener("mousedown", (e) => this.mouseDown(e))
        this.mainCanvas.addEventListener("mousemove", (e) => this.mouseMove(e))
    }

    finishDrawing() {
        this.mainCanvas.addEventListener("mouseup", (e) => this.mouseUp(e))
    }

    updateOutlines() {
        this.outLinesContainerDiv.showContainer()
        this.outLinesContainerDiv.removeAllPreviousOutlines()

        let imageData = ImagesDataCollection.getCurrentSaveData();

        if (imageData) {
            this.outLinesContainerDiv.injectAllEditModeOutlines(imageData.getListOfTextBoxes())
        }
    }

    mouseDown(e) {
        this.rect.startX = e.pageX - this.mainCanvas.offsetLeft - 10;
        this.rect.startY = e.pageY - this.mainCanvas.offsetTop;
        this.drag = true;
    }

    mouseMove(e) {
        if (this.drag) {
            this.rect.width = (e.pageX - this.mainCanvas.offsetLeft) - this.rect.startX;
            this.rect.height = (e.pageY - this.mainCanvas.offsetTop) - this.rect.startY;
            this.rectangleOutline.removeAll()
            this.rectangleOutline.generate(this.rect.startX, this.rect.startY, this.rect.width, this.rect.height)
        }
    }

    mouseUp(e) {
        this.resetDefault() 
        this.processImageAndText()
    }

    resetDefault() {
        this.drag = false;
        this.rectangleOutline.removeAll()
    }

    async processImageAndText() {
        let croppedImage = this.rectangleOutline.cropToImage(this.rect.startX, this.rect.startY, this.rect.width, this.rect.height)
        this.translationTextContainer.displayWaitingMessage("Hold on, Chotto Matte Ne")

        let textDataFromServer = await this.serverConnection.requestImageTranslation(croppedImage)

        this.translationTextContainer.displayText(textDataFromServer.extracted, textDataFromServer.translated)

        ImagesDataCollection.getCurrentSaveData().addTextBoxInfo([this.rect.startX, this.rect.startY, this.rect.width, this.rect.height, textDataFromServer.extracted, textDataFromServer.translated])
        console.log(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())

        this.updateOutlines()
    }
}

module.exports = new EditMode(OverlayCanvas, RectangleOutline, ServerConnection, TranslationTextContainer, OutLinesContainerDiv)
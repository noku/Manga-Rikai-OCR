const ImagesDataCollection = require("../ImagesDataCollection.js")


const LoadFileImageToCanvas = require("./LoadFileImageToCanvas.js")
const PasteImageToCanvas = require("./PasteImageToCanvas.js")
const ModeSwitch = require("../ModeSwitch.js")


class LoadImage {
    constructor() {
        this.pasteSection = document.getElementById("wholePage")
    }

    hideInstructionsList() {
        document.getElementById("instructionsList").style.display = "none"
    }

    listen() {
        this.listenToFileInputEvent()
        this.listenToPasteEvent()
    }

    listenToFileInputEvent() {
        LoadFileImageToCanvas.inputElement.addEventListener("change", (e) => {
            this.hideInstructionsList()
            ModeSwitch.createModeActivate()
            LoadFileImageToCanvas.start(e)
        })
    }

    listenToPasteEvent() {
        window.addEventListener("paste", (e) => {
            this.hideInstructionsList()
            PasteImageToCanvas.start(e)
        })
    }
}

module.exports = new LoadImage()
const ImagesDataCollection = require("./ImagesDataCollection.js")


const ReadMode = require("./ReadMode.js")
const EditMode = require("./EditMode.js")
const OverlayMode = require("./OverlayMode.js")
const TextOverlayMode = require("./TextOverlayMode.js")

class ModeSwitch {
    constructor() {
        this.currentMode = "Edit Mode"
    }


    listen() {
        this.listenForReadModeActivation()
        this.listenForEditModeActivation()
        this.listenForOverlayModeActivation() 
        this.listenForTextOverlayModeActivation() 
    }

    listenForEditModeActivation() {
        EditMode.button.addEventListener("click", (e) => {
            this.editModeActivate()
        })
    }

    listenForReadModeActivation() {
        ReadMode.button.addEventListener("click", (e) => {
            this.readModeActivate()
        })
    }

    listenForOverlayModeActivation() {
        OverlayMode.button.addEventListener("click", (e) => {
            this.overlayModeActivate()
        })
    }

    listenForTextOverlayModeActivation() {
        TextOverlayMode.button.addEventListener("click", (e) => {
            this.textOverlayModeActivate()
        })
    }

    readModeActivate() {
        this.currentMode = "Read Mode"
        this.resetToDefault()
        ReadMode.turnOn()
    }

    editModeActivate() {
        this.currentMode = "Edit Mode"
        this.resetToDefault()
        EditMode.turnOn()
    }

    overlayModeActivate() {
        this.currentMode = "Overlay Mode"
        this.resetToDefault()
        OverlayMode.turnOn()
    }

    textOverlayModeActivate() {
        this.currentMode = "Text Overlay Mode"
        this.resetToDefault()
        TextOverlayMode.turnOn()
    }

    resetToDefault() {
        this.madeAllModesButtonsClickable()
        this.hideAllModes()
    }

    checkIfSaveDataIsNotEmpty() {
        return ImagesDataCollection.getCurrentSaveData().getNumberOfTextBoxes() != 0
    }

    warning() {
        alert("You gotta have some text boxes first. Create some or load some")
    }

    hideAllModes() {
        EditMode.mainCanvas.style.display = "none"
        ReadMode.container.style.display = "none"
        OverlayMode.container.style.display = "none"
        TextOverlayMode.container.style.display = "none"
    }

    madeAllModesButtonsClickable() {
        EditMode.button.disabled = false    
        ReadMode.button.disabled = false
        OverlayMode.button.disabled = false
        TextOverlayMode.button.disabled = false
    }

}

module.exports = new ModeSwitch()
const ImagesDataCollection = require("./ImagesDataCollection.js")


const ReadMode = require("./ReadMode.js")
const EditMode = require("./EditMode.js")


class ModeSwitch {
    constructor(ReadModeClass, EditModeClass) {
        this.readMode = ReadModeClass
        this.editMode = EditModeClass
    }


    listen() {
        this.listenForReadModeActivation()
        this.listenForEditModeActivation()
    }

    listenForEditModeActivation() {
        this.editMode.button.addEventListener("click", (e) => {
            if (this.checkIfSaveDataIsNotEmpty()) {
                this.editModeActivate()
            }
            else (
                this.warning()
            )
        })
    }

    listenForReadModeActivation() {
        this.readMode.button.addEventListener("click", (e) => {
            if (this.checkIfSaveDataIsNotEmpty()) {
                this.readModeActivate()
            }
            else (
                this.warning()
            )
        })
    }

    checkIfSaveDataIsNotEmpty() {
        return ImagesDataCollection.getCurrentSaveData().getNumberOfTextBoxes() != 0
    }

    warning() {
        alert("You gotta have some text boxes first. Create some or load some")
    }

    readModeActivate() {
        this.resetToDefault()
        this.readMode.turnOn()
    }

    editModeActivate() {
        this.resetToDefault()
        this.editMode.turnOn()
    }

    resetToDefault() {
        this.madeAllModesButtonsClickable()
        this.hideAllModes()
    }

    hideAllModes() {
        this.readMode.container.style.display = "none"
        this.editMode.mainCanvas.style.display = "none"
    }

    madeAllModesButtonsClickable() {
        this.readMode.button.disabled = false
        this.editMode.button.disabled = false    
    }

}

module.exports = new ModeSwitch(ReadMode, EditMode)
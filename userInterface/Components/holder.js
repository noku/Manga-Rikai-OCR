const ImagesDataCollection = require("./ImagesDataCollection.js")


const ReadMode = require("./ReadMode.js")
const CreateMode = require("./CreateMode.js")
const EditMode = require("./EditMode.js")


class ModeSwitch {
    constructor(ReadModeClass, CreateModeClass, EditModeClass) {
        this.readMode = ReadModeClass
        this.createMode = CreateModeClass
        this.editMode = EditModeClass
    }


    listen() {
        this.listenForCreateModeActivation()
        this.listenForReadModeActivation()
        this.listenForEditModeActivation()
    }


    listenForCreateModeActivation() {
        this.createMode.button.addEventListener("click", (e) => {
            this.createModeActivate()
        })
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

    createModeActivate() {
        this.resetToDefault()
        this.createMode.turnOn()
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
        this.editMode.container.style.display = "none"
        this.createMode.mainCanvas.style.display = "none"
    }

    madeAllModesButtonsClickable() {
        this.readMode.button.disabled = false
        this.createMode.button.disabled = false
        this.editMode.button.disabled = false    
    }

}

module.exports = new ModeSwitch(ReadMode, CreateMode, EditMode)
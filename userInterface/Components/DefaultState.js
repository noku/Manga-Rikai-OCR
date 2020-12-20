const ReadMode = require("./ReadMode.js")
const CreateMode = require("./CreateMode.js")
const EditMode = require("./EditMode.js")

class DefaultState {
    constructor () {}
    
    reset() {
        this.madeAllModesButtonsClickable()
        this.hideAllModes()
    }

    hideAllModes() {
        ReadMode.container.style.display = "none"
        EditMode.container.style.display = "none"
        CreateMode.mainCanvas.style.display = "none"
    }

    madeAllModesButtonsClickable() {
        ReadMode.button.disabled = false
        CreateMode.button.disabled = false
        EditMode.button.disabled = false    
    }
}

module.exports = new DefaultState()
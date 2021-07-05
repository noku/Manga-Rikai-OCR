const ReadMode = require("./ReadMode.js")
const EditMode = require("./EditMode.js")

class DefaultState {
    constructor () {}
    
    reset() {
        this.madeAllModesButtonsClickable()
        this.hideAllModes()
    }

    hideAllModes() {
        ReadMode.container.style.display = "none"
        EditMode.mainCanvas.style.display = "none"
    }

    madeAllModesButtonsClickable() {
        ReadMode.button.disabled = false
        EditMode.button.disabled = false    
    }
}

module.exports = new DefaultState()
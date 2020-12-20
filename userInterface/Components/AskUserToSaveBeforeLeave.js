const ImagesDataCollection = require("./ImagesDataCollection.js")


const SaveTranslationButton = require("./SaveTranslationButton.js")


class AskUserToSaveBeforeLeave {
    constructor() {}
    
    listen() {
        window.addEventListener('beforeunload', (event) => {
            if (this.checkConditionIsFulfilled()) {
                event.preventDefault()
                event.returnValue = ''
            }
        })
    }

    checkConditionIsFulfilled() {
        return this.checkIfSaveDataIsNotEmpty() && this.checkIfSaveButtonIsNotClicked()
    }

    checkIfSaveDataIsNotEmpty() {
        return ImagesDataCollection.getCurrentSaveData().getNumberOfTextBoxes() != 0
    }

    checkIfSaveButtonIsNotClicked() {
        return !(SaveTranslationButton.clicked)
    }

}

module.exports = new AskUserToSaveBeforeLeave()

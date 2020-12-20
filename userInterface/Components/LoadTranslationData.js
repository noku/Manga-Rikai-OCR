const ImagesDataCollection = require("./ImagesDataCollection.js")


const ModeSwitch = require("./ModeSwitch.js")


class LoadTranslationData {
    constructor() {
        this.inputElement = document.getElementById("translationFileInput")
    }

    listenToTranslationFileUploadEvent() {
        this.inputElement.addEventListener("change", (e) => {
            this.loadDataFromFolder(e)
        })
    }

    loadDataFromFolder(e) {
        let JSONsavedData = e.target.files[0]
        this.readJSONdata(JSONsavedData)
        console.log(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())
    }

    readJSONdata(data) {
        const reader = new FileReader();
      
        reader.onload = () => {
            ImagesDataCollection.getCurrentSaveData().loadPreviousSaveData(reader.result)
            ModeSwitch.editModeActivate()
        }
      
        reader.readAsText(data);
    }
}

module.exports = new LoadTranslationData()
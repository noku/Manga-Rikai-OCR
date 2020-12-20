const ImagesDataCollection = require("./ImagesDataCollection.js")


const TranslationTextContainer = require("./TranslationTextContainer.js")


class DivTrashBin {
    constructor() {
        this.bin = document.getElementById("trashBin")
    }

    listen() {
        this.bin.ondrop = this.drop;
        this.bin.ondragover = this.allowDrop;
    }

    allowDrop(e) {
        e.preventDefault();
    }
      
    drop(e) {
        e.preventDefault();
        let textBoxID = e.dataTransfer.getData("text");
        console.log(textBoxID)
        ImagesDataCollection.getCurrentSaveData().deleteTextBox(textBoxID)
        document.getElementById(textBoxID+"container").remove()
        TranslationTextContainer.deleteAllText()
    }

    removeHTMLelement(element) {
        console.log(element)
        element.remove()
    }

}

module.exports = new DivTrashBin()
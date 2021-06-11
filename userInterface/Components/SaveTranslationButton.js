const ImagesDataCollection = require("./ImagesDataCollection.js")

// class SaveTranslationButton {
//     constructor() {
//         this.button = document.getElementById("saveTranslationButton")
//         this.clicked = false
//     }

//     listenToClickEvent() {
//         this.button.addEventListener("click", (e) => {
//             this.clicked = true
//             this.saveDataAsJSON()
//         })
//     }

//     saveDataAsJSON(){
//         let JSONsaveData =  ImagesDataCollection.getCurrentSaveData().convertToJSON()
//         let saveDataFileName = ImagesDataCollection.getCurrentSaveData().getFileName()
//         let a = document.createElement('a');
//         a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSONsaveData));
//         a.setAttribute('download', `${saveDataFileName}.json`);
//         a.click()
//       }
// }

class SaveAllTranslationButton {
    constructor() {
        this.button = document.getElementById("saveAllTranslationButton")
        this.clicked = false
    }

    listenToClickEvent() {
        this.button.addEventListener("click", (e) => {
            this.clicked = true
            this.saveDataAsJSON()
        })
    }

    saveDataAsJSON(){
        for (const image of ImagesDataCollection.getListOfImages()) {
            let JSONsaveData = image.convertToJSON()
            let saveDataFileName = ImagesDataCollection.getCurrentSaveData().getFileName()
            let a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSONsaveData));
            a.setAttribute('download', `${saveDataFileName}.json`);
            a.click()
        }

      }
}

class SaveTranslation {
    constructor() {}

    listen() {
        //new SaveTranslationButton().listenToClickEvent()
        new SaveAllTranslationButton().listenToClickEvent()
    }
}

module.exports = new SaveTranslation()
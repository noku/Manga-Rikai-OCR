const ImagesDataCollection = require("./ImagesDataCollection.js")

let extractedText = document.getElementById("extractedText")
let translatedText = document.getElementById("translatedText")


class TranslationTextContainer {
    constructor(receivedextractedText, receivedTranslatedText) {
        this.extractedText = receivedextractedText
        this.translatedText = receivedTranslatedText
    }

    listenToTextEdit() {
        this.saveExtractedTextAsTypedInRealTime()
        this.saveTranslatedTextAsTypedInRealTime()
    }

    saveExtractedTextAsTypedInRealTime() {
        this.extractedText.oninput = () => {
            let textboxID = this.extractedText.getAttribute("data-textboxid")
            let currentText = this.extractedText.innerHTML
            ImagesDataCollection.getCurrentSaveData().saveExtractedText(textboxID, currentText)
        }
    }

    saveTranslatedTextAsTypedInRealTime() {
        this.translatedText.oninput = () => {
            let textboxID = this.translatedText.getAttribute("data-textboxid")
            let currentText = this.translatedText.innerHTML
            ImagesDataCollection.getCurrentSaveData().saveTranslatedText(textboxID, currentText)
        }
    }

    displayWaitingMessage(waitMessage) { 
        this.extractedText.innerHTML = waitMessage
        this.translatedText.innerHTML = waitMessage
    }

    displayExtractedText(text) {
        this.extractedText.innerHTML = text
    }
    
    displayText(extracted, translated) {
        if (translated == "") {
            this.translatedText.innerHTML = "This text is hard, try again or move on"
            this.displayExtractedText("This text is hard, try again or move on")
        }
        else{
            this.translatedText.innerHTML = translated
            this.displayExtractedText(extracted) 
        }
    }

    setTextboxIDForEachTextSection(textboxID) {
        this.extractedText.setAttribute('data-textBoxid', textboxID);
        this.translatedText.setAttribute('data-textBoxid', textboxID);
    }


    removeTextboxIDattribute() {
        this.extractedText.removeAttribute("data-textBoxid");
        this.translatedText.removeAttribute("data-textBoxid");
    }

    deleteAllText() {
        this.removeTextboxIDattribute()
        this.translatedText.innerHTML = "Text Deleted"
        this.extractedText.innerHTML = "Text Deleted"
    }
}

module.exports = new TranslationTextContainer(extractedText, translatedText)
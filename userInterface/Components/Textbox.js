const ImagesDataCollection = require("./ImagesDataCollection.js")


const TranslationTextContainer = require("./TranslationTextContainer.js")


class RetranslateButton {
    constructor (outlineSpecArray) {
        this.dataArray = outlineSpecArray
        this.retranslateButton = document.createElement("button")
        this.retranslateButton.setAttribute('data-textBoxID', `${this.dataArray[0]}`);
        this.retranslateButton.className = "retranslateButton"
        this.retranslateButton.innerHTML = "Re-Translate"
        this.retranslateButton.style.position = `absolute`
        this.retranslateButton.style.left = `${this.dataArray[1] - 13}px`
        this.retranslateButton.style.top = `${this.dataArray[2] - 70}px`
    }

    initiate() {
        return this.retranslateButton
    }
}


class DivOutline {
    constructor (outlineSpecArray) {
        this.dataArray = outlineSpecArray
        this.texboxID = this.dataArray[0]

        this.DivReadModeOutline = document.createElement("div")
        this.DivReadModeOutline.style.position = `absolute`
        this.DivReadModeOutline.id = `${this.texboxID}`

        this.DivReadModeOutline.style.left = `${this.dataArray[1]}px`
        this.DivReadModeOutline.style.top = `${this.dataArray[2]}px`
        this.DivReadModeOutline.style.width = `${this.dataArray[3]}px`
        this.DivReadModeOutline.style.height = `${this.dataArray[4]}px`

        this.DivReadModeOutline.draggable = "true"
        this.DivReadModeOutline.ondragstart = this.drag


    }

    drag(e) {
        e.dataTransfer.setData("text", e.target.id);
    }

    animateHoveringOutlines() {
        this.DivReadModeOutline.addEventListener("mouseover", (e) => {
            let extracted = ImagesDataCollection.getCurrentSaveData().getExtractedText(`${this.texboxID}`)
            let translated = ImagesDataCollection.getCurrentSaveData().getTranslatedText(`${this.texboxID}`)
            TranslationTextContainer.displayText(extracted, translated)
            this.changeBackgroundColor("rgba(255, 0, 0, 0.5)")
        })
        this.DivReadModeOutline.addEventListener("mouseout", (e) => this.changeBackgroundColor("rgba(255, 0, 0, 0)"))
        return this.DivReadModeOutline
    }

    animateColorfulRectangle() {
        this.DivReadModeOutline.addEventListener("mouseover", (e) => {
            this.changeBorderColor("5px solid yellow")
            let extracted = ImagesDataCollection.getCurrentSaveData().getExtractedText(`${this.texboxID}`)
            let translated = ImagesDataCollection.getCurrentSaveData().getTranslatedText(`${this.texboxID}`)
            TranslationTextContainer.displayText(extracted, translated)
            TranslationTextContainer.setTextboxIDForEachTextSection(`${this.texboxID}`)
            TranslationTextContainer.listenToTextEdit()
        })
        
        this.changeBackgroundColor("rgba(255, 0, 0, 0.5)")

        this.DivReadModeOutline.addEventListener("mouseout", (e) => {
            this.changeBorderColor("rgba(0, 0, 0, 0)")
        })

        return this.DivReadModeOutline
    }

    changeBorderColor(color) {
        this.DivReadModeOutline.style.border = color
    }

    changeBackgroundColor(color) {
        this.DivReadModeOutline.style.backgroundColor = color
    }

}

class Textbox {
    constructor(textboxInfoArray) {
        this.dataArray = textboxInfoArray

        this.container = document.createElement("div")
        this.container.id = `${this.dataArray[0]}container`
        this.container.style.position = "relative"
    
        //this.container.appendChild(new RetranslateButton(this.dataArray).initiate())
    
    }

    returnHoveringTextbox() {
        let DivReadModeOutline = new DivOutline(this.dataArray).animateHoveringOutlines()
        this.container.appendChild(DivReadModeOutline)
        return this.container
    }

    returnColorfulTextbox() {
        let DivReadModeOutline = new DivOutline(this.dataArray).animateColorfulRectangle()
        this.container.appendChild(DivReadModeOutline)
        return this.container
    }

}

module.exports = Textbox

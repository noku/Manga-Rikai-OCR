const Textbox = require("./Textbox.js")
const ImageCanvas = require("./Canvas/ImageCanvas.js")

class OutLinesContainerDiv {
    constructor() {
        this.container = document.getElementById("outlinesContainer")
    }

    injectOutline(textOutlineElement) {
        this.container.appendChild(textOutlineElement)
    }

    injectAllReadModeOutlines(outlinesList) {
        outlinesList.forEach(outline => {
            this.injectOutline(new Textbox(outline).returnHoveringTextbox())
        });
    }

    injectAllEditModeOutlines(outlinesList) {
        outlinesList.forEach(outline => {
            this.injectOutline(new Textbox(outline).returnColorfulTextbox())
        });
    }

    injectAllOverlayModeOutlines(outlinesList) {
        outlinesList.forEach(outline => {
            this.injectOutline(new Textbox(outline).returnOverlayTextbox())
        });
    }

    removeAllPreviousOutlines() {
        this.container.innerHTML = ""
    }

    removeOutline(outlineID) {
        let outlineElement = document.getElementById(`${outlineID}container`) 
        this.container.removeChild(outlineElement)
    }

    showContainer() {
        this.container.style.display = "block"
    }

    resizeContainerToFitCanvas(width, height) {
        this.container.style.width = `${width}px`
        this.container.style.height = `${height}px`
    }
}  

module.exports = new OutLinesContainerDiv() 
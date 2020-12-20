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
        if (outlinesList.size != 0) {
            outlinesList.forEach(outline => {
                this.injectOutline(new Textbox(outline).returnHoveringTextbox())
            });
        }
        else (
            alert("You gotta create some text boxes first")
        )
    }

    injectAllEditModeOutlines(outlinesList) {
        if (outlinesList.size != 0) {
            outlinesList.forEach(outline => {
                this.injectOutline(new Textbox(outline).returnColorfulTextbox())
            });
        }
        else (
            alert("You gotta create some text boxes first")
        )
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

    resizeContainerToFitCanvas() {
        this.container.style.width = ImageCanvas.mainCanvas.width
        console.log("resizeContainerToFitCanvas")
        this.container.style.height = ImageCanvas.mainCanvas.height
    }
}  

module.exports = new OutLinesContainerDiv() 
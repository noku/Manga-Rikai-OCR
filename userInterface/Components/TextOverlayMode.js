const ImagesDataCollection = require("./ImagesDataCollection.js")

const OverlayCanvas = require("./Canvas/OverlayCanvas.js")
const ImageCanvas = require("./Canvas/ImageCanvas.js")

//const RectangleOutline = require("./RectangleOutline.js")

const OutLinesContainerDiv = require("./OutlinesContainerDiv.js")


class TextOverlayMode {
    constructor(OutLinesContainerDiv) {
        this.outLinesContainerDiv = OutLinesContainerDiv
        this.container = OutLinesContainerDiv.container
        this.button = document.getElementById("textOverlayMode")
    }


    
    async turnOn(e) {
        // let firstTextbox = ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes().keys().next().value
        // console.log("firstTextbox", firstTextbox)
        // await this.convertTextboxToImage(firstTextbox)
        // console.log("thisElement", document.querySelectorAll("#outlinesContainer div div")[1])

        this.turnOffButtonColor()
        let currentImageFile = ImagesDataCollection.listOfImagesData[ImagesDataCollection.currentImageData].imageFile
        ImageCanvas.hide()
        OverlayCanvas.show()
        await OverlayCanvas.displayImage(currentImageFile)
        this.fillRegionsWithWhite(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())
        await this.fillRegionsWithText(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())


        this.outLinesContainerDiv.showContainer()
        this.outLinesContainerDiv.removeAllPreviousOutlines()
        // this.outLinesContainerDiv.injectAllEditModeOutlines(ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())
    }

    saveAs(uri, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;
            //Firefox requires the link to be in the body
            document.body.appendChild(link);
            //simulate click
            link.click();
            //remove the link when done
            document.body.removeChild(link);
    
        } else {
            window.open(uri);
        }
    }

    // generateFakeElement(width, height, text, numberID=0) {
    //     let element = document.createElement("div");
    //     element.innerHTML = text;
    //     element.id = `testElement${numberID}`
    //     element.style.height = `${height}px`
    //     element.style.width = `${width}px`
    //     document.body.appendChild(element)
    //     console.log("generate")
    // }

    // async generateTextBox(x, y, width, height, text, numberID=0) {
    //     await this.generateFakeElement(width, height, text)

    //     await html2canvas(document.getElementById(`testElement${numberID}`)).then(async (canvas) => {
    //         let textImage = canvas.toDataURL("image/png") 
    //         OverlayCanvas.fillWithText(x, y, width, height, textImage)
    //         console.log("html2canvas", x, y, width, height)
    //         await document.querySelector(`#testElement${numberID}`).remove()
    //     })

    //     // await document.querySelector('#testElement').remove()
    // }

    generateFakeElement(width, height, text) {
        if (document.getElementById(`testElement`)) {
            console.log("element text", text)
            document.getElementById(`testElement`).innerHTML = text
            document.getElementById(`testElement`).style.height = `${height}px`
            document.getElementById(`testElement`).style.width = `${width}px`
            console.log('not generate')
        }
        else {
            let element = document.createElement("div");
            element.innerHTML = text;
            element.id = `testElement`
            element.style.fontFamily = "mangaFont"
            element.style.display = `flex`
            element.style.textAlign = "center"
            element.style.alignItems = `center`
            element.style.height = `${height}px`
            element.style.width = `${width}px`
            // element.style.border = `2px solid red`
            document.body.appendChild(element)
            console.log("generate")
        }
    }

    async generateTextBox(x, y, width, height, text) {
        await this.generateFakeElement(width, height, text)

        await html2canvas(document.getElementById(`testElement`)).then(async (canvas) => {
            let textImage = canvas.toDataURL("image/png") 
            OverlayCanvas.fillWithText(x, y, width, height, textImage)
        })

        // await document.querySelector(`#testElement`).remove()
    }

    async fillRegionsWithText(outlinesList) {
        for (const outline of outlinesList) {
            let x = outline[1][1]
            let y = outline[1][2]
            let width = outline[1][3]
            let height = outline[1][4]
            let text = outline[1][6]

            console.log("check text", text)

            await this.generateTextBox(x-10, y-20, width+20, height+20, text.toUpperCase())
        }
    }

    // async fillRegionsWithText(outlinesList) {
    //     let count = 0 
    //     outlinesList.forEach(async (outline) => {
    //         let x = outline[1]
    //         let y = outline[2]
    //         let width = outline[3]
    //         let height = outline[4]
    //         let text = outline[5]
    //         console.log("japanese text", text)

    //         console.log(count)

    //         await this.generateTextBox(x, y, width, height, text)
    //         // await this.generateFakeElement(width, height, text)

    //         // // let textImage = ""
    //         // await html2canvas(document.getElementById("testElement")).then((canvas) => {
    //         //     let textImage = canvas.toDataURL("image/png") 
    //         //     OverlayCanvas.fillWithText(x, y, width, height, textImage)
    //         //     console.log("html2canvas")
    //         // })

    //         // await document.querySelector('#testElement').remove()

    //         // OverlayCanvas.fillWithText(x, y, width, height, textImage)
    //         // document.querySelector('#testElement').remove()
    //     });
    // }

    fillRegionsWithWhite(outlinesList) {
        outlinesList.forEach(outline => {
            let x = outline[1]
            let y = outline[2]
            let width = outline[3]
            let height = outline[4]

            OverlayCanvas.fillWithWhiteColor(x, y, width, height)
        });
    }

    turnOffButtonColor() {
        this.button.disabled = true;
    }

}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = new TextOverlayMode(OutLinesContainerDiv)
const ImagesDataCollection = require("./ImagesDataCollection.js")

const ImageCanvas = require("./Canvas/ImageCanvas.js")

class exportFile {
    constructor (receivedImageSource, receivedListOfTextboxes) {
        this.listOfTextboxes = receivedListOfTextboxes
        this.imageSource = receivedImageSource 
        this.file = `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        
        #wholePage {
            position: absolute;
            top: 0;
        
            width: 100%;
            height: 250%;
        }
        
        img {
            position:absolute;
            top: 5%;
            left: 15%;
        }
        
        #outlinesContainer {
            position: absolute;
            top: 5%;
            left: 15%;
            opacity: 0.5;
        }
        
        #header {
            position: -webkit-sticky; /* Safari */
            position: sticky;
            top: 0;
            width: 100%;
            height: 3%;
            border-bottom: 3px solid black;
            background-color: white;
        }
        
        #translationTextContainer {
            position: absolute;
        
            text-align: center;
            width: 100%;
            height: 100%;
            display: flex;
        
        } 
        
        .textHolder {
            margin: 5px;
            height: 48%;
            width: 55%;
        }
        
        .text {
            margin: 5px;
            background-color: white;
        }
        
        #trashBin {
            float: right;
            height: 100%;
            width: 5%;
        }
        
        #filler{
            width:5%;
            height:100%;
        }
        </style>
        </head>
        <body>
        
        
        <div id="wholePage">
        
            <img id="image">
        
            <div id="outlinesContainer"></div>
        
            <div id="header">
                <div id="translationTextContainer">
                    <div id="extractedTextHolder" class="textHolder">
                        <h3 id="extractedText" class="text">Japanese</h3>
                    </div>
            
                    <div id="filler"></div>
        
                    <div id="translatedTextHolder" class="textHolder">
                        <h3 id="translatedText" class="text">Translation</h3>
                    </div>
                </div>
            </div>
        
        </div>
        
        
        <script>
        
        class TranslationTextContainer {
            constructor() {
                this.extractedText = document.getElementById("extractedText")
                this.translatedText = document.getElementById("translatedText")
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
        
        }
        
        class DivOutline {
            constructor (outlineSpecArray) {
                this.dataArray = outlineSpecArray
                this.texboxID = this.dataArray[0]
        
                this.DivReadModeOutline = document.createElement("div")
                this.DivReadModeOutline.style.position = "absolute"
                this.DivReadModeOutline.id = this.texboxID.toString()
        
                this.DivReadModeOutline.style.left = this.dataArray[1].toString() + "px"
                this.DivReadModeOutline.style.top = this.dataArray[2].toString() + "px"
                this.DivReadModeOutline.style.width = this.dataArray[3].toString() + "px"
                this.DivReadModeOutline.style.height = this.dataArray[4].toString() + "px"
        
                this.extractedText = this.dataArray[5]
                this.translatedText = this.dataArray[6]
        
                this.DivReadModeOutline.draggable = "true"
                this.DivReadModeOutline.ondragstart = this.drag
        
                this.TranslationTextContainer = new TranslationTextContainer()
            }
        
            drag(e) {
                e.dataTransfer.setData("text", e.target.id);
            }
        
            animateHoveringOutlines() {
                this.DivReadModeOutline.addEventListener("mouseover", (e) => {
                    this.TranslationTextContainer.displayText(this.extractedText, this.translatedText)
                    this.changeBackgroundColor("rgba(255, 0, 0, 0.5)")
                })
                this.DivReadModeOutline.addEventListener("mouseout", (e) => this.changeBackgroundColor("rgba(255, 0, 0, 0)"))
                return this.DivReadModeOutline
            }
        
            animateColorfulRectangle() {
                this.DivReadModeOutline.addEventListener("mouseover", (e) => {
                    this.changeBorderColor("5px solid yellow")
                    this.TranslationTextContainer.displayText(this.extractedText, this.translatedText)
                    this.TranslationTextContainer.setTextboxIDForEachTextSection(this.texboxID.toString())
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
                this.container.id = this.dataArray[0].toString() + "container"
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
        
        }  
        
        let listOfTextboxes = ${this.listOfTextboxes}
        
        let imageSource = "${this.imageSource}"
        
        let image = document.getElementById("image")
        
        image.src = imageSource
        
        
        let outlinesContainer = new OutLinesContainerDiv()
        
        outlinesContainer.injectAllEditModeOutlines(Object.values(listOfTextboxes))
        
        </script>
        </body>
        </html>
        
        `
    }
    generateSelf() {
        return this.file
    }
}

class exportButton {
    constructor() {
        this.button = document.getElementById("exportButton")
    }

    listen() {
        this.button.addEventListener("click", (e) => {
            this.exportToHTML()
        })
    }

    exportToHTML(){
        let currentImageFile = ImageCanvas.mainCanvas.toDataURL()  
        let JSONlistOfTextboxes =  ImagesDataCollection.getCurrentSaveData().convertToJSON()

        let file = new exportFile(currentImageFile, JSONlistOfTextboxes).generateSelf()

        let a = document.createElement('a');
        a.setAttribute('href', 'data:text/html;charset=utf-8,'+encodeURIComponent(file));
        a.setAttribute('download', `test.html`);
        a.click()
    }

}

module.exports = new exportButton()
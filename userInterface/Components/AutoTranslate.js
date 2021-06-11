const ImagesDataCollection = require("./ImagesDataCollection.js")
const ImagesCollectionHandle = require("./ImagesCollectionHandle.js")

const ImageCanvas = require("./Canvas/ImageCanvas.js")
const ServerConnection = require("./ServerConnection.js")

const ModeSwitch = require("./ModeSwitch.js")

const RectangleOutline = require("./RectangleOutline.js")
const TranslationTextContainer = require("./TranslationTextContainer.js")

const OutLinesContainerDiv = require("./OutlinesContainerDiv.js")

class DetectTextboxesButton {
    constructor() {
        this.button = document.getElementById("detectTextboxesButton")
    }

    async start(){
        TranslationTextContainer.displayWaitingMessage("Detecting all textboxes .... result should be out around 3-5 seconds")
        const image = ImageCanvas.mainCanvas.toDataURL()  
        const arrayOfCoordinatesArray = await ServerConnection.requestWholeImageTranslation(image)
        await ImagesDataCollection.getCurrentSaveData().convertAndAddAllCoordinatesArraysFromServer(arrayOfCoordinatesArray)
        await ModeSwitch.editModeActivate()
    }
}

class ExtractText {
    constructor() {}

    async start(){
        TranslationTextContainer.displayWaitingMessage("Extracting text ...")
        await this.extractTextInAllTextboxes()
        TranslationTextContainer.displayText("All text extracted", `All text extracted`)
    }

    async extractTextInAllTextboxes() {
        const currentSaveData = ImagesDataCollection.getCurrentSaveData()
        const listOfTextboxes = ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes()

        const totalNumberOfTextboxes = ImagesDataCollection.getCurrentSaveData().getNumberOfTextBoxes()
        let currentTextboxNumber = 0

        for (const textbox of listOfTextboxes.entries()) {
            currentTextboxNumber++
            let textboxInfoArray = textbox[1]
            const textboxID = textboxInfoArray[0]

            const extractedTextFromServer = await this.extractTextInTextbox(textboxInfoArray, currentTextboxNumber, totalNumberOfTextboxes)
            if (extractedTextFromServer.length < 4) {
                currentSaveData.deleteTextBox(textboxID)
                OutLinesContainerDiv.removeOutline(textboxID)
            }
            else {
                TranslationTextContainer.displayText(extractedTextFromServer, `${currentTextboxNumber}/${totalNumberOfTextboxes}`)
            }
        }
    }

    async extractTextInTextbox(textboxInfoArray, progressNumber, totalNumberOfTextboxes) {
        const textboxID = textboxInfoArray[0]
        const x = textboxInfoArray[1]
        const y = textboxInfoArray[2]
        const width = textboxInfoArray[3]
        const height = textboxInfoArray[4]

        const croppedImage = RectangleOutline.cropToImage(x, y, width, height)

        const extractedTextFromServer = await ServerConnection.extractTextFromImage(croppedImage)
        ImagesDataCollection.getCurrentSaveData().saveExtractedText(textboxID, extractedTextFromServer)
        
        TranslationTextContainer.displayText(extractedTextFromServer, `${progressNumber}/${totalNumberOfTextboxes}`)

        return extractedTextFromServer
    }

}

class TranslateAllText {
    constructor() {
        this.popupPageContainer = document.getElementById("popupPageContainer");
        this.newLine = "\r\n";
        this.blankLine = this.newLine + this.newLine
    }

    listen() {
        // document.getElementById("translateTextButton").onclick = () => {
        //     this.resetContainer()
        //     this.showPopupContainer()
        //     this.disableTranslateAllImagesButtons()
        // }

        // document.getElementById("getSaveData").onclick = () => {
        //     this.displayAllExtractedText(ImagesDataCollection.getCurrentSaveData())
        // }

        // document.getElementById("saveTranslation").onclick = () => {
        //     this.convertAndSaveTranslation(ImagesDataCollection.getCurrentSaveData(), this.convertTranslationTextToArray())
        //     alert("Saving Completed")
        // }


        document.getElementById("translateAllTextButton").onclick = async () => {
            this.resetContainer()
            this.showPopupContainer()
            this.disableTranslateOneImageButtons()
        }

        document.getElementById("getAllSaveData").onclick = () => {
            this.displayAllImagesExtractedText()
        }

        document.getElementById("saveAllTranslation").onclick = () => {
            this.saveAllTranslationToAppropriateImageData()
            alert("Saving Completed")
        }

        document.getElementById("closeButton").onclick = () => {
            this.hidePopupContainer()
        }
    

    }

    resetContainer() {
        this.resetSaveDataDisplay()
        this.resetTranslationDisplay()
        this.enableAllButtons()
    }

    enableAllButtons() {
        document.getElementById("getSaveData").disabled = false
        document.getElementById("saveTranslation").disabled = false
        document.getElementById("getAllSaveData").disabled = false
        document.getElementById("saveAllTranslation").disabled = false
    }

    disableTranslateOneImageButtons() {
        document.getElementById("getSaveData").disabled = true
        document.getElementById("saveTranslation").disabled = true
    }

    disableTranslateAllImagesButtons() {
        document.getElementById("getAllSaveData").disabled = true
        document.getElementById("saveAllTranslation").disabled = true
    }

    returnAllExtractedTextFromSaveData(imageData) {
        let arrayOfAllExtractedText = []
    
        let currentSaveData = imageData.getListOfTextBoxes()
        console.log(currentSaveData)
    
        for (const textbox of currentSaveData) {
            let id = textbox[0]
            let extractedText = textbox[1][5]
            // arrayOfAllExtractedText.push([`${id}:${extractedText}`])
            arrayOfAllExtractedText.push([`${extractedText}`])
        }

        return arrayOfAllExtractedText
    }

    displayAllExtractedText(imageData) {
        let arrayOfAllExtractedText = this.returnAllExtractedTextFromSaveData(imageData)
        
        for (const extractText of arrayOfAllExtractedText) {
            document.getElementById("displaySaveData").value += extractText + this.blankLine
    
        }
    }

    async displayAllImagesExtractedText() {
        for (const image of ImagesDataCollection.getListOfImages()) {
            await this.displayAllExtractedText(image)
            document.getElementById("displaySaveData").value += "#" + this.blankLine
        }
    }

    convertAndSaveTranslation(imageData, translationArray) {
        if (translationArray.length !== imageData.getNumberOfTextBoxes()) {
            alert("Number of translation doesn't match number of text boxes")
        }
        else {
            let index = 0
            for (const textbox of imageData.getListOfTextBoxes()) {
                let translateText = translationArray[index]
                console.log("textbox", textbox)
                imageData.saveTranslatedText(textbox[0], translateText)
                index++
            }

            // for (const stringElement of translationArray) {
            //     let textboxID = stringElement.split(":",2)[0]
            //     let translateText = stringElement.split(":",2)[1]
            //     if (imageData.checkIfTextboxExists(`${textboxID}`)) {
            //         imageData.saveTranslatedText(`${textboxID}`, translateText)
            //     }
            // }
        }
    }

    convertTranslationTextToArray() {
        let textArrayWithNoEmptyElements = []
        let translationText = document.getElementById("displayTranslation").value            
        let linesArray = translationText.replace(/\r\n/g,"\n").split("\n");
        textArrayWithNoEmptyElements = linesArray.filter(Boolean);
        return textArrayWithNoEmptyElements
    }

    saveAllTranslationToAppropriateImageData() {
        let allImagesTranslationArray = this.separateTranslationOfImages(this.convertTranslationTextToArray())
        let i = 0
        for (const image of ImagesDataCollection.getListOfImages()) {
            this.convertAndSaveTranslation(image, allImagesTranslationArray[i])
            i++
        }
    }

    separateTranslationOfImages(translationLinesArray) {
        let allImagesTranslationArray = []
        let allTranslationOfAnImageArray = []
        for (const line of translationLinesArray) {
            if (line == "#") {
                allImagesTranslationArray.push(allTranslationOfAnImageArray)
                allTranslationOfAnImageArray = []
            }
            else {
                allTranslationOfAnImageArray.push(line)
            }
        }
        
        console.log(allImagesTranslationArray)
        return allImagesTranslationArray
    }


    resetSaveDataDisplay() {
        document.getElementById("displaySaveData").value = ""
    }

    resetTranslationDisplay() {
        document.getElementById("displayTranslation").value = ""
    }

    showPopupContainer() {
        this.popupPageContainer.style.display = "block";
    }

    hidePopupContainer() {
        this.popupPageContainer.style.display = "none";
    }

}

class AutoTranslate {
    constructor() {
        this.detectTextboxes = new DetectTextboxesButton()
        this.extractText = new ExtractText()
        this.translateAllText = new TranslateAllText()
        this.detextAndExtractText = async () => {
            await this.detectTextboxes.start()
            await this.extractText.start()
        }
        this.detectAndShowAllTextboxes = async () => {
            await this.detextAndExtractText()
            await ImagesCollectionHandle.selectNextImage()
            //await ImagesDataCollection.initiateNextImage()
        }
    }

    async detectAllTextboxes() {
        let time = 0

        let startTextDetection = async () => {
            return new Promise(resolve => setTimeout(() => resolve(this.detectAndShowAllTextboxes()), time*250));
        }

        await ImagesDataCollection.initiateFirstImage()

        for (const image of ImagesDataCollection.getListOfImages()) {
            time++
            await startTextDetection()
        }

        //ModeSwitch.editModeActivate()

    }

    listen() {
        // this.detectTextboxes.button.addEventListener("click", async (e) => {
        //     this.detextAndExtractText()
        // })

        this.translateAllText.listen()

        document.getElementById("detectAllTextboxesButton").onclick = async () => {
            this.detectAllTextboxes()
        }


    }

}

module.exports = new AutoTranslate()
const OverlayCanvas = require("./Canvas/OverlayCanvas.js")
const ImageCanvas = require("./Canvas/ImageCanvas.js")

class ImageSaveData {
    constructor(receivedImageFile, receivedFileName) {
        //this.textBoxArray = []
        this.listOfTextBoxes = new Map()
        this.imageSizeArray = []
        this.imageFile = receivedImageFile
        this.fileName = receivedFileName
    }

    checkIfTextboxExists(textboxID) {
        return this.listOfTextBoxes.has(textboxID)
    }

    getImageFile() {
        return this.imageFile
    }

    setFileName(name) {
        this.fileName = name
    }

    getFileName() {
        return this.fileName
    }

    addTextBoxInfo(infoArray) {
        let textboxID = `${infoArray[0]}${infoArray[1]}`
        infoArray.unshift(textboxID)
        this.listOfTextBoxes.set(textboxID, infoArray)
    }

    getTextbox(textboxID) {
        return this.listOfTextBoxes.get(textboxID)
    }

    getNumberOfTextBoxes() {
        return this.listOfTextBoxes.size
    }

    getExtractedText(textboxID) {
        return this.listOfTextBoxes.get(textboxID)[5]
    }

    saveExtractedText(textboxID, editedText) {
        console.log(textboxID, editedText)

        let currentTextboxArray = this.getTextbox(textboxID)
        currentTextboxArray[5] = editedText
        this.listOfTextBoxes.set(textboxID, currentTextboxArray)
    }

    saveTranslatedText(textboxID, editedText) {
        console.log(typeof textboxID)
        console.log(this.getListOfTextBoxes())

        let currentTextboxArray = this.getTextbox(textboxID)
        currentTextboxArray[6] = editedText
        this.listOfTextBoxes.set(textboxID, currentTextboxArray)
    }

    getTranslatedText(textboxID) {
        return this.listOfTextBoxes.get(textboxID)[6]
    }

    convertToJSON() {
        return JSON.stringify(Object.fromEntries(this.getListOfTextBoxes().entries()))
    }

    getListOfTextBoxes() {
        return this.listOfTextBoxes
    }

    deleteTextBox(textboxID) {
        this.listOfTextBoxes.delete(textboxID)
    }

    reset() {
        this.listOfTextBoxes.clear()
    }

    replaceWithNewData(newData) {
        this.reset()
        this.listOfTextBoxes = newData
    }

    loadPreviousSaveData(previousData) {
        let convertedSaveData = new Map(Object.entries(JSON.parse(previousData)))
        this.replaceWithNewData(convertedSaveData)
    }

    convertAndAddAllCoordinatesArraysFromServer(thisArrayOfCoordinatesArray) {
        
        let minimumWidth = this.imageSizeArray[0]/35 //60 to preserve leftover words
        console.log("image Size here",this.returnImageSize())
        this.reset()

        thisArrayOfCoordinatesArray.forEach(coordinatesArray => {            
            let currentWidth = coordinatesArray[2]
            let currentHeight = coordinatesArray[3]
            let textboxID = `${coordinatesArray[0]}${coordinatesArray[1]}`

            if (currentWidth > currentHeight || currentWidth < minimumWidth) {
                console.log("this is not a text box")
            }
            else {
                let newX = coordinatesArray[0] 
                let newY = coordinatesArray[1] 
                let newWidth = coordinatesArray[2] 
                let newHeight = coordinatesArray[3] 

                // let newX = coordinatesArray[0] - 10
                // let newY = coordinatesArray[1] - 10
                // let newWidth = coordinatesArray[2] + 15
                // let newHeight = coordinatesArray[3] + 15
  
                let emptyText = "No text yet"
                let convertedTextboxArray = [textboxID, newX, newY, newWidth, newHeight, emptyText, emptyText]
    
                this.listOfTextBoxes.set(textboxID, convertedTextboxArray)
            }

        });

        console.log(this.getListOfTextBoxes())

    }
    
    processCoordinateArray(thisArrayOfCoordinatesArray) {
        thisArrayOfCoordinatesArray.forEach(coordinatesArray => {
            let textboxID = `${coordinatesArray[0]}${coordinatesArray[1]}`
            coordinatesArray.unshift(textboxID)
            coordinatesArray.push("", "")
            console.log(coordinatesArray)
        });
    }

    saveImageSize(width, height) {
        console.log("saveImageAgain")
        this.imageSizeArray = []
        this.imageSizeArray.push(width, height)
    }

    returnImageSize() {
        return this.imageSizeArray
    }
}


class ImagesDataCollection {
    constructor() {
        this.currentSaveData = new ImageSaveData()
        this.listOfImagesData = []
        this.currentImageData = 0
    }

    getAllTextboxesDataFromAnImage() {
        return this.getCurrentSaveData().getListOfTextBoxes()
    }

    initiateAndSaveAllNewImagesData(imagesCollection) {
        console.log("imageCollection", imagesCollection)
        this.reset()
        let i = imagesCollection.length - 1

        for (const image of imagesCollection) {
            let imageObj = new Image();
            let URLObj = window.URL || window.webkitURL;
            let imageFile = URLObj.createObjectURL(image);
            let imageName = image.name.split('.')[0];

            console.log("this.listOfImagesData", this.listOfImagesData)
            imageObj.src = imageFile
            this.listOfImagesData.push(new ImageSaveData(imageFile, imageName))

            imageObj.onload = () => {
                this.listOfImagesData[i].saveImageSize(imageObj.width, imageObj.height)
                console.log("this image", i, imageObj.width, imageObj.height)
                i--
            };
        }
        
        this.initiateFirstImage()
        
        console.log(this.listOfImagesData)
    }

    initiateAndSaveImageData(imageData) {
        console.log("pasteImage", imageData)
        this.reset()

        let imageObj = new Image();
        let URLObj = window.URL || window.webkitURL;
        let imageFile = URLObj.createObjectURL(imageData);
        this.listOfImagesData.push(new ImageSaveData(imageFile, "noName"))
        imageObj.src = imageFile
        imageObj.onload =() => {
            this.listOfImagesData[0].saveImageSize(imageObj.width, imageObj.height)
        };

        //this.showID()
        this.initiateFirstImage()
        console.log(this.listOfImagesData)

    }

    getCurrentSaveData() {
        return this.listOfImagesData[this.currentImageData]
    }

    reset() {
        this.currentImageData = 0 
        this.listOfImagesData = []
        this.resetID()
    }
    

    displayImage(imageFile) {
        let imageObj = new Image();
        imageObj.src = imageFile;
        imageObj.onload = () => {
            ImageCanvas.resizeCanvas(imageObj.width, imageObj.height)
            OverlayCanvas.resizeCanvas(imageObj.width, imageObj.height)
            ImageCanvas.mainContext.drawImage(imageObj, 0, 0, ImageCanvas.mainCanvas.width, ImageCanvas.mainCanvas.height);
        };
    }

    initiateCurrentImage() {
        let currentImageFile = this.listOfImagesData[this.currentImageData].imageFile
        this.displayImage(currentImageFile)
        this.showID()
    }

    initiateFirstImage() {
        this.currentImageData = 0
        let currentImageFile = this.listOfImagesData[this.currentImageData].imageFile
        this.displayImage(currentImageFile)
        this.showID()
    }

    initiateLastImage() {
        this.currentImageData = this.listOfImagesData.length-1
        let currentImageFile = this.listOfImagesData[this.currentImageData].imageFile
        this.displayImage(currentImageFile)
        this.showID()
    }

    initiateNextImage() {
        console.log("next Image")
        let nextImage = this.currentImageData + 1
        if (this.checkIfImageExist(nextImage)) {
            this.currentImageData = nextImage
            this.initiateCurrentImage()
        }
        else {
            this.initiateFirstImage()
        }
    }

    initiatePreviousImage() {
        let previousImage = this.currentImageData - 1
        if (this.checkIfImageExist(previousImage)) {
            this.currentImageData = previousImage
            this.initiateCurrentImage()
        }
        else {
            this.initiateLastImage()
        }
    }

    showID() {
        document.getElementById("ImageID").innerHTML = `ID: ${this.currentImageData+1}/${this.listOfImagesData.length}`
    }

    resetID() {
        document.getElementById("ImageID").innerHTML = ``
    }

    getListOfImages() {
        return this.listOfImagesData
    }

    saveImagesToList(Image) {
        this.listOfImagesData.push(Image)
    }

    checkIfImageExist(Image) {
        return this.listOfImagesData[Image]
    }
}

module.exports = new ImagesDataCollection()

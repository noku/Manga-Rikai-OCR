const ImagesDataCollection = require("./ImagesDataCollection.js")

const ImageCanvas = require("./Canvas/ImageCanvas.js")

class exportTextRemovedButton {
    constructor() {
        this.button = document.getElementById("exportTextRemovedButton")
    }

    listen() {
        this.button.addEventListener("click", (e) => {
            this.activate()
        })
    }

    activate(){
        this.downloadImage()

        // let currentImageFile = ImageCanvas.mainCanvas.toDataURL()  
        // let JSONlistOfTextboxes =  ImagesDataCollection.getCurrentSaveData().convertToJSON()

        // let file = new exportFile(currentImageFile, JSONlistOfTextboxes).generateSelf()

        // let a = document.createElement('a');
        // a.setAttribute('href', 'data:text/html;charset=utf-8,'+encodeURIComponent(file));
        // a.setAttribute('download', `test.html`);
        // a.click()
    }

    async downloadImage() {
        let a = document.createElement('a');
        let imageFile = await this.exportImage(ImagesDataCollection.getCurrentSaveData().imageFile)
        //let image = imageFile.replace("image/png", "image/octet-stream");
        a.setAttribute("href", imageFile);
        a.setAttribute('download', `fileName.png`);
        a.click()
    }

    async exportImage(imageFile){
        const temporaryCanvas=document.createElement('canvas');
        const temporaryContext=temporaryCanvas.getContext('2d');

        let imageObj = new Image();
        let URLObj = window.URL || window.webkitURL;
        imageObj.src = imageFile

        await imageObj.decode()

        temporaryCanvas.width = imageObj.width
        temporaryCanvas.height = imageObj.height

        temporaryContext.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height)

        this.fillRegionsWithWhite(temporaryContext, ImagesDataCollection.getCurrentSaveData().getListOfTextBoxes())

        return temporaryCanvas.toDataURL("image/png");
    }

    fillRegionsWithWhite(thisCanvas, outlinesList) {
        outlinesList.forEach(outline => {
            let x = outline[1]
            let y = outline[2]
            let width = outline[3]
            let height = outline[4]

            this.fillWithWhiteColor(thisCanvas, x, y, width, height)
        });
    }

    fillWithWhiteColor(thisCanvas, pointX,pointY,cropWidth,cropHeight) {
        thisCanvas.clearRect(pointX,pointY,cropWidth,cropHeight);
        thisCanvas.fillStyle = "white";
        thisCanvas.fillRect(pointX, pointY, cropWidth, cropHeight);
    }
    


}

module.exports = new exportTextRemovedButton()
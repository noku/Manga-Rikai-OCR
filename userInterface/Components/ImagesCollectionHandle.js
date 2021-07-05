const ImagesDataCollection = require("./ImagesDataCollection.js")

const ModeSwitch = require("./ModeSwitch.js")

class ImageCollectionHandle {
    constructor() {}

    listen() {
        this.listenForNextImage()
        this.listenForPreviousImage()
    }

    listenForNextImage() {
        document.getElementById("nextButton").onclick = () => {
            this.selectNextImage()
        }
    }

    selectNextImage() {
        ImagesDataCollection.initiateNextImage()
    }

    listenForPreviousImage() {
        document.getElementById("backButton").onclick = () => {
            this.selectPreviousImage()
        }
    }

    selectPreviousImage() {
        ImagesDataCollection.initiatePreviousImage()
    }

}

module.exports = new ImageCollectionHandle()
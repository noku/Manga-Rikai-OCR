const Canvas = require("./Canvas.js")

var imgCanvas = document.getElementById("imageCanvas")
var imageCtx = imgCanvas.getContext('2d')

class ImageCanvas extends Canvas {
    constructor(receivedCanvas, receivedContext) {
        super(receivedCanvas, receivedContext)
    }
}

module.exports = new ImageCanvas(imgCanvas, imageCtx)
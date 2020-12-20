const Canvas = require("./Canvas.js")

var drawingCanvas = document.getElementById("overlayCanvas")
var overlayCtx = drawingCanvas.getContext("2d")

class OverlayCanvas extends Canvas {
    constructor(receivedCanvas, receivedContext) {
        super(receivedCanvas, receivedContext)
    }
}

module.exports = new OverlayCanvas(drawingCanvas, overlayCtx)
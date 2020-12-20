class Canvas {
    constructor(receivedCanvas, receivedContext) {
        this.mainCanvas = receivedCanvas
        this.mainContext = receivedContext
    }

    resizeCanvas(width, height) {
        this.mainCanvas.width = width
        this.mainCanvas.height = height

        this.mainCanvas.style.width = width
        this.mainCanvas.style.height = height
    
    }
}

module.exports = Canvas
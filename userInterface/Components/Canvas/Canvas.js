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

    hide() {
        this.mainCanvas.style.display = "none"
    }

    show() {
        this.mainCanvas.style.display = "block"
    }

    fillCanvasWithColor(color) {
        this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainContext.fillStyle = color;
        this.mainContext.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    }

    setCanvasBorder(border) {
        this.mainCanvas.style.border = border;
    }
}

module.exports = Canvas
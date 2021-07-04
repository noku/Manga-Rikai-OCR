class Canvas {
    constructor(receivedCanvas, receivedContext) {
        this.mainCanvas = receivedCanvas
        this.mainContext = receivedContext
    }

    resizeCanvasFromImage(imageObj) {
        let reservedSpacePercentage = 0.18 // control panel + right side
        let availableWidth = window.outerWidth - (window.outerWidth * reservedSpacePercentage)

        let imageRatio = imageObj.height / imageObj.width;
        let width = Math.min(availableWidth, imageObj.width)
        let height = width * imageRatio;

        this.resizeCanvas(width, height)
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

class ServerConnection {
    constructor() {
        this.server = 'http://localhost:8575/'
    }

    async requestImageTranslation(imageData) {
        const response = await fetch(this.server, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({imageFile: imageData, message: "translate cropped image"})
        })
        
        const textData = await response.json()

        return textData
    }

    async extractTextFromImage(imageData) {
        const response = await fetch(this.server, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({imageFile: imageData, message: "extract text in cropped image"})
        })
        
        const textData = await response.json()

        return textData
    }

    async requestWholeImageTranslation(imageData) {
        const response = await fetch(this.server, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({imageFile: imageData, message: "detect all textboxes"})
        })
        
        const textData = await response.json()

        return textData
    }


}

module.exports = new ServerConnection()
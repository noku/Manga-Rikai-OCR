
class ServerConnection {
    constructor() {
        this.server = 'http://localhost:8575/'
        this.pythonServer = 'http://localhost:7575/'
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

    async closeEverything() {
        this.closeTranslationAggregator()

        await delay(500)
        
        const response = await fetch(this.server, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: "no content", message: "close everything"})
        })
        
        const textData = await response.json()

        return textData
    }

    // async closeEverything() {
    //     fetch(this.server, {
    //         method: 'post',
    //         body:    JSON.stringify({content: "no content", message: "close everything"}),
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    // }

    async closeTranslationAggregator() {
        const response = await fetch(this.server, {
            method: 'post',
            body:    JSON.stringify({content: "no content", message: "close translation aggregator"}),
            headers: { 'Content-Type': 'application/json' },
        })

        const textData = await response.json()

        return textData
    }

    async closePythonServer() {
        await fetch(this.pythonServer, {
            method: 'post',
            body:    JSON.stringify({content: "no content", message: "close server"}),
            headers: { 'Content-Type': 'application/json' },
        })
    }

}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = new ServerConnection()
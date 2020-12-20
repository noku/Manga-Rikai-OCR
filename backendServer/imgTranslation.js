let requestBingTranslation = require("./requestBingTranslation.js")
let imgToText = require("./imgToText.js")

module.exports =  async function translateTextInImage(imageFile) {
    let jpText = await imgToText(imageFile)
    let englishText = ""
    if (jpText == "") {
        englishText = ""
    }
    else {
        englishText = await Promise.resolve(requestBingTranslation("ja", jpText, "en")).then(result => {return result})
    }
    return {extracted:jpText, translated:englishText}
}


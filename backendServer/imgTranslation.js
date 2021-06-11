const configFile = require("../User-Settings.json")
const OCRlanguage = configFile["OCR-language"]
const translationlanguage = configFile["Translation-Language"]

let requestBingTranslation = require("./requestBingTranslation.js")
let imgToText = require("./imgToText.js")

module.exports =  async function translateTextInImage(imageFile) {
    let jpText = await imgToText(imageFile)
    let englishText = ""
    if (jpText == "") {
        englishText = ""
    }
    else {
        englishText = await Promise.resolve(requestBingTranslation(OCRlanguage["Bing-Translation-Code"], jpText, translationlanguage["Bing-Translation-Code"])).then(result => {return result})
    }
    return {extracted:jpText, translated:englishText}
}


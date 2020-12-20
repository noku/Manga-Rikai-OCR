 const tesseract = require("./node-tesseract-ocr")

module.exports =  async function (imageFile) {
    const config = {
      //lang: "jpn_vert+jpn+chi_tra_vert",
      lang: "jpn_vert",
      oem: 1,
      psm: 5,
    }

    try{
      text = await tesseract.recognize(imageFile, config)
    }
    catch(error){
      console.log(error.message)
    }

    const jpTextWithNoSpace = text.replace(/\s/g, '')
    return jpTextWithNoSpace
}



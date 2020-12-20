const fs = require('fs') 

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const open = require('open');
const cors = require('cors');
const base64Img = require('base64-img');

const portNumber = 8575

const translateTextInImage = require("./imgTranslation.js")
const requestAllTextBoxes = require("./requestAllTextboxes.js")
const imgToText = require("./imgToText.js")

app.use(cors())
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

// async function openIndexHTML() {
//   await open('../Front-end/index.html', {"wait": true });
// }
// openIndexHTML()

function translateCroppedImage(imageFile, res) {
    base64Img.img(imageFile, '.', 'croppedImage', function(err, filepath) {});
    Promise.resolve(translateTextInImage('croppedImage.png'))
    .then(result => {
      console.log(result)
      res.send(JSON.stringify(result))
    })
}

function detectAllTextboxes(imageFile, res) {
    base64Img.img(imageFile, '.', 'wholeImage', function(err, filepath) {});
    Promise.resolve(requestAllTextBoxes()).then(result => {
      console.log(result)
      res.send(JSON.stringify(result))
    })
}

async function extractTextFromImage(imageFile, res) {
    base64Img.img(imageFile, '.', 'croppedImage', function(err, filepath) {});
    Promise.resolve(imgToText('croppedImage.png'))
    .then(result => {
      console.log(result)
      res.send(JSON.stringify(result))
    })
}

app.post('/', function (req, res) {
    const body = req.body;
    if(body.message == "translate cropped image") {
        translateCroppedImage(body.imageFile, res)
    }

    if(body.message == "detect all textboxes") {
        detectAllTextboxes(body.imageFile, res)
    }

    if(body.message == "extract text in cropped image") {
        extractTextFromImage(body.imageFile, res)
    }
});

app.listen(portNumber, function (err) {
  if (err) {
    throw err;
  }

  console.log(`Server started on port ${portNumber}`);
});
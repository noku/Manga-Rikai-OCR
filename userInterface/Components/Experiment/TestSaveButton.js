const template = document.createElement('template');
 
template.innerHTML = `
  <style>
    button {
        margin: 5px;
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
  </style>
 
  <button id="testImageButton">Save image</button>
`

const ImageCanvas = require("./ImageCanvas.js")

class TestSaveButton extends HTMLElement {
    constructor() {
        super();
    
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.button = this._shadowRoot.getElementById('testImageButton');
        this.imageCanvas = document.getElementById("imageCanvas")


        this.listenToClickEvent()
    }

    listenToClickEvent() {
        this.button.addEventListener("click", (e) => {
            this.start(e)
        })
    }

    consoleLogSmt() {
        console.log("Hello World")
    }

    start(){
        const image = this.imageCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        this.downloadImage(image)
        //window.location.href = image; // it will save locally
        //return canvas1.toDataURL();
    }

    // Save | Download image
    downloadImage(data, filename = 'untitled.png') {
        var a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }
}

window.customElements.define('my-button', TestSaveButton)


// const SaveImageButton = require("./Components/SaveImageButton.js") Trial
// SaveImageButton.listenToClickEvent()

const LoadImage = require("./Components/Load Image/LoadImage.js")
const LoadTranslationData = require("./Components/LoadTranslationData.js")

const SaveTranslation = require("./Components/SaveTranslationButton.js")
const AutoTranslate = require("./Components/AutoTranslate.js")

const ModeSwitch = require("./Components/ModeSwitch.js")

const AskUserToSaveBeforeLeave = require("./Components/AskUserToSaveBeforeLeave.js")

const DivTrashBin = require("./Components/DivTrashBin.js")

const ImagesCollectionHandle = require("./Components/ImagesCollectionHandle.js")

const exportButton = require("./Components/exportButton.js")
const exportTextRemovedButton = require("./Components/exportTextRemovedButton.js")

const ServerConnection = require("./Components/ServerConnection.js")

LoadImage.listen()

ModeSwitch.listen()

DivTrashBin.listen()

SaveTranslation.listen()

AutoTranslate.listen()

LoadTranslationData.listenToTranslationFileUploadEvent()

AskUserToSaveBeforeLeave.listen()


ImagesCollectionHandle.listen()

exportButton.listen()
exportTextRemovedButton.listen()

window.addEventListener('unload', async (event) => {
    //await ServerConnection.closeTranslationAggregator()
    //ServerConnection.closeTranslationAggregator()
    ServerConnection.closeEverything()
});


// document.addEventListener("click", function(event){
//     if (event.target.id === )
//     console.log(event.target.getAttribute("isTextboxOutlineOrNot"))
// });


// console.log("hello world")
// function capture() {
//     html2canvas(document.body, {
//         onrendered: function(canvas) {
//             var img = canvas.toDataURL();
//             var a = document.createElement("a");
//             a.setAttribute('download', 'myImage.png');
//             a.setAttribute('href', img);
//             a.click();
//         }
//     });
// }

// setTimeout(function () {
//   capture()
// }, 3000)

// function capture() {  
//     html2canvas(document.querySelector('#toolBar'), {scale:1}).then(function(canvas) {
//         // document.getElementById("image").src = canvas.toDataURL()
//         saveAs(canvas.toDataURL(), 'file-name.png');
//     });
// }


// function saveAs(uri, filename) {

//     var link = document.createElement('a');

//     if (typeof link.download === 'string') {

//         link.href = uri;
//         link.download = filename;

//         //Firefox requires the link to be in the body
//         document.body.appendChild(link);

//         //simulate click
//         link.click();

//         //remove the link when done
//         document.body.removeChild(link);

//     } else {

//         window.open(uri);

//     }
// }
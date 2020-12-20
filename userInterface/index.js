

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

LoadImage.listen()

ModeSwitch.listen()

DivTrashBin.listen()

SaveTranslation.listen()

AutoTranslate.listen()

LoadTranslationData.listenToTranslationFileUploadEvent()

AskUserToSaveBeforeLeave.listen()


ImagesCollectionHandle.listen()

exportButton.listen()
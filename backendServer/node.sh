brew install tesseract
# brew install tesseract-jpn_vert

export TESSDATA_PREFIX=node-tesseract-ocr/tessdata

cd node-tesseract-ocr
npm install node-tesseract-ocr

cd ../

npm install
node server.js

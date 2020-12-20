from flask import Flask
from flask import request

import json

# import mangaDeepLearningModel.main as deepLearningModel
import ImageTextExtraction.mainSegmentation as computerVision

#deepLearningModel.segment_image_file("wholeImage.png")
#computerVision.segment_image_file("wholeImage.png", "none")

app = Flask(__name__)

@app.route("/", methods = ['POST'])

def sendTextboxesToMainServer():
    listOfTextboxes = computerVision.segment_image_file("wholeImage.png", "none")
    print(listOfTextboxes)
    return json.dumps(listOfTextboxes)



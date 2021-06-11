from flask import Flask
from flask import request

import json

# import mangaDeepLearningModel.main as deepLearningModel
import ImageTextExtraction.mainSegmentation as computerVision

#deepLearningModel.segment_image_file("wholeImage.png")
#computerVision.segment_image_file("wholeImage.png", "none")

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods = ['POST'])

def sendTextboxesToMainServer():
    data = request.get_json()
    message = data.get("message")
    content = data.get("content")

    print(message)

    if (message == "detect all textboxes"):
        listOfTextboxes = computerVision.segment_image_file("wholeImage.png", "none")
        print(listOfTextboxes)
        return json.dumps(listOfTextboxes)

    if (message == "close server"):
        print("hey hey hey")
        shutdown_server()

    return json.dumps(content)


def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

if __name__ == "__main__":
    app.run()
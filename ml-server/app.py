# from flask import Flask, request, jsonify
# from sentence_transformers import SentenceTransformer
# from PIL import Image
# import logging
# import os
# from flask_cors import CORS

# logging.basicConfig(level=logging.INFO)
# app = Flask(__name__)
# CORS(app)

# MODEL_NAME = 'sentence-transformers/clip-ViT-B-32'
# logging.info(f"Loading CLIP model: {MODEL_NAME}")
# model = SentenceTransformer(MODEL_NAME)
# logging.info("✅ Model loaded successfully.")

# @app.route('/get-vector', methods=['POST'])
# def get_vector():
#     if 'image' not in request.files:
#         logging.error("No 'image' file part in the request.")
#         return jsonify({'error': 'No image file found in the request.'}), 400

#     file = request.files['image']

#     if file.filename == '':
#         logging.error("Received an empty file.")
#         return jsonify({'error': 'No selected file.'}), 400

#     if file:
#         try:
#             image = Image.open(file.stream)
#             if image.mode != 'RGB':
#                 image = image.convert('RGB')
                
#             vector = model.encode(image).tolist()
#             logging.info("✅ Successfully generated vector.")
#             return jsonify(vector)
#         except Exception as e:
#             logging.error(f"Error processing image: {e}")
#             return jsonify({'error': f'Failed to process image: {str(e)}'}), 500

#     return jsonify({'error': 'An unknown error occurred.'}), 500

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     app.run(host='0.0.0.0', port=port)






from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from PIL import Image
import logging
import os
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
# This line is crucial: it allows your frontend to call this server directly
CORS(app)

# The model will be downloaded automatically from Hugging Face the first time the server starts.
MODEL_NAME = 'sentence-transformers/clip-ViT-B-32'
logging.info(f"Loading CLIP model from Hugging Face: {MODEL_NAME}")
model = SentenceTransformer(MODEL_NAME)
logging.info("✅ Model loaded successfully.")

@app.route('/get-vector', methods=['POST'])
def get_vector():
    # This code is now designed to handle 'multipart/form-data'
    if 'image' not in request.files:
        logging.error("No 'image' file part in the request.")
        return jsonify({'error': 'No image file found in the request.'}), 400

    file = request.files['image']

    if file.filename == '':
        logging.error("Received an empty file.")
        return jsonify({'error': 'No selected file.'}), 400

    if file:
        try:
            # Open the image directly from the file stream
            image = Image.open(file.stream)
            if image.mode != 'RGB':
                image = image.convert('RGB')
                
            vector = model.encode(image).tolist()
            logging.info("✅ Successfully generated vector.")
            return jsonify(vector)
        except Exception as e:
            logging.error(f"Error processing image: {e}")
            return jsonify({'error': f'Failed to process image: {str(e)}'}), 500

    return jsonify({'error': 'An unknown error occurred.'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)


from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from PIL import Image
import logging
import os
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
CORS(app)

script_dir = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(script_dir, 'clip-ViT-B-32-model')

logging.info(f"Loading CLIP model from local path: {MODEL_PATH}")
model = SentenceTransformer(MODEL_PATH)
logging.info(" Model loaded successfully.")


@app.route('/get-vector', methods=['POST'])
def get_vector():
    if 'image' not in request.files:
        logging.error("No 'image' file part in the request.")
        return jsonify({'error': 'No image file found in the request.'}), 400

    file = request.files['image']

    if file.filename == '':
        logging.error("Received an empty file.")
        return jsonify({'error': 'No selected file.'}), 400

    if file:
        try:
            image = Image.open(file.stream)
            if image.mode != 'RGB':
                image = image.convert('RGB')
                
            vector = model.encode(image).tolist()
            logging.info("Successfully generated vector.")
            return jsonify(vector)
        except Exception as e:
            logging.error(f"Error processing image: {e}")
            return jsonify({'error': f'Failed to process image: {str(e)}'}), 500

    return jsonify({'error': 'An unknown error occurred.'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)



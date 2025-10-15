# from flask import Flask, request, jsonify
# from sentence_transformers import SentenceTransformer
# from PIL import Image
# import logging
# import os
# import base64 
# import io     
# logging.basicConfig(level=logging.INFO)
# app = Flask(__name__)

# script_dir = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(script_dir, 'clip-ViT-B-32-model')

# try:
#     logging.info(f"Loading CLIP model from local path: {model_path}")
#     model = SentenceTransformer(model_path)
#     logging.info("✅ Model loaded successfully.")
# except Exception as e:
#     logging.error(f"Failed to load model: {e}")
#     model = None

# @app.route('/get-vector', methods=['POST'])
# def get_vector():
#     if model is None:
#         return jsonify({"error": "Model is not loaded."}), 500

#     data = request.get_json()
#     if not data or 'image' not in data:
#         return jsonify({"error": "No image data provided in JSON payload."}), 400

#     try:
#         image_data = base64.b64decode(data['image'])
#         img = Image.open(io.BytesIO(image_data))
        
#         vector = model.encode(img)
#         vector_list = vector.tolist()
        
#         logging.info(f"✅ Successfully generated vector.")
#         return jsonify(vector_list)

#     except Exception as e:
#         logging.error(f"Error processing image: {e}")
#         return jsonify({"error": f"Failed to process image: {str(e)}"}), 500

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
CORS(app)

MODEL_NAME = 'sentence-transformers/clip-ViT-B-32'
logging.info(f"Loading CLIP model: {MODEL_NAME}")
model = SentenceTransformer(MODEL_NAME)
logging.info("✅ Model loaded successfully.")

@app.route('/get-vector', methods=['POST'])
def get_vector():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found in the request.'}), 400

    file = request.files['image']
    try:
        image = Image.open(file.stream)
        vector = model.encode(image).tolist()
        return jsonify(vector)
    except Exception as e:
        logging.error(f"Error processing image: {e}")
        return jsonify({'error': 'Failed to process image.'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)


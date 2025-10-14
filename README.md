Visual Product Matcher
A web application that helps users find visually similar products based on an uploaded image or an image URL. This project was built as a technical assessment.

Live Application URL: https://visual-product-matcher-i22d.onrender.com

My Approach (Brief Write-up)
My approach was to build a full-stack application using a decoupled architecture to separate the user interface from the AI processing logic.

For the frontend, I chose Next.js with React and TypeScript. This provided a robust framework for building a responsive user interface while also handling the server-side API route needed to communicate with the backend. For styling, I used Tailwind CSS for rapid, utility-first design.

The core visual search logic is handled by a separate Python server built with Flask. This server uses a pre-trained CLIP-ViT-B-32 model from the transformers library to convert images into 512-dimension vector embeddings. When a user uploads an image, the Next.js frontend sends it to its API route, which in turn calls the Python server to get a vector. This vector is then compared against a pre-computed database of product vectors using cosine similarity to find the closest matches.

Both the Next.js application and the Python AI server are deployed as separate web services on Render, allowing them to scale independently and communicate via public URLs. This setup ensures the application is robust and mirrors a real-world production environment.

Features
[x] Image Upload: Supports both drag-and-drop file upload and direct click-to-upload.

[x] Image URL Input: Users can paste a public URL to an image.

[x] Search Interface: Displays the user's uploaded image and a list of the top 3 most similar products.

[x] Product Database: Contains over 50 products with metadata (name, image, etc.).

[x] Live Hosting: The application is deployed and live on Render.

[x] Mobile Responsive Design: The interface is optimized for both desktop and mobile devices.

[x] Loading States: A loading spinner provides a better user experience during the search process.

[x] Error Handling: The application displays clear error messages for issues like failed uploads or server problems.

Tech Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS

Backend (AI Server): Python, Flask, Transformers, PyTorch

Deployment: Render, Git & GitHub

How to Run Locally
To set up and run this project on your local machine, please follow these steps.

Prerequisites:

Node.js (v18 or later)

Python (v3.9 or later)

Git

1. Clone the repository:

git clone [https://github.com/ritam2727/visual-product-matcher.git](https://github.com/ritam2727/visual-product-matcher.git)
cd visual-product-matcher

2. Set up and run the Python AI Server:

# Navigate to the ML server directory
cd ml-server

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start the server
python app.py

The AI server will now be running at http://localhost:5000.

3. Set up and run the Next.js Frontend:

# In a new terminal, navigate to the project's root directory
cd .. 

# Install frontend dependencies
npm install

# Start the development server
npm run dev

The web application will now be available at http://localhost:3000.
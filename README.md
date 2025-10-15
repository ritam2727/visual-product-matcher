Visual Product Matcher

This project is a web application that allows users to find visually similar products by uploading an image or providing an image URL. It leverages a machine learning model to analyze images and return the most relevant matches from a product database.

Live URLs

Main Application: https://visual-product-matcher-i22d.onrender.com

Backend AI Server: https://backend-ml-python-server.onrender.com

Note: The backend server is on a free plan and will "sleep" after 15 minutes of inactivity. The first request to a sleeping server will be slow as it wakes up. The application is designed to wait patiently, but for the best experience, you can "wake up" the server by clicking the backend link first.

My Approach:


My approach was to build a decoupled, full-stack application using a modern tech stack. I chose Next.js for the frontend due to its excellent React framework and performance optimizations. This allowed me to create a responsive and interactive user interface.

For the core AI functionality, I created a separate microservice in Python using Flask. This server's sole responsibility is to host a  sentence-transformers/clip-ViT-B-32 model, which it automatically downloads on startup. This decoupled architecture separates the heavy AI processing from the user-facing application.

To solve the timeout issues inherent in free hosting tiers, I implemented a direct communication model. The Next.js frontend calls the Python backend directly, bypassing any intermediate serverless functions. The frontend is configured to wait indefinitely for the Python server to respond. This robustly handles the slow "cold starts" of the sleeping AI server without causing an error, providing a resilient user experience while staying within the constraints of a free hosting plan.

Features:


Dual Image Input: Supports both direct file uploads (including drag-and-drop) and image URL submission.

AI-Powered Search: Uses a CLIP model to generate vector embeddings for powerful visual similarity matching.

Top 3 Results: Displays the three most visually similar products from the database.

Responsive Design: The user interface works well on both desktop and mobile devices.

Direct Backend Communication: The frontend is architected to handle long waits for the backend AI server, preventing timeouts.

Tech Stack:


Frontend: Next.js (React), TypeScript, Tailwind CSS

Backend (AI Service): Python, Flask, Sentence-Transformers

Hosting: Render

How to Run Locally
Clone the repository:

git clone [https://github.com/ritam2727/visual-product-matcher.git](https://github.com/ritam2727/visual-product-matcher.git)
cd visual-product-matcher

Set up the environment file:

In the root directory, create a new file named .env.local.

Add the following line to this file:

NEXT_PUBLIC_PYTHON_API_URL=http://localhost:5000

Run the Python AI server (Terminal 1):

cd ml-server
pip install -r requirements.txt
python app.py

Run the frontend application (Terminal 2):

Make sure you are in the root directory.

npm install
npm run dev

Open http://localhost:3000 in your browser.
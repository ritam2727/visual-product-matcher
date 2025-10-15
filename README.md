Visual Product Matcher
This project is a web application that allows users to find visually similar products by uploading an image or providing an image URL. It leverages a machine learning model to analyze images and return the most relevant matches from a product database.

Live URLs
Main Application: https://visual-product-matcher-i22d.onrender.com

Backend AI Server: https://backend-ml-python-server.onrender.com

Note: The backend server is on a free plan and will "sleep" after 15 minutes of inactivity. To ensure the application works correctly, please click the backend server link first to wake it up. You will see a "Not Found" message, which is normal. Then, you can use the main application.

My Approach (Brief Write-up)
My approach was to build a decoupled, full-stack application using a modern tech stack focused on developer experience and scalability. I chose Next.js for the frontend and API layer due to its powerful routing, serverless functions, and excellent React framework. This allowed me to create a user-friendly interface and a robust "middleman" API in a single codebase.

For the core AI functionality, I created a separate microservice in Python using Flask. This server's sole responsibility is to host a pre-trained sentence-transformers/clip-ViT-B-32 model, which converts images into vector embeddings. This decoupled architecture separates the AI processing from the main application logic, making both services easier to manage and scale independently.

To handle the slow "cold starts" of the free hosting tier on Render, I implemented an asynchronous polling system. When a user submits an image, the Next.js API immediately returns a job ID and processes the image in the background. The frontend then polls a separate endpoint every few seconds to check for the completed results. This provides a resilient and non-blocking user experience, ensuring the application works reliably even with the limitations of a free hosting plan.

Features
Dual Image Input: Supports both direct file uploads (including drag-and-drop) and image URL submission.

AI-Powered Search: Uses a CLIP model to generate vector embeddings for powerful visual similarity matching.

Top 3 Results: Displays the three most visually similar products from the database.

Responsive Design: The user interface is fully responsive and works well on both desktop and mobile devices.

Asynchronous Processing: Handles long-running AI tasks without freezing the user interface or timing out.

Tech Stack
Frontend: Next.js (React), TypeScript, Tailwind CSS

Backend (API Layer): Next.js API Routes, Redis

Backend (AI Service): Python, Flask, Sentence-Transformers

Hosting: Render

How to Run Locally
Clone the repository:

git clone [https://github.com/ritam2727/visual-product-matcher.git](https://github.com/ritam2727/visual-product-matcher.git)
cd visual-product-matcher

Install frontend dependencies:

npm install

Set up and run the Python AI server: (In a separate terminal)

cd ml-server
pip install -r requirements.txt
python app.py

Run the frontend application: (In another terminal, from the root folder)

npm run dev

Open http://localhost:3000 in your browser.
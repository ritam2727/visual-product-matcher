import fs from 'fs';
import path from 'path';

const PYTHON_API_URL = 'http://localhost:5000/get-vector';

async function getVector(localImagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', localImagePath);
    
    const imageBuffer = fs.readFileSync(fullPath);
    const base64Image = imageBuffer.toString('base64');

    const response = await fetch(PYTHON_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Python server returned an error');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error getting vector from Python server for ${localImagePath}:`, error);
    return null;
  }
}

async function processAllImages() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  console.log(`Starting to process ${products.length} images via local Python server...`);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (Array.isArray(product.vector) && product.vector.length === 0) {
      console.log(`Processing product ${product.id} (${i + 1}/${products.length}): ${product.name}`);
      const vector = await getVector(product.imageUrl);
      if (vector) {
        product.vector = vector;
      }
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log('✅ All images processed. Vectors saved.');
}

processAllImages();
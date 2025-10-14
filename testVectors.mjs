import fs from 'fs';
import path from 'path';

// A function to calculate the similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    return 0;
  }

  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  if (magnitude === 0) {
    return 0;
  }

  return dotProduct / magnitude;
}

// --- Main script logic ---
try {
  // Get the two product IDs from the command line
  const id1 = process.argv[2];
  const id2 = process.argv[3];

  if (!id1 || !id2) {
    throw new Error('Please provide two product IDs to compare. Example: node testVectors.mjs 1 2');
  }

  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const product1 = products.find(p => p.id == id1);
  const product2 = products.find(p => p.id == id2);

  if (!product1 || !product2) {
    throw new Error('Could not find one or both product IDs in products.json');
  }

  const similarity = cosineSimilarity(product1.vector, product2.vector);

  console.log(`Comparing:`);
  console.log(`  - Product ${product1.id}: "${product1.name}"`);
  console.log(`  - Product ${product2.id}: "${product2.name}"`);
  console.log('\n-------------------------------------');
  console.log(`Similarity Score: ${similarity.toFixed(4)}`);
  console.log('-------------------------------------');

  if (similarity > 0.9) {
    console.log("Result: ✅ Very Similar");
  } else if (similarity > 0.8) {
    console.log("Result: Similar");
  } else {
    console.log("Result: ❌ Not Similar");
  }

} catch (error) {
  console.error(`\nError: ${error.message}`);
}
import fs from 'fs';
import path from 'path';

console.log("--- Updating image paths in products.json ---");

try {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const updatedProducts = products.map(product => {
    const fileExtension = product.imageUrl.split('.').pop();
    product.imageUrl = `/images/products/${product.id}.${fileExtension}`;
    return product;
  });

  fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));
  console.log("✅ Success! All imageUrl paths have been updated to local paths.");

} catch (error) {
  console.error("❌ Error updating paths:", error);
}
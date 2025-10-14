import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  vector: number[];
  similarity?: number;
}

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/products.json');
const PYTHON_API_URL = 'http://localhost:5000/get-vector'; 



function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0.0, normA = 0.0, normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}


async function getVectorForImage(imageBuffer: Buffer): Promise<number[] | null> {
  try {
    const base64Image = imageBuffer.toString('base64');
    const response = await fetch(PYTHON_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Python server returned an error');
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting vector from Python server:", error);
    return null;
  }
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const userImageVector = await getVectorForImage(imageBuffer);

    if (!userImageVector) {
      return NextResponse.json({ error: 'Failed to process image with local AI server.' }, { status: 500 });
    }

    const dbContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const products: Product[] = JSON.parse(dbContent);

    const productsWithScores = products.map(product => ({
      ...product,
      similarity: cosineSimilarity(userImageVector, product.vector),
    }));

    const sortedProducts = productsWithScores.sort((a, b) => b.similarity - a.similarity);

    return NextResponse.json(sortedProducts);

  } catch (error: unknown) { 
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
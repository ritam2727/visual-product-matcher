import fs from 'fs';
import path from 'path';

console.log("---  Running DEBUGGING script ---");

const API_URL = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=100';

async function inspectApiData() {
  try {
    console.log('Fetching data for inspection...');
    const response = await fetch(API_URL);
    const products = await response.json();

    console.log("--- RAW DATA FROM API (First 5 Products) ---");
    console.log(JSON.stringify(products.slice(0, 5), null, 2));
    console.log("-------------------------------------------");

  } catch (error) {
    console.error(' Error fetching or inspecting data:', error);
  }
}

inspectApiData();
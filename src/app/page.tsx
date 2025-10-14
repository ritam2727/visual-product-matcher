// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   imageUrl: string;
//   vector: number[];
//   similarity?: number;
// }

// const UploadIcon = () => (
//   <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//   </svg>
// );

// const ErrorIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
// );

// export default function Home() {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [inputType, setInputType] = useState<'upload' | 'url'>('upload');
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [results, setResults] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     setResults([]);

//     let fileToUpload: File | null = imageFile;

//     if (inputType === 'url') {
//       if (!imageUrl) {
//         setError('Please enter an image URL.');
//         setIsLoading(false);
//         return;
//       }
//       try {
//         const response = await fetch(imageUrl);
//         if (!response.ok) throw new Error('Could not fetch image from URL.');
//         const blob = await response.blob();
//         fileToUpload = new File([blob], 'imageFromUrl.jpg', { type: blob.type });
//         setImagePreview(imageUrl);
//       } catch (e) {
//         setError('Failed to fetch image. Please check the URL (it must be publicly accessible).');
//         setIsLoading(false);
//         return;
//       }
//     }

//     if (!fileToUpload) {
//       setError('Please select an image file or provide a URL.');
//       setIsLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', fileToUpload);

//     try {
//       const response = await fetch('/api/search', { method: 'POST', body: formData });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Something went wrong');
//       }
//       const data: Product[] = await response.json();
//       setResults(data);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unexpected error occurred.');
//       }
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const processFile = (file: File) => {
//     if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
//       setImageFile(file);
//       setImageUrl('');
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//         setError("Invalid file type. Please upload a PNG or JPG image.")
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       processFile(file);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     setIsDragging(false);
//     const file = event.dataTransfer.files?.[0];
//     if (file) {
//       processFile(file);
//     }
//   };

//   const getSimilarityColor = (similarity: number) => {
//     if (similarity > 0.9) return 'bg-green-100 text-green-800';
//     if (similarity > 0.8) return 'bg-emerald-100 text-emerald-800';
//     return 'bg-amber-100 text-amber-800';
//   };

//   const topResults = results.slice(0, 3);

//   return (
//     <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-slate-100">
//       <div className="z-10 w-full max-w-5xl items-center justify-between text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
//           Visual Product Matcher
//         </h1>
//         <p className="mt-2 text-slate-500">Find products with the power of AI vision.</p>
//       </div>

//       <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-xl border border-slate-200 mb-12">
//         <div className="flex border-b border-slate-200 mb-4">
//             <button onClick={() => setInputType('upload')} className={`px-4 py-2 text-sm font-medium transition-colors ${inputType === 'upload' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Upload File</button>
//             <button onClick={() => setInputType('url')} className={`px-4 py-2 text-sm font-medium transition-colors ${inputType === 'url' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Image URL</button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {inputType === 'upload' ? (
//             <label
//               htmlFor="file-upload"
//               className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}
//               onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
//             >
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <UploadIcon />
//                 <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                 <p className="text-xs text-slate-500">PNG or JPG</p>
//               </div>
//               <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="hidden" />
//             </label>
//           ) : (
//              <div className="flex flex-col">
//                 <label htmlFor="image-url" className="text-sm font-medium text-slate-700 mb-2">Paste image URL:</label>
//                 <input
//                   id="image-url"
//                   type="text"
//                   value={imageUrl}
//                   onChange={(e) => { setImageUrl(e.target.value); setImageFile(null); }}
//                   placeholder="https://..."
//                   className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//              </div>
//           )}

//           {imageFile && inputType === 'upload' && (
//             <div className="mt-4 text-center text-sm text-slate-600">Selected file: <span className="font-medium">{imageFile.name}</span></div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading || (!imageFile && !imageUrl)}
//             className="mt-6 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
//           >
//             {isLoading ? 'Searching...' : 'Find Similar Products'}
//           </button>
//         </form>
//       </div>

//       {error && (
//         <div className="w-full max-w-lg flex items-center p-4 mb-8 text-sm font-bold text-red-800 rounded-lg bg-red-100" role="alert">
//           <ErrorIcon />
//           <span>{error}</span>
//         </div>
//       )}

//       {isLoading && (
//         <div className="flex flex-col items-center justify-center gap-4">
//           <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
//           <p className="text-slate-600 font-medium">Analyzing your image...</p>
//         </div>
//       )}

//       {results.length > 0 && (
//         <div className="w-full max-w-6xl">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
//             <div className="md:col-span-4 lg:col-span-3">
//               <div className="p-4 bg-white rounded-xl shadow-lg border-2 border-green-500 sticky top-12">
//                   <h3 className="text-lg font-bold mb-3 text-center text-slate-800">Your Image</h3>
//                   <Image src={imagePreview!} alt="Uploaded preview" width={400} height={400} className="w-full h-auto object-contain rounded-lg" />
//               </div>
//             </div>
//             <div className="md:col-span-8 lg:col-span-9">
//               <h2 className="text-3xl font-bold mb-6 text-slate-800">Top 3 Similar Products</h2>
//               {topResults.length > 0 ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//                   {topResults.map((product) => (
//                     <div key={product.id} className="bg-white rounded-xl shadow-lg p-3 flex flex-col items-center group transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//                       <div className="w-full h-40 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden mb-3 relative">
//                         <Image src={product.imageUrl} alt={product.name} fill={true} style={{objectFit: 'contain'}} />
//                       </div>
//                       <p className="text-sm font-bold text-center text-slate-800 flex-grow">{product.name}</p>
//                       {product.similarity !== undefined && (
//                         <span className={`mt-2 px-2.5 py-1 rounded-full text-xs font-bold ${getSimilarityColor(product.similarity)}`}>
//                           {`~${(product.similarity * 100).toFixed(0)}% Match`}
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                  <div className="w-full h-40 flex items-center justify-center bg-slate-50 rounded-lg">
//                     <p className="text-slate-500 font-medium">No matches found.</p>
//                  </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }










'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  vector: number[];
  similarity?: number;
}

const UploadIcon = () => (
  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
  </svg>
);

const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [inputType, setInputType] = useState<'upload' | 'url'>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults([]);

    let fileToUpload: File | null = imageFile;

    if (inputType === 'url') {
      if (!imageUrl) {
        setError('Please enter an image URL.');
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Could not fetch image from URL.');
        const blob = await response.blob();
        fileToUpload = new File([blob], 'imageFromUrl.jpg', { type: blob.type });
        setImagePreview(imageUrl);
      } catch (e) {
        setError('Failed to fetch image. Please check the URL (it must be publicly accessible).');
        setIsLoading(false);
        return;
      }
    }

    if (!fileToUpload) {
      setError('Please select an image file or provide a URL.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', fileToUpload);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
      const data: Product[] = await response.json();
      setResults(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('The request timed out. The AI server may be starting up. Please try again in a moment.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
      clearTimeout(timeoutId);
    }
  };

  const processFile = (file: File) => {
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setImageFile(file);
      setImageUrl('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        setError("Invalid file type. Please upload a PNG or JPG image.")
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity > 0.9) return 'bg-green-100 text-green-800';
    if (similarity > 0.8) return 'bg-emerald-100 text-emerald-800';
    return 'bg-amber-100 text-amber-800';
  };

  const topResults = results.slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-slate-100">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          Visual Product Matcher
        </h1>
        <p className="mt-2 text-slate-500">Find products with the power of AI vision.</p>
      </div>

      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-xl border border-slate-200 mb-12">
        <div className="flex border-b border-slate-200 mb-4">
            <button onClick={() => setInputType('upload')} className={`px-4 py-2 text-sm font-medium transition-colors ${inputType === 'upload' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Upload File</button>
            <button onClick={() => setInputType('url')} className={`px-4 py-2 text-sm font-medium transition-colors ${inputType === 'url' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Image URL</button>
        </div>

        <form onSubmit={handleSubmit}>
          {inputType === 'upload' ? (
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon />
                <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-slate-500">PNG or JPG</p>
              </div>
              <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
             <div className="flex flex-col">
                <label htmlFor="image-url" className="text-sm font-medium text-slate-700 mb-2">Paste image URL:</label>
                <input
                  id="image-url"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => { setImageUrl(e.target.value); setImageFile(null); }}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
             </div>
          )}

          {imageFile && inputType === 'upload' && (
            <div className="mt-4 text-center text-sm text-slate-600">Selected file: <span className="font-medium">{imageFile.name}</span></div>
          )}

          <button
            type="submit"
            disabled={isLoading || (!imageFile && !imageUrl)}
            className="mt-6 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? 'Searching...' : 'Find Similar Products'}
          </button>
        </form>
      </div>

      {error && (
        <div className="w-full max-w-lg flex items-center p-4 mb-8 text-sm font-bold text-red-800 rounded-lg bg-red-100" role="alert">
          <ErrorIcon />
          <span>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
          <p className="text-slate-600 font-medium">Analyzing your image...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="p-4 bg-white rounded-xl shadow-lg border-2 border-green-500 sticky top-12">
                  <h3 className="text-lg font-bold mb-3 text-center text-slate-800">Your Image</h3>
                  <Image src={imagePreview!} alt="Uploaded preview" width={400} height={400} className="w-full h-auto object-contain rounded-lg" />
              </div>
            </div>
            <div className="md:col-span-8 lg:col-span-9">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Top 3 Similar Products</h2>
              {topResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {topResults.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg p-3 flex flex-col items-center group transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="w-full h-40 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden mb-3 relative">
                        <Image src={product.imageUrl} alt={product.name} fill={true} style={{objectFit: 'contain'}} />
                      </div>
                      <p className="text-sm font-bold text-center text-slate-800 flex-grow">{product.name}</p>
                      {product.similarity !== undefined && (
                        <span className={`mt-2 px-2.5 py-1 rounded-full text-xs font-bold ${getSimilarityColor(product.similarity)}`}>
                          {`~${(product.similarity * 100).toFixed(0)}% Match`}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                 <div className="w-full h-40 flex items-center justify-center bg-slate-50 rounded-lg">
                    <p className="text-slate-500 font-medium">No matches found.</p>
                 </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}



// "use client";
//
// import Image from "next/image";
// import { useState } from "react";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "@/lib/firebase";
//
// export default function Upload() {
//   const [file, setFile] = useState<File | null>(null); // Adaugă tipul explicit pentru file
//   const [uploading, setUploading] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState("");
//
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setFile(event.target.files[0]); // Setează fișierul selectat
//     }
//   };
//
//   const handleUpload = async () => {
//     if (!file) return;
//
//     setUploading(true);
//     const storageRef = ref(storage, `images/${file.name}`);
//
//     try {
//       await uploadBytes(storageRef, file);
//       const url = await getDownloadURL(storageRef);
//       setUploadedUrl(url);
//       console.log("File Uploaded Successfully");
//     } catch (error) {
//       console.error("Error uploading the file", error);
//     } finally {
//       setUploading(false);
//     }
//   };
//
//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={uploading}>
//         {uploading ? "Uploading..." : "Upload Image"}
//       </button>
//       {uploadedUrl && (
//         <div>
//           <p>Uploaded image:</p>
//           <Image
//             src={uploadedUrl}
//             alt="Uploaded image"
//             width={300}
//             height={300}
//             layout="responsive"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

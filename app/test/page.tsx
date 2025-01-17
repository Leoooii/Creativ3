"use client";

import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "@/lib/firebase";
import Image from "next/image";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]); // Specifică tipul ca string[]

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, "images/"); // Referință către directorul "images" din Firebase Storage

      try {
        const result = await listAll(imagesRef); // Listează toate elementele din directorul "images"
        const urls = await Promise.all(
          result.items.map((item) => getDownloadURL(item)),
        ); // Obține URL-urile de descărcare pentru toate imaginile
        setImages(urls); // Setează lista URL-urilor imaginilor
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages(); // Încarcă imaginile la montarea componentului
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {images.map((url, index) => (
          <div
            key={url}
            style={{
              margin: 10,
              position: "relative",
              width: "300px",
              height: "500px",
            }}
          >
            <Image
              src={url}
              alt={`Image ${index}`}
              sizes="300px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

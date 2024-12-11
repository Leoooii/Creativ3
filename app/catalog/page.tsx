"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Category, Material } from "@/lib/definitions";
import { useDebounce } from "use-debounce";
import { fetchCategories, fetchMaterials } from "@/lib/data";
import MaterialList from "@/components/Sections/MaterialList";
import PaginationComponent from "@/components/Sections/PaginationComponent";

const Page = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // Obține valoarea din URL
  const [materials, setMaterials] = useState<Material[]>([]);
  const [value] = useState([0, 300]);
  const [debouncedValue] = useDebounce(value, 500);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const loadMaterials = async () => {
    if (category) {
      const { materialsData, totalPages } = await fetchMaterials(
        page,
        debouncedValue[0],
        debouncedValue[1],
        category,
      );

      setNumberOfPages(totalPages);
      setMaterials(materialsData);
      setNumberOfItems(materialsData.length);
    } else {
      const { materialsData, totalPages } = await fetchMaterials(
        page,
        debouncedValue[0],
        debouncedValue[1],
      );

      setNumberOfPages(totalPages);
      setMaterials(materialsData);
      setNumberOfItems(materialsData.length);
    }
  };

  useEffect(() => {
    loadMaterials();
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    loadCategories();
  }, [debouncedValue, page, category]);

  return (
    <div className="flex flex-col p-3 min-h-screen">
      {/* Împachetăm MaterialList în Suspense */}
      <Suspense fallback={<div>Loading materials...</div>}>
        <MaterialList loadMaterials={loadMaterials} materials={materials} />
      </Suspense>
      <div>
        {numberOfPages > 1 && (
          <PaginationComponent
            numberOfPages={numberOfPages}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
      {numberOfItems}
    </div>
  );
};

export default Page;

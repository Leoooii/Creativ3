"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Material } from "@/lib/definitions";
import { useDebounce } from "use-debounce";
import { fetchMaterials } from "@/lib/data";
import MaterialList from "@/components/Sections/MaterialList";
import PaginationComponent from "@/components/Sections/PaginationComponent";

const CatalogPage = () => {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>("");

  const [materials, setMaterials] = useState<Material[]>([]);
  const [value] = useState([0, 300]);
  const [debouncedValue] = useDebounce(value, 500);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

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
    const categoryValue = searchParams.get("category");
    setCategory(categoryValue);

    loadMaterials();

    console.log(category);
  }, [debouncedValue, page, category]);

  return (
    <div className="flex flex-col p-3 min-h-screen">
      {/* Împachetăm MaterialList în Suspense */}
      {category}
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

export default CatalogPage;

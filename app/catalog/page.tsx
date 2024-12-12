"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Category, Material } from "@/lib/definitions";
import { useDebounce } from "use-debounce";
import { fetchCategories, fetchMaterials } from "@/lib/data";
import MaterialList from "@/components/Sections/MaterialList";
import PaginationComponent from "@/components/Sections/PaginationComponent";
import UrlParams from "@/components/UI/components/UrlParams";
import FilterSidebar from "@/components/Sections/FilterSidebar";
import { useAuth } from "@/providers/auth-store-provider";
import { useRouter } from "next/navigation";

const CatalogPage = () => {
  const [category, setCategory] = useState<string | null>("");
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [value, setValue] = useState([0, 300]);
  const [debouncedValue] = useDebounce(value, 500);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { isAdmin } = useAuth();
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

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();

      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    loadMaterials();
    loadCategories();

    console.log(category);
  }, [debouncedValue, page, category]);

  const handleCategory = async (category: string) => {
    router.push(`/catalog?category=${category}`);
  };

  return (
    <div className="flex flex-col p-3 min-h-screen">
      <FilterSidebar
        categories={categories}
        isAdmin={isAdmin}
        numberOfPages={numberOfPages}
        page={page}
        reload={loadMaterials}
        setCategory={handleCategory}
        setPage={setPage}
        setValue={setValue}
        value={value}
      />

      <Suspense fallback={<div>Loading url...</div>}>
        <UrlParams setCategory={setCategory} />
      </Suspense>

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
      {numberOfItems === 0 && (
        <h1>Nu există produse în acel interval de preț</h1>
      )}
    </div>
  );
};

export default CatalogPage;

import React from "react";
import { useSearchParams } from "next/navigation";

interface UrlParamsProps {
  setCategory?: (value: string | null) => void;
  setSearch?: (value: string | null) => void;
}

const UrlParams: React.FC<UrlParamsProps> = ({
  setCategory,
  setSearch,
}: UrlParamsProps) => {
  const searchParams = useSearchParams();
  const categoryValue = searchParams.get("category");
  const searchValue = searchParams.get("search");

  React.useEffect(() => {
    if (setCategory) setCategory(categoryValue);
    if (setSearch) {
      setSearch(searchValue);
    }
  }, [categoryValue, setCategory, searchValue, setSearch]); // Efect declanșat când se schimbă valoarea
  // categoriei

  return (
    <div className={setCategory ? "hidden" : "flex"}>
      {categoryValue && categoryValue.toUpperCase()}
      {searchValue && searchValue.toUpperCase()}
      {!searchValue && !categoryValue && "Toate"}
    </div>
  );
};

export default UrlParams;

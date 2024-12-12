import React from "react";
import { useSearchParams } from "next/navigation";

interface UrlParamsProps {
  setCategory?: (value: string | null) => void;
}

const UrlParams: React.FC<UrlParamsProps> = ({
  setCategory,
}: UrlParamsProps) => {
  const searchParams = useSearchParams();
  const categoryValue = searchParams.get("category");

  React.useEffect(() => {
    if (setCategory) setCategory(categoryValue);
  }, [categoryValue, setCategory]); // Efect declanșat când se schimbă valoarea categoriei

  return (
    <div className={setCategory ? "hidden" : "flex"}>
      {categoryValue ? categoryValue : "Toate"}
    </div>
  );
};

export default UrlParams;

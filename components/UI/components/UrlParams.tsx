import React from "react";
import { useSearchParams } from "next/navigation";

interface UrlParamsProps {
  setCategory: (value: string | null) => void;
}

const UrlParams: React.FC<UrlParamsProps> = ({ setCategory }) => {
  const searchParams = useSearchParams();
  const categoryValue = searchParams.get("category");

  React.useEffect(() => {
    setCategory(categoryValue);
  }, [categoryValue, setCategory]); // Efect declanșat când se schimbă valoarea categoriei

  return <div>{categoryValue}</div>;
};

export default UrlParams;

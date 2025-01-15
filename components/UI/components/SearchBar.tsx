"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";

import { fetchMaterialByFilter } from "@/lib/data";
import { Material } from "@/lib/definitions";

export default function SearchBar() {
  const [searchItems, setSearchItems] = useState<Material[] | undefined>(
    undefined,
  );
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const fetchMaterial = async (value: string) => {
    const result = await fetchMaterialByFilter(value, 10);
    setSearchItems(result);
    // console.log(result, "2");
  };

  useEffect(() => {
    fetchMaterial(""); // Începe cu o căutare goală la montarea componentelor
  }, []);

  const onInputChange = (value: string) => {
    setInputValue(value);
    fetchMaterial(value.toUpperCase());
  };

  const onSelectionChange = (id: string | number | null) => {
    if (id) {
      router.push(`/catalog/${id}`);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log("pressed");
    if (event.key === "Enter" && inputValue) {
      console.log("entered");
      router.push(`/catalog?search=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <Autocomplete
      allowsCustomValue
      className="w-80 min-h-auto"
      color={"primary"}
      items={searchItems || []} // Furnizează lista de elemente (searchItems) ca prop
      label="Cauta produs"
      variant="flat"
      onInputChange={onInputChange}
      onSelectionChange={onSelectionChange}
      size={"sm"}
      isVirtualized={true}
      itemHeight={40}
      onKeyDown={handleKeyDown}
    >
      {(item) => (
        <AutocompleteItem
          key={item.id}
          className={"whitespace-normal break-words"}
        >
          <div style={{ height: "40" }}>
            <Link href={`/catalog/${item.id}`} className={"text-sm p-1 m-1"}>
              {item.name}
            </Link>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

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

  const fetchMaterial = async (value: string) => {
    const result = await fetchMaterialByFilter(value);
    setSearchItems(result);
    console.log(result, "2");
  };

  useEffect(() => {
    fetchMaterial(""); // Începe cu o căutare goală la montarea componentelor
  }, []);

  const onInputChange = (value: string) => {
    fetchMaterial(value);
  };

  const onSelectionChange = (id: string | number | null) => {
    if (id) {
      router.push(`/catalog/${id}`);
    }
  };

  return (
    <Autocomplete
      allowsCustomValue
      className="max-w-xs w-40"
      color={"primary"}
      items={searchItems || []} // Furnizează lista de elemente (searchItems) ca prop
      label="Cauta produs"
      variant="faded"
      onInputChange={onInputChange}
      onSelectionChange={onSelectionChange}
    >
      {(item) => (
        <AutocompleteItem key={item.id}>
          <Link href={`/catalog/${item.id}`}>{item.name}</Link>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

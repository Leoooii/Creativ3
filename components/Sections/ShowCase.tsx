"use client";

import React, { useEffect } from "react";
import { fetchMaterialByFilter } from "@/lib/data";
import { Material } from "@/lib/definitions";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { Link } from "@nextui-org/link";

const ShowCase = ({ value }: { value: string }) => {
  const [items, setItems] = React.useState<Material[]>([]);
  const router = useRouter();

  const fetchMaterial = async (value: string) => {
    const result = await fetchMaterialByFilter(value, 4);
    setItems(result);
    console.log(result, "2");
  };
  useEffect(() => {
    fetchMaterial(value.toUpperCase());
  }, []);

  return (
    <div className="w-full bg-gray-800 flex flex-col rounded-xl  gap-5 p-5 ">
      {items.length > 0 ? (
        <div
          className={
            "flex flex-col md:flex-row rounded-xl justify-around gap-3"
          }
        >
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className={
                  "flex flex-col justify-center items-center bg-white p-3 rounded-lg hover:opacity-80" +
                  " hover:cursor-pointer"
                }
                onClick={() => {
                  router.push("/catalog/" + item.id);
                }}
              >
                <Image
                  src={item.image_url}
                  className={"mx-auto max-h-52"}
                  alt={"items"}
                />
                <h1 className={"text-center mt-2"}>{item.name}</h1>
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner color="default" />
      )}

      {items.length > 0 && (
        <Link
          href={`/catalog?search=${value}`}
          className={"text-white text-2xl"}
        >
          Mai multe...
        </Link>
      )}
    </div>
  );
};
export default ShowCase;

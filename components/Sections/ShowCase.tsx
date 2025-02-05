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
    const result = await fetchMaterialByFilter(value, 5);
    setItems(result);
    console.log(result, "2");
  };
  useEffect(() => {
    fetchMaterial(value.toUpperCase());
  }, []);

  return (
    <div className="max-w-full bg-blue-950 flex flex-col rounded-xl  gap-5 p-5 ">
      {items.length > 0 ? (
        <div className={"grid grid-cols-5 gap-2 "}>
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className={
                  "flex flex-col justify-between items-center bg-white  rounded-lg hover:opacity-80" +
                  " hover:cursor-pointer min-h-64 min-w-32 max-h-fit"
                }
                onClick={() => {
                  router.push("/catalog/" + item.id);
                }}
              >
                <div
                  className={"w-full flex flex-col justify-center items-center"}
                >
                  <Image
                    src={item.image_url}
                    className={"mx-auto max-w-40 max-h-32"}
                    alt={"items"}
                  />
                  <h1 className={"text-center mt-2 max-w-32 text-sm mx-auto"}>
                    {item.name}
                  </h1>
                </div>
                <div className={"bg-gray-200 w-full p-1"}>
                  {item.price}/{item.unit}
                </div>
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
          <strong>{value}</strong>...
        </Link>
      )}
    </div>
  );
};
export default ShowCase;

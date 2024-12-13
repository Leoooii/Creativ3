"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";

import { fetchMaterialById } from "@/lib/data";
import { useCartStore } from "@/providers/cart-store";
import { Material } from "@/lib/definitions";
import Image from "next/image";

const CartItem = ({
  item,
  isEditable,
}: {
  item: {
    id: number;
    count: number;
  };
  isEditable: boolean;
}) => {
  const [material, setMaterial] = useState<Material>();
  const { incrementItemCount, decrementItemCount, removeItem } = useCartStore();

  useEffect(() => {
    const fetchMaterial = async () => {
      const result = await fetchMaterialById(item.id.toString());

      if (result != null) setMaterial(result);
    };

    fetchMaterial();
  }, [item.id]);

  if (!material) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-600 p-2 flex-col gap-3 sm:flex-row flex rounded-md justify-between">
      <div className="flex gap-2 items-center text-white justify-center">
        <Link
          className="bg-white p-1 rounded-md"
          href={`/catalog/${material.id}`}
        >
          <Image
            alt={"itemImage"}
            className={"rounded-md"}
            height={50}
            src={material.image_url}
            width={50}
          />
        </Link>
        <h3>{material.name}</h3>
        <p>{material.price} lei</p>
      </div>
      <div className={"flex items-center justify-center gap-2"}>
        {isEditable && (
          <Button
            color={"danger"}
            size={"sm"}
            onClick={() => {
              if (item.count > 1) {
                decrementItemCount(item.id);
              } else {
                removeItem(item.id);
              }
            }}
          >
            <MinusCircleIcon />
          </Button>
        )}
        <p className={"text-xl font-bold text-white"}>{item.count} buc</p>
        {isEditable && (
          <Button
            color={"secondary"}
            size={"sm"}
            onClick={() => {
              incrementItemCount(item.id);
            }}
          >
            <PlusCircleIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItem;

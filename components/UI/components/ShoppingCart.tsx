"use client";

import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ShopingCart = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="relative">
        <Link href={"/auth"}>
          <ShoppingCartIcon
            className={`w-10 hover:cursor-pointer border-b-1  ${pathname === "/auth" ? "border-white-500" : "border-black"}`}
            color={"white"}
          />
        </Link>
      </div>
    </>
  );
};

export default ShopingCart;

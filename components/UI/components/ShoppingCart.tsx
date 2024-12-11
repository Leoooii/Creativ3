"use client";

import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const ShopingCart = () => {
  return (
    <>
      <div className="relative">
        <Link href={"/auth"}>
          <ShoppingCartIcon
            className="w-8 hover:cursor-pointer"
            color={"white"}
          />
        </Link>
      </div>
    </>
  );
};

export default ShopingCart;

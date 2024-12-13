"use client";

import React from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const Catalog = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="relative">
        <Link href={"/"}>
          <HomeIcon
            className={`w-10 hover:cursor-pointer border-b-1 ${pathname === "/" ? "border-white-500" : "border-black"}`}
            color={`${pathname === "/" ? "white" : "gray"}`}
          />
        </Link>
      </div>
    </>
  );
};

export default Catalog;

"use client";

import React from "react";
import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const Catalog = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="relative">
        <Link href={"/catalog"}>
          <BookOpenIcon
            className={`w-10 hover:cursor-pointer border-b-1 ${pathname === "/catalog" ? "border-white-500" : "border-black"}`}
            color={`${pathname === "/catalog" ? "white" : "gray"}`}
          />
        </Link>
      </div>
    </>
  );
};

export default Catalog;

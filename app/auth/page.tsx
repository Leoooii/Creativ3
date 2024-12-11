"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/spinner";

const Auth = dynamic(() => import("@/components/Sections/Auth"), {
  ssr: false,
});

const Page = () => {
  return (
    <div className="w-full p-5 flex flex-col flex-1 gap-5">
      <div className="border-white b-2 rounded-md bg-white p-5">
        <Suspense fallback={<Spinner color="warning" label="Loading..." />}>
          <Auth />
        </Suspense>
      </div>
      <div className="border-white b-2 rounded-md bg-white p-5 ">
        {/*<ShoppingCartIcon height={50} width={50} />*/}
        {/*<CartItems />*/}
      </div>
    </div>
  );
};

export default Page;

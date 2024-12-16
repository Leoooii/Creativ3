"use client";

import React, { Suspense } from "react";
import Auth from "@/components/Sections/Auth";
import { Spinner } from "@nextui-org/spinner";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartItems from "@/components/Sections/CartItems";
import AuthForm from "@/components/Forms/AuthForm";
import { UserIcon } from "@heroicons/react/24/solid";

const Page = () => {
  return (
    <div className={" w-full  p-5 flex flex-col flex-1 gap-5"}>
      <div className="border-white b-2 rounded-md bg-white  p-5">
        <div className="flex flex-col sm:flex-row justify-around ">
          <AuthForm method="signUp" />
          <UserIcon className={"w-32"} color={"blue"} />
          <AuthForm method="signIn" />
        </div>
        <Suspense fallback={<Spinner color="warning" label="Loading..." />}>
          <Auth />
        </Suspense>
      </div>
      <div className="border-white b-2 rounded-md bg-white p-5 ">
        <ShoppingCartIcon height={50} width={50} />
        <CartItems />
      </div>
    </div>
  );
};
export default Page;

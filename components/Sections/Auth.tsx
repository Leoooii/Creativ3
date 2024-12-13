"use client";

import React from "react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-store-provider";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Auth = () => {
  const { user, isAdmin, login, logout } = useAuth();
  const router = useRouter();

  const adminText = isAdmin ? "Admin" : "";
  const disconnect = () => {
    logout().then(() => {
      console.log("iesire");
      router.push("/auth");
    });
  };

  return (
    <div>
      {user ? (
        <div className="flex flex-col sm:flex-row justify-around  mx-2">
          <div className={"w-full flex flex-col  sm:flex-row gap-3"}>
            <div className={"flex justify-center"}>
              {user?.photoURL ? (
                <Image
                  alt={"profile pic"}
                  className={"rounded-full size-fit "}
                  height={80}
                  src={user.photoURL}
                  width={100}
                />
              ) : (
                <UserCircleIcon className="w-24" />
              )}
            </div>
            <div className={"flex justify-center items-center"}>
              <h1 className={" text-3xl"}>
                {adminText} {user.displayName}
              </h1>
              <h2>{user.email}</h2>
            </div>
          </div>
          <div className={" flex justify-center"}>
            {/*<Button*/}
            {/*  color={"danger"}*/}
            {/*  size={"sm"}*/}
            {/*  onClick={disconnect}*/}
            {/*  className={"z-50"}*/}
            {/*>*/}
            {/*  Logout*/}
            {/*</Button>*/}
            <button
              onClick={disconnect}
              className={
                "border-1 border-red-400 rounded-2xl bg-red-100 px-4 py-2 text-red-500 " +
                "  hover:opacity-50 my-2"
              }
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center content-center mx-2 mt-5">
          {/*<Button*/}
          {/*  color={"primary"}*/}
          {/*  size={"lg"}*/}
          {/*  variant={"faded"}*/}
          {/*  onClick={login}*/}
          {/*>*/}
          {/*  Login with Google*/}
          {/*</Button>*/}
          <button
            onClick={login}
            className={
              "border-1 border-gray-400 rounded-2xl bg-gray-100 px-5 py-2 text-blue-500 hidden" +
              " sm:block hover:opacity-50"
            }
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;

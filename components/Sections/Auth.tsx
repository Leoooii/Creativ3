"use client";

import React from "react";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-store-provider";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Auth = () => {
  const { user, isAdmin, login, logout } = useAuth();
  // const { items } = useCartStore();
  const router = useRouter();

  const adminText = isAdmin ? "Admin" : "";

  return (
    <div>
      {user ? (
        <div className="flex justify-around  mx-2">
          <div className={"w-full flex gap-3"}>
            {user?.photoURL ? (
              <>
                <Image
                  alt={"profile pic"}
                  className={"rounded-full size-fit"}
                  height={80}
                  src={user.photoURL}
                  width={100}
                />
              </>
            ) : (
              <UserCircleIcon className="w-24" />
            )}
            <div>
              <h1 className={" text-3xl"}>
                {adminText} {user.displayName}
              </h1>
              <h2>{user.email}</h2>
            </div>
          </div>
          <div className={" flex justify-center"}>
            <Button
              color={"danger"}
              size={"sm"}
              onClick={() => {
                logout().then(() => {
                  console.log("iesire");
                  router.push("/");
                });
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center content-center mx-2 mt-5">
          <Button
            color={"primary"}
            size={"lg"}
            variant={"faded"}
            onClick={login}
          >
            Login with Google
          </Button>
        </div>
      )}
    </div>
  );
};

export default Auth;

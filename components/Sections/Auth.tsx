"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-store-provider";

const Auth = () => {
  const { user, isAdmin, login, logout } = useAuth();
  // const { items } = useCartStore();
  const router = useRouter();

  const adminText = isAdmin ? "Admin" : "";

  return (
    <div className={"mt-5"}>
      {user ? (
        <div className="flex justify-between ">
          <div className={"w-2/3 "}>
            <h1 className={" text-3xl"}>
              {adminText} {user.displayName}
            </h1>
            <h2>{user.email}</h2>
            <Button
              color={"danger"}
              size={"sm"}
              onClick={() => {
                logout().then(() => {
                  router.push("/");
                });
              }}
            >
              Logout
            </Button>
          </div>
          <div className={" flex justify-center"}>
            {user?.photoURL && (
              <>
                <Image
                  alt={"profile pic"}
                  className={"rounded-full  h-fit"}
                  height={80}
                  src={user.photoURL}
                  width={80}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center content-center mx-2">
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

"use client";

import React from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";

import { useCartStore } from "@/providers/cart-store";

const CustomButton = ({ id }: { id: number }) => {
  const { addItem } = useCartStore();
  const router = useRouter();

  return (
    <div>
      <button
        className={
          "bg-blue-100 text-blue-900 px-3 py-1 rounded-xl border-1 border-blue-900" +
          " hover:opacity-75 "
        }
        onClick={() => {
          addItem(id);
          toast.success("Adaugare reusita!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          router.push("/auth");
        }}
      >
        Adauga in cos
      </button>
    </div>
  );
};

export default CustomButton;

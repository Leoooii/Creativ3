"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";

import { addCategory, fetchCategories } from "@/lib/data";
import { Category } from "@/lib/definitions";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AddCategoryForm = () => {
  // const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories(); // Fetch categories din backend

        setCategories(fetchedCategories); // Setează categoriile
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async () => {
    const { message } = await addCategory(newCategory);

    toast.success(message, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    router.push("/");
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <h1 className={"font-bold"}>Categorii existente:</h1>
      <div className={"grid grid-cols-2 "}>
        {categories &&
          categories.map((category) => {
            return <div key={category.name}>{category.name}</div>;
          })}
      </div>
      <Input
        placeholder={"Categorie"}
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button
        color="primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        Adaugă categorie
      </Button>
    </div>
  );
};

export default AddCategoryForm;

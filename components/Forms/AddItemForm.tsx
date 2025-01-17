"use client";

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Input,
  Switch,
  Textarea,
} from "@nextui-org/react";

import AutocompleteComponent from "@/components/Sections/AutocompleteComponent";

import { addMaterial, fetchCategories } from "@/lib/data";
import { Category } from "@/lib/definitions";
import { Bounce, toast } from "react-toastify";

const defaultImg =
  "https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/upload-bold-arrow-icon.png";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(true);
  const [unit, setUnit] = useState("");

  const [category, setCategory] = useState("Test");
  const [categories, setCategories] = useState<Category[]>([]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { message } = await addMaterial(
      name,
      price,
      imageURL,
      description,
      available,
      category,
      unit,
    );
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // alert(message);
  };

  const handleCategory = async (category: string): Promise<void> => {
    setCategory(category);
  };

  const onUnitChange = (unit: string) => {
    setUnit(unit);
  };

  return (
    <form
      className="flex flex-col p-5 bg-white gap-2 justify-center"
      onSubmit={handleSubmit}
    >
      <Input
        required
        label="Nume produs"
        placeholder="Introduceti numele produsului"
        size="md"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        required
        label="Pret"
        placeholder="Introduceti pretul"
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        required
        label="URL imagine"
        maxLength={250}
        placeholder="URL imagine"
        value={imageURL}
        onChange={(e) => {
          setImageURL(e.target.value);
          console.log(e.target.value);
        }}
      />

      <div className="flex justify-center opacity-100">
        <Image
          alt="preview"
          height={100}
          src={imageURL || defaultImg}
          width={100}
        />
      </div>

      <Textarea
        required
        label="Descrierea produsului"
        placeholder="Introduceti descrierea produsului"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={"flex gap-1"}>
        <AutocompleteComponent
          categories={categories}
          defaultValue={""}
          setCategory={handleCategory}
        />
        <Autocomplete
          allowsCustomValue={false}
          className="max-w-xs"
          label={"Unitate de masura"}
          variant="bordered"
          onInputChange={onUnitChange}
        >
          {["kg", "buc", "l", "ml"].map((item) => {
            return <AutocompleteItem key={item}>{item}</AutocompleteItem>;
          })}
        </Autocomplete>
      </div>

      <Switch isSelected={available} onValueChange={setAvailable}>
        In stoc
      </Switch>

      <Button color="primary" type="submit">
        Adauga
      </Button>
    </form>
  );
};

export default AddItemForm;

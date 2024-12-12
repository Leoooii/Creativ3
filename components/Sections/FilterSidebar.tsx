import React from "react";
import { Slider } from "@nextui-org/react";

import { Category } from "@/lib/definitions";
import BreadCrumbBar from "@/components/UI/components/BreadCrumbBar";
import CustomModal from "@/components/Custom/CustomModal";
import AddItemForm from "@/components/Forms/AddItemForm";
import AddCategoryForm from "@/components/Forms/AddCategoryForm";

interface FilterSidebarProps {
  categories: Category[];
  setCategory: (category: string) => Promise<void>;
  value: number[];
  setValue: (value: number[]) => void;
  page: number;
  setPage: (page: number) => void;
  numberOfPages: number;
  reload: () => Promise<void>;
  isAdmin: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  value,
  setValue,
  isAdmin,
}: FilterSidebarProps) => (
  <div className=" flex flex-col  gap-2  border-b-4 p-1  h-full text-gray-300 font-extrabold">
    <div
      className={
        "flex flex-col justify-center sm:flex-row sm:justify-between gap-5"
      }
    >
      <BreadCrumbBar />

      <Slider
        className="max-w-sm mb-3"
        color={"secondary"}
        formatOptions={{ style: "currency", currency: "LEI" }}
        label="Interval preț"
        maxValue={300}
        minValue={0}
        step={10}
        value={value}
        onChange={(value: number | number[]) =>
          setValue(Array.isArray(value) ? value : [value])
        }
      />
    </div>

    <div>
      {isAdmin && (
        <div className={"flex gap-1"}>
          <CustomModal buttonName={"Adauga Item"} header={"Adauga item"}>
            <AddItemForm />
          </CustomModal>
          <CustomModal
            buttonName={"Adauga Categorie"}
            header={"Adauga categorie"}
          >
            <AddCategoryForm />
          </CustomModal>
        </div>
      )}
    </div>
  </div>
);

export default FilterSidebar;

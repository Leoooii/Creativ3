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
  <div className=" flex flex-col  gap-2  border-b-2 p-1  h-full text-gray-300 font-extrabold rounded-b-xl  ">
    <div
      className={
        "flex flex-col justify-around sm:flex-row sm:justify-around gap-5 align-middle  "
      }
    >
      <div className={"my-auto w-full sm:w-1/3 flex justify-center"}>
        <BreadCrumbBar />
      </div>

      <Slider
        className="w-full sm:w-1/3 mb-3 "
        color={"primary"}
        formatOptions={{ style: "currency", currency: "LEI" }}
        label="Interval preț"
        maxValue={700}
        minValue={0}
        step={5}
        value={value}
        onChange={(value: number | number[]) =>
          setValue(Array.isArray(value) ? value : [value])
        }
      />

      {isAdmin && (
        <div
          className={
            "flex gap-1 align-middle my-auto w-full sm:w-1/3 justify-center"
          }
        >
          <CustomModal buttonName={"Adauga produs"} header={"Adauga produs"}>
            <AddItemForm />
          </CustomModal>
          <CustomModal
            buttonName={"Adauga categorie"}
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

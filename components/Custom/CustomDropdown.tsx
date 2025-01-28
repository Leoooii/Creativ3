import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "@nextui-org/link";
import React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface DropdownItemType {
  label: string;
}

interface DropdownComponentProps {
  array: DropdownItemType[];
  name: string;
}

export const CustomDropdown = ({
  array = [],
  name,
}: DropdownComponentProps) => {
  return (
    <Dropdown backdrop="transparent">
      <DropdownTrigger>
        <Button
          className={"rounded-sm bg-transparent text-gray-100 my-2"}
          color={"primary"}
          size={"md"}
        >
          <div className={"flex gap-2 "}>
            <h1 className={"font-bold"}>{name.toUpperCase()}</h1>

            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        className={"max-w-72"}
        color="secondary"
        items={array}
        variant="faded"
      >
        {(item: DropdownItemType) => (
          <DropdownItem
            key={item.label}
            className={"default bg-white font-bold p-1"}
            // color={"primary"}
          >
            <Link href={`/catalog?category=${item.label}`}>
              {item.label.toUpperCase()}
            </Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

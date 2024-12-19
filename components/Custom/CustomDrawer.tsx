"use client";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

interface DrawerProps {
  buttonName: string;
  header: string;

  children?: ReactNode;
}

const CustomDrawer: React.FC<DrawerProps> = ({
  buttonName,
  header,
  children,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="warning" variant="flat" onClick={onOpen}>
        {buttonName}
      </Button>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {header}
              </DrawerHeader>
              <DrawerBody>{children}</DrawerBody>
              <DrawerFooter>
                <Button variant={"flat"} color={"primary"} onClick={onClose}>
                  Inchide
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomDrawer;

"use client";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { deleteMaterial, updateMaterial } from "@/lib/data";

export default function CustomDrawer({
  id,
  name,
  description,
  price,
  onRefreshAction,
}: {
  id: number;
  name: string;
  description: string;
  price: string;
  onRefreshAction: () => Promise<void>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newName, setNewName] = React.useState(name);
  const [newPrice, setNewPrice] = React.useState(price);
  const [newDescription, setNewDescription] = React.useState(description);

  const handleEdit = async () => {
    const { message } = await updateMaterial(
      id,
      newName,
      Number(newPrice),
      description,
    );

    alert(message);
  };
  const handleDelete = async () => {
    const { message } = await deleteMaterial(id);

    await onRefreshAction();
    alert(message);
  };

  return (
    <>
      <Button color="warning" variant="flat" onClick={onOpen}>
        Editeaza
      </Button>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Modificare produs
              </DrawerHeader>
              <DrawerBody>
                <Input
                  label="Nume"
                  placeholder="Modifica numele"
                  variant="bordered"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <Textarea
                  label="Descriere"
                  placeholder="Modifica descrierea"
                  variant="bordered"
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <Input
                  label={"Pret"}
                  placeholder={"Modifica pretul"}
                  variant={"bordered"}
                  type={"number"}
                  step={"0,01"}
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </DrawerBody>
              <DrawerFooter>
                <Button
                  color={"secondary"}
                  variant={"flat"}
                  onClick={() => {
                    handleEdit()
                      .then(() => onClose())
                      .finally(() => onRefreshAction());
                  }}
                >
                  Editeaza
                </Button>
                <Button
                  color="danger"
                  variant={"flat"}
                  onClick={() => {
                    handleDelete().then(() => onClose());
                  }}
                >
                  Sterge materialul
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

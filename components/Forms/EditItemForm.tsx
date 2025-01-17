import React from "react";
import { deleteMaterial, updateMaterial } from "@/lib/data";
import { Button, Input, Textarea } from "@nextui-org/react";

const EditItemForm = ({
  id,
  name,
  description,
  price,
  category,
  onRefreshAction,
}: {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  onRefreshAction: () => Promise<void>;
}) => {
  const [newName, setNewName] = React.useState(name);
  const [newPrice, setNewPrice] = React.useState(price);
  const [newDescription, setNewDescription] = React.useState(description);
  const [newCategory, setNewCategory] = React.useState(category);

  const handleEdit = async () => {
    const { message } = await updateMaterial(
      id,
      newName,
      Number(newPrice),
      newDescription,
      newCategory,
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
        label="Categorie"
        placeholder="Modifica categoria"
        variant="bordered"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
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
      <div className={"flex gap-1 justify-end"}>
        <Button
          color={"secondary"}
          variant={"flat"}
          onClick={() => {
            handleEdit().finally(() => onRefreshAction());
          }}
        >
          Editeaza
        </Button>
        <Button
          color="danger"
          variant={"flat"}
          onClick={() => {
            handleDelete().finally(() => onRefreshAction());
          }}
        >
          Sterge materialul
        </Button>
      </div>
    </>
  );
};
export default EditItemForm;

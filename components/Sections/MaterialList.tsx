// /components/MaterialList.tsx
import React from "react";

import MaterialCard from "@/components/Sections/MaterialCard";
import { Material } from "@/lib/definitions";

interface MaterialListProps {
  materials: Material[];
  loadMaterials: () => Promise<void>;
  isAdmin: boolean;
}

const MaterialList: React.FC<MaterialListProps> = ({
  materials,
  loadMaterials,
  isAdmin,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 py-5">
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          onRefresh={loadMaterials}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default MaterialList;

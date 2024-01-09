"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import Create from "./create";

export default function CreateWarehouse() {
  const [selected, setSelected] = useState("create");

  const handleSelectionChange = (key: React.Key) => {
    setSelected(String(key)); // Átalakítjuk a kulcsot stringgé
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-65px)] mt-24 justify-start items-center">
      <div className="w-auto flex flex-col items-center ">
        <Create />
      </div>
    </div>
  );
}

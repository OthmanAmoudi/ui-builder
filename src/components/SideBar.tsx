import React from "react";
import { usePageElements } from "./hooks/useElements";
import SideBarElements from "./SideBarElements";
import { IconX } from "@tabler/icons-react";
import { PageElements } from "./PageElements";

export default function SideBar() {
  return (
    <div className="w-[400px] max-w-[400px] flex flex-grow border p-4 -min-h-[700px] h-full overflow-y-auto bg-white flex-col">
      <PropertiesForm />
      <SideBarElements />
    </div>
  );
}

function PropertiesForm() {
  const { selectedPageElement, setPageElement, updateElement } =
    usePageElements();

  if (!selectedPageElement) return null;

  const PropertiesForm =
    PageElements[selectedPageElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col border flex-grow gap-2 p-2 mb-4 min-h-[200px]">
      <div className="flex justify-between">
        Element Properties:
        <IconX onClick={() => setPageElement(null)} />
      </div>
      <PropertiesForm
        elementInstance={selectedPageElement}
        updateElement={updateElement}
      />
    </div>
  );
}

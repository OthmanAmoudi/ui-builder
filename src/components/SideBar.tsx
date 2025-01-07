import React from "react";
import { SidebarBtnElement } from "./SidebarBtnElement";
import { PageElements } from "./PageElements";

export default function SideBar() {
  return (
    <div className="w-[400px] max-w-[400px] flex flex-grow border p-4 -min-h-[700px] h-full overflow-y-auto bg-white flex-col">
      <h1 className="text-sm font-semibold">Elements:</h1>
      <div className="flex flex-wrap gap-2">
        <SidebarBtnElement pageElement={PageElements.TextField} />
        <SidebarBtnElement pageElement={PageElements.TextField} />
        <SidebarBtnElement pageElement={PageElements.TextField} />
      </div>
    </div>
  );
}

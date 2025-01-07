import React from "react";
import { SidebarBtnElement } from "./SidebarBtnElement";
import { PageElements } from "./PageElements";
export default function SideBarElements() {
  return (
    <>
      <h1 className="text-sm font-semibold">Elements:</h1>
      <div className="flex flex-wrap gap-2">
        <SidebarBtnElement pageElement={PageElements.Header} />
        <SidebarBtnElement pageElement={PageElements.Navbar} />
        <SidebarBtnElement pageElement={PageElements.TextField} />
        <SidebarBtnElement pageElement={PageElements.Box} />
        <SidebarBtnElement pageElement={PageElements.TextBlock} />
        <SidebarBtnElement pageElement={PageElements.ImageElement} />
        <SidebarBtnElement pageElement={PageElements.Footer} />
        <SidebarBtnElement pageElement={PageElements.ImageTextElement} />
      </div>
    </>
  );
}

"use client";

import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementOverlay } from "./SidebarBtnElement";
import { ElementsType, PageElements } from "./PageElements";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  if (!draggedItem) return null;

  let node = <div>node drage overlay</div>;
  const isSideBarElement = draggedItem.data?.current?.isDropzoneElement;
  console.log({ isSideBarElement });
  if (isSideBarElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementOverlay pageElement={PageElements[type]} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
}

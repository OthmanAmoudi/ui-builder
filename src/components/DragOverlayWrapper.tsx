"use client";

import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementOverlay } from "./SidebarBtnElement";
import { ElementsType, PageElements } from "./PageElements";
import { usePageElements } from "./hooks/useElements";

export default function DragOverlayWrapper() {
  const { elements } = usePageElements();

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

  let node = <div>no drag overlay</div>;
  const isSideBarElement = draggedItem.data?.current?.isDropzoneElement;

  if (isSideBarElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementOverlay pageElement={PageElements[type]} />;
  }

  const isDropzoneComponentElement =
    draggedItem.data?.current?.isDropzoneComponentElement;
  if (isDropzoneComponentElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      node = <div>not found!</div>;
    } else {
      const DropzoneElementComponent =
        PageElements[element.type].dropzoneComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-90 pointer-events-none">
          <DropzoneElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

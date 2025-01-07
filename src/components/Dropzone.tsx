"use client";

import React from "react";
import SideBar from "./SideBar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { usePageElements } from "./hooks/useElements";
import { ElementsType, PageElements } from "./PageElements";

export default function Dropzone() {
  const { elements, addElement, removeElement } = usePageElements();
  const dropContainer = useDroppable({
    id: "page-drop-area",
    data: {
      isDropzoneDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isPageBtnElement = active.data?.current?.isDropzoneElement;
      if (isPageBtnElement) {
        const type = active.data?.current?.type;
        const newPageElements = PageElements[type as ElementsType].construct(
          Math.floor(Math.random() * 100000).toString()
        );
        addElement(0, newPageElements);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full" ref={dropContainer.setNodeRef}>
        <div
          className={cn(
            "bg-background p-4 border border-gray-300 h-full m-auto rounded-xl flex flex-grow flex-col justify-start items-center flex-1 overflow-y-auto",
            dropContainer.isOver && "ring-2 ring-blue-400"
          )}
        >
          {dropContainer.isOver && (
            <div className="w-full h-[200px] bg-slate-300 rounded-lg"></div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              {elements.map((element, i) => (
                <div key={element.id} className="bg-red-300">
                  <button onClick={() => removeElement(i)}>Remove</button>
                </div>
              ))}
            </div>
          )}
          {!dropContainer.active && (
            <p className="text-muted-foreground flex flex-grow items-center font-bold">
              Drop elements here
            </p>
          )}
        </div>
      </div>
      <SideBar />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { usePageElements } from "./hooks/useElements";
import {
  ElementsType,
  PageElementInstance,
  PageElements,
} from "./PageElements";
import { Button } from "./ui/button";
import { IconTrash } from "@tabler/icons-react";

export default function Dropzone() {
  const { elements, addElement, setPageElement, reorderElements } =
    usePageElements();
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
      const isDropzoneComponentElement =
        active.data?.current?.isDropzoneComponentElement;

      if (isPageBtnElement) {
        const type = active.data?.current?.type;
        const newPageElements = PageElements[type as ElementsType].construct(
          Math.floor(Math.random() * 100000).toString()
        );
        addElement(0, newPageElements);
      } else if (isDropzoneComponentElement) {
        // Handle reordering
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        if (activeId && overId && activeId !== overId) {
          reorderElements(activeId, overId);
        }
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => setPageElement(null)}
        ref={dropContainer.setNodeRef}
      >
        <div
          className={cn(
            "bg-background p-4 border border-gray-300 h-full m-auto rounded-xl flex flex-grow flex-col justify-start items-center flex-1 overflow-y-auto",
            dropContainer.isOver && "ring-2 ring-blue-400"
          )}
        >
          {dropContainer.isOver && (
            <div className="w-full h-[200px] bg-slate-300 rounded-lg"></div>
          )}
          {elements.length > 0 ? (
            <div className="flex flex-col gap-2 w-full">
              {elements.map((element) => (
                <PageElementWrapper key={element.id} element={element} />
              ))}
            </div>
          ) : (
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

function PageElementWrapper({ element }: { element: PageElementInstance }) {
  const { removeElement, setPageElement, selectedPageElement } =
    usePageElements();
  console.log({ selectedPageElement });
  const [mouseEnter, setMouseEnter] = useState(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfComponentElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfComponentElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDropzoneComponentElement: true,
    },
  });
  if (draggable.isDragging) return null;
  const UiComponent = PageElements[element.type].dropzoneComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setMouseEnter(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setMouseEnter(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPageElement(element);
      }}
      className="relative flex flex-col h-[120px] text-foreground hover:cursor-pointer ring-accent ring-1 ring-inset overflow-hidden"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      >
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute w-full bottom-0 h-1/2 rounded-b-md"
        ></div>
      </div>
      {mouseEnter && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
              className="flex justify-center h-full border rounded-lg rounded-l-none bg-red-400"
            >
              <IconTrash className="w-8 h-8 text-white" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-sm text-muted-foreground">
              Click to edit or drag to reorder
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[6px] bg-blue-500 rounded-b-none"></div>
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-gray-400/20 px-4 py-2 pointer-events-none opacity-100",
          mouseEnter && "opacity-40",

          bottomHalf.isOver && "border-b-4 border-b-blue-500"
        )}
      >
        <UiComponent elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[6px] bg-blue-500 rounded-t-none"></div>
      )}
    </div>
  );
}

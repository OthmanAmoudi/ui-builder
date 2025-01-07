import React from "react";
import { PageElement } from "./PageElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export function SidebarBtnElement({
  pageElement,
}: {
  pageElement: PageElement;
}) {
  const { icon: Icon, label } = pageElement.sidebarPreviewBtn;
  const draggable = useDraggable({
    id: `dropzone-btn-${pageElement.type}`,
    data: {
      type: pageElement.type,
      isDropzoneElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col justify-center items-center w-[130px] h-[130px]",
        draggable.isDragging ?? "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="cursor-grab" style={{ width: "32px", height: "32px" }} />
      <p className="text-sm text-gray-500 font-semibold">{label}</p>
    </Button>
  );
}
export function SidebarBtnElementOverlay({
  pageElement,
}: {
  pageElement: PageElement;
}) {
  const { icon: Icon, label } = pageElement.sidebarPreviewBtn;
  return (
    <Button
      variant={"outline"}
      className="flex flex-col justify-center items-center w-[130px] h-[130px]"
    >
      <Icon className="cursor-grab" style={{ width: "32px", height: "32px" }} />
      <p className="text-sm text-gray-500 font-semibold">{label}</p>
    </Button>
  );
}

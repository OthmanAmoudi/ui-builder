import React from "react";
import PreviewArea from "./PreviewArea";
import { DndContext } from "@dnd-kit/core";

export default function Builder() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">Website Builder</h1>
      <DndContext>
        <div className="flex w-full gap-4 h-full bg-accent justify-center relative overflow-y-auto bg-[url(/graph-paper.svg)]">
          <PreviewArea />
        </div>
      </DndContext>
    </div>
  );
}

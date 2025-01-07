"use client";
import React, { useId } from "react";
import PreviewArea from "./PreviewArea";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { ImportExportActions } from "./ImportExportActions";
// import dynamic from 'next/dynamic';
// const DndContext = dynamic(() => import('@dnd-kit/core'), {
//   ssr: false,
// });
export default function Builder() {
  const mouseSensors = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensors = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensors, touchSensors);
  const id = useId();
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold p-4">Website Builder</h1>
        <ImportExportActions />
      </div>
      <DndContext id={id} sensors={sensors}>
        <div className="flex w-full gap-4 h-full bg-accent justify-center relative overflow-y-auto bg-[url(/graph-paper.svg)]">
          <PreviewArea />
        </div>
        <DragOverlayWrapper />
      </DndContext>
    </div>
  );
}

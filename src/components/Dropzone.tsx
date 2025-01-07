"use client";

import React from "react";
import SideBar from "./SideBar";

export default function Dropzone() {
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div className="bg-background border border-gray-300 h-full m-auto rounded-xl flex flex-grow flex-col justify-start items-center flex-1 overflow-y-auto">
          <p className="text-muted-foreground flex flex-grow items-center font-bold">
            Drop elements here
          </p>
        </div>
      </div>
      <SideBar />
    </div>
  );
}

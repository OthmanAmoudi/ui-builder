import React from "react";
import Dropzone from "./Dropzone";

export default function PreviewArea() {
  return (
    <div className="w-full border flex flex-grow">
      <Dropzone />
    </div>
  );
}

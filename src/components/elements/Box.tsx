"use client";
import { IconSquare } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const boxType: ElementsType = "Box";

const boxExtraAttributes = {
  content: "Box Content",
  width: "200px",
  height: "150px",
  bgColor: "#e0e0e0",
  borderColor: "#000000",
};

export const Box: PageElement = {
  type: boxType,
  construct: (id: string) => ({
    id,
    type: boxType,
    extraAttributes: boxExtraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconSquare,
    label: "Box",
  },
  dropzoneComponent: BoxComponent,
  pageComponent: () => <div>Box Component</div>,
  propertiesComponent: BoxProperties,
};

function BoxComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof boxExtraAttributes;
  };
  const { content, width, height, bgColor, borderColor } =
    element.extraAttributes;

  return (
    <div
      className="flex justify-center items-center p-4 border rounded-lg"
      style={{
        width,
        height,
        backgroundColor: bgColor,
        borderColor,
      }}
    >
      <p>{content}</p>
    </div>
  );
}

function BoxProperties({
  elementInstance,
  updateElement,
}: {
  elementInstance: PageElementInstance;
  updateElement: (instance: PageElementInstance) => void;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof boxExtraAttributes;
  };
  const [localState, setLocalState] = useState(element.extraAttributes);

  const updateLocalState = useCallback((field: string, value: string) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const applyChanges = useCallback(() => {
    const updatedElement = {
      ...element,
      extraAttributes: localState,
    };
    updateElement(updatedElement);
  }, [element, localState, updateElement]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Content</label>
        <input
          type="text"
          value={localState.content}
          onChange={(e) => updateLocalState("content", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Width</label>
        <input
          type="text"
          value={localState.width}
          onChange={(e) => updateLocalState("width", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Height</label>
        <input
          type="text"
          value={localState.height}
          onChange={(e) => updateLocalState("height", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Background Color</label>
        <input
          type="color"
          value={localState.bgColor}
          onChange={(e) => updateLocalState("bgColor", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Border Color</label>
        <input
          type="color"
          value={localState.borderColor}
          onChange={(e) => updateLocalState("borderColor", e.target.value)}
          className="w-full"
        />
      </div>

      <button
        onClick={applyChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Apply Changes
      </button>
    </div>
  );
}

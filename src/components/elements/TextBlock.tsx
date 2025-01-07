"use client";
import { IconTextPlus } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const plainTextType: ElementsType = "TextBlock";

const plainTextExtraAttributes = {
  content: "This is a plain text",
  textColor: "#000000",
  bgColor: "#ffffff",
};

export const TextBlock: PageElement = {
  type: plainTextType,
  construct: (id: string) => ({
    id,
    type: plainTextType,
    extraAttributes: plainTextExtraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconTextPlus,
    label: "Plain Text",
  },
  dropzoneComponent: PlainTextComponent,
  pageComponent: () => <div>Plain Text Component</div>,
  propertiesComponent: PlainTextProperties,
};

function PlainTextComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof plainTextExtraAttributes;
  };
  const { content, textColor, bgColor } = element.extraAttributes;

  return (
    <div className="p-4" style={{ color: textColor, backgroundColor: bgColor }}>
      <p>{content}</p>
    </div>
  );
}

function PlainTextProperties({
  elementInstance,
  updateElement,
}: {
  elementInstance: PageElementInstance;
  updateElement: (instance: PageElementInstance) => void;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof plainTextExtraAttributes;
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
        <textarea
          value={localState.content}
          onChange={(e) => updateLocalState("content", e.target.value)}
          className="border rounded px-3 py-2 min-h-[100px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Text Color</label>
        <input
          type="color"
          value={localState.textColor}
          onChange={(e) => updateLocalState("textColor", e.target.value)}
          className="w-full"
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

      <button
        onClick={applyChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Apply Changes
      </button>
    </div>
  );
}

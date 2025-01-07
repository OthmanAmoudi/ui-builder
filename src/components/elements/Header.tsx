"use client";
import { IconLayoutNavbar } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const headerType: ElementsType = "Header";

const headerExtraAttributes = {
  title: "Header Title",
  subtitle: "Subtitle text",
  alignment: "center",
  bgColor: "#ffffff",
  textColor: "#000000",
};

export const Header: PageElement = {
  type: headerType,
  construct: (id: string) => ({
    id,
    type: headerType,
    extraAttributes: headerExtraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconLayoutNavbar,
    label: "Header",
  },
  dropzoneComponent: HeaderComponent,
  pageComponent: () => <div>Header Component</div>,
  propertiesComponent: HeaderProperties,
};

function HeaderComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof headerExtraAttributes;
  };
  const { title, subtitle, alignment, bgColor, textColor } =
    element.extraAttributes;

  return (
    <header
      className="w-full p-4"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        textAlign: alignment as any,
      }}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm opacity-80">{subtitle}</p>
    </header>
  );
}

function HeaderProperties({
  elementInstance,
  updateElement,
}: {
  elementInstance: PageElementInstance;
  updateElement: (instance: PageElementInstance) => void;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof headerExtraAttributes;
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
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={localState.title}
          onChange={(e) => updateLocalState("title", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Subtitle</label>
        <input
          type="text"
          value={localState.subtitle}
          onChange={(e) => updateLocalState("subtitle", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Alignment</label>
        <select
          value={localState.alignment}
          onChange={(e) => updateLocalState("alignment", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
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
        <label className="text-sm font-medium">Text Color</label>
        <input
          type="color"
          value={localState.textColor}
          onChange={(e) => updateLocalState("textColor", e.target.value)}
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

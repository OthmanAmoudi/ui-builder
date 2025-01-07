"use client";
import { IconRectangle } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const textFieldsType: ElementsType = "TextField";

const textFieldsExtraAttributes = {
  fields: ["", "", "", ""],
  buttonLabel: "Submit",
  bgColor: "#ffffff",
  textColor: "#000000",
};

export const TextField: PageElement = {
  type: textFieldsType,
  construct: (id: string) => ({
    id,
    type: textFieldsType,
    extraAttributes: textFieldsExtraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconRectangle,
    label: "Textfield",
  },
  dropzoneComponent: TextFieldsWithButtonComponent,
  pageComponent: () => <div>Textfields</div>,
  propertiesComponent: TextFieldsWithButtonProperties,
};

function TextFieldsWithButtonComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof textFieldsExtraAttributes;
  };
  const { fields, buttonLabel, bgColor, textColor } = element.extraAttributes;

  return (
    <div
      className="p-4 flex w-full items-center justify-center"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <input
        type="text"
        value={fields[0]}
        readOnly
        className="border rounded px-3 py-2 mb-2 w-full"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        {buttonLabel}
      </button>
    </div>
  );
}

function TextFieldsWithButtonProperties({
  elementInstance,
  updateElement,
}: {
  elementInstance: PageElementInstance;
  updateElement: (instance: PageElementInstance) => void;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof textFieldsExtraAttributes;
  };
  const [localState, setLocalState] = useState(element.extraAttributes);

  const updateLocalState = useCallback((field: string, value: any) => {
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
        <label className="text-sm font-medium">Textfield</label>
        <input
          type="text"
          value={localState.fields[0]}
          onChange={(e) =>
            updateLocalState("fields", [
              ...localState.fields[0],
              e.target.value,
              ...localState.fields[0],
            ])
          }
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Button Label</label>
        <input
          type="text"
          value={localState.buttonLabel}
          onChange={(e) => updateLocalState("buttonLabel", e.target.value)}
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

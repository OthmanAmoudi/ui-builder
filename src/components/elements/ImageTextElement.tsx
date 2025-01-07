"use client";
import { IconPhotoEdit } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";
import { useCallback, useState } from "react";
import Image from "next/image";

const type: ElementsType = "ImageTextElement";

const extraAttributes = {
  title: "Enter title here",
  description: "Enter description here",
  imageSrc: "/placeholder.jpg",
  imageAlt: "Placeholder image",
  titleColor: "#000000",
  descriptionColor: "#666666",
  backgroundColor: "#ffffff",
};

export const TextWithImage: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconPhotoEdit,
    label: "Text with Image",
  },
  dropzoneComponent: TextWithImageComponent,
  pageComponent: () => <div>Text with Image Component</div>,
  propertiesComponent: TextWithImageProperties,
};

type TextWithImageType = PageElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function TextWithImageComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as TextWithImageType;
  const {
    title,
    description,
    imageSrc,
    imageAlt,
    titleColor,
    descriptionColor,
    backgroundColor,
  } = element.extraAttributes;

  return (
    <div
      className="flex justify-between w-full gap-4 p-2 rounded-lg"
      style={{ backgroundColor }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
          {title}
        </h2>
        <p className="text-base" style={{ color: descriptionColor }}>
          {description}
        </p>
      </div>
      <div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={200}
          height={150}
          style={{ objectFit: "cover" }}
          className="w-full h-16 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

function TextWithImageProperties({
  elementInstance,
  updateElement,
}: {
  elementInstance: PageElementInstance;
  updateElement: (instance: PageElementInstance) => void;
}) {
  const element = elementInstance as TextWithImageType;

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
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={localState.description}
          onChange={(e) => updateLocalState("description", e.target.value)}
          className="border rounded px-3 py-2 min-h-[100px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={localState.imageSrc}
          onChange={(e) => updateLocalState("imageSrc", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Image Alt Text</label>
        <input
          type="text"
          value={localState.imageAlt}
          onChange={(e) => updateLocalState("imageAlt", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Title Color</label>
          <input
            type="color"
            value={localState.titleColor}
            onChange={(e) => updateLocalState("titleColor", e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Description Color</label>
          <input
            type="color"
            value={localState.descriptionColor}
            onChange={(e) =>
              updateLocalState("descriptionColor", e.target.value)
            }
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Background Color</label>
          <input
            type="color"
            value={localState.backgroundColor}
            onChange={(e) =>
              updateLocalState("backgroundColor", e.target.value)
            }
            className="w-full"
          />
        </div>
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

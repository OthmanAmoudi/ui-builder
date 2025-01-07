"use client";
import { IconPhoto } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";
import { useCallback, useState } from "react";
import Image from "next/image";

const type: ElementsType = "ImageElement";

const extraAttributes = {
  src: "/placeholder.png",
  alt: "Image description",
  width: 100,
  height: 200,
  objectFit: "cover",
};

export const ImageElement: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconPhoto,
    label: "Image",
  },
  dropzoneComponent: ImageComponent,
  pageComponent: () => <div>Image Component</div>,
  propertiesComponent: ImagePropertiesComponent,
};

type ImageElementType = PageElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function ImageComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as ImageElementType;
  const { src, alt, width, height, objectFit } = element.extraAttributes;

  return (
    <div className="flex w-full justify-center overflow-hidden">
      <Image
        src={src || "/placeholder.png"}
        alt={alt}
        layout="responsive"
        width={width}
        height={height}
        objectFit={objectFit as any}
        className="rounded-lg"
      />
    </div>
  );
}

function ImagePropertiesComponent({
  elementInstance,
  updateElement,
}: {
  elementInstance: PageElementInstance;
  updateElement: (instance: PageElementInstance) => void;
}) {
  const element = elementInstance as ImageElementType;
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
        <label className="text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={localState.src}
          onChange={(e) => updateLocalState("src", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Alt Text</label>
        <input
          type="text"
          value={localState.alt}
          onChange={(e) => updateLocalState("alt", e.target.value)}
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
        <label className="text-sm font-medium">Object Fit</label>
        <select
          value={localState.objectFit}
          onChange={(e) => updateLocalState("objectFit", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="none">None</option>
          <option value="scale-down">Scale Down</option>
        </select>
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

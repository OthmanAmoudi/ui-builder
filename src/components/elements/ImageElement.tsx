"use client";
import { IconPhoto } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";
import Image from "next/image";

const type: ElementsType = "ImageElement";

const extraAttributes = {
  src: "/placeholder.png",
  alt: "Image description",
  width: 10,
  height: 10,
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
  propertiesComponent: () => <div>Image Properties</div>,
};

function ImageComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = { ...extraAttributes, ...elementInstance.extraAttributes };

  // Fallback to a placeholder image if `src` is an empty string or undefined
  const src = element.src || "/placeholder.png";

  return (
    <div className="flex w-full justify-center overflow-hidden">
      <Image
        src={src}
        alt={element.alt}
        layout="responsive"
        width={element.width}
        height={element.height}
        objectFit={element.objectFit}
        style={{
          width: element.width,
          height: element.height,
        }}
        className="w-full h-16 object-cover rounded-lg"
      />
    </div>
  );
}

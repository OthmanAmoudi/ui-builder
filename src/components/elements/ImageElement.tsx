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
  src: "/placeholder.jpg",
  alt: "Image description",
  width: "100%",
  height: "auto",
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
  const element = elementInstance as PageElementInstance &
    typeof extraAttributes;
  return (
    <Image
      src={element.src}
      alt={element.alt}
      style={{
        width: element.width,
        height: element.height,
        objectFit: element.objectFit as any,
      }}
      className="rounded"
    />
  );
}

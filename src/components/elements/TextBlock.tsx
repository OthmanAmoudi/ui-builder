"use client";
import { IconTypography } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const type: ElementsType = "TextBlock";

const extraAttributes = {
  text: "Enter your text here",
  fontSize: "16px",
  fontWeight: "normal",
  textAlign: "left",
  color: "#000000",
};

export const TextBlock: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconTypography,
    label: "Text Block",
  },
  dropzoneComponent: TextBlockComponent,
  pageComponent: () => <div>Text Block Component</div>,
  propertiesComponent: () => <div>Text Block Properties</div>,
};

function TextBlockComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance &
    typeof extraAttributes;
  return (
    <p
      style={{
        fontSize: element.fontSize,
        fontWeight: element.fontWeight,
        textAlign: element.textAlign as any,
        color: element.color,
      }}
    >
      {element.text}
    </p>
  );
}

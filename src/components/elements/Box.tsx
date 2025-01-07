"use client";
import { IconBox } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const type: ElementsType = "Box";

const extraAttributes = {
  width: "100%",
  height: "200px",
  bgColor: "#f0f0f0",
  borderRadius: "8px",
  padding: "16px",
};

export const Box: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconBox,
    label: "Box Container",
  },
  dropzoneComponent: BoxComponent,
  pageComponent: () => <div>Box Component</div>,
  propertiesComponent: () => <div>Box Properties</div>,
};

function BoxComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance &
    typeof extraAttributes;
  return (
    <div
      className="border rounded"
      style={{
        width: element.width,
        height: element.height,
        backgroundColor: element.bgColor,
        borderRadius: element.borderRadius,
        padding: element.padding,
      }}
    />
  );
}

//src/components/elements/TextField.tsx
"use client";
import { IconTextRecognition } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "text field",
  sublable: "use text on pages",
  required: false,
  placeholder: "TextField",
};
export const TextField: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconTextRecognition,
    label: "Text field",
  },
  dropzoneComponent: RawComponentUi,
  pageComponent: () => <div>page text field</div>,
  propertiesComponent: () => <div>properties text field</div>,
};

type CustomeComponentType = PageElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function RawComponentUi({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as CustomeComponentType;
  return <div>{element.extraAttributes.label}</div>;
}

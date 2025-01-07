"use client";

import { IconTextRecognition } from "@tabler/icons-react";
import { ElementsType, PageElement } from "../PageElements";

const type: ElementsType = "TextField";

export const TextFieldPageElement: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "text field",
      sublable: "use text on pages",
      required: false,
      placeholder: "TextField",
    },
  }),
  sidebarPreviewBtn: {
    icon: IconTextRecognition,
    label: "Text field",
  },
  dropzoneComponent: () => <div>dropzone text field</div>,
  pageComponent: () => <div>page text field</div>,
  propertiesComponent: () => <div>properties text field</div>,
};

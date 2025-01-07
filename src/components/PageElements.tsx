import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { TextFieldPageElement } from "./elements/TextFieldElement";
import { Icon, IconProps } from "@tabler/icons-react";

export type ElementsType = "TextField";

export type PageElement = {
  type: ElementsType;

  construct: (id: string) => PageElementInstance;

  sidebarPreviewBtn: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    label: string;
  };

  dropzoneComponent: React.FC;
  pageComponent: React.FC;
  propertiesComponent: React.FC;
};

type PageElementType = {
  [key in ElementsType]: PageElement;
};

export type PageElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const PageElements: PageElementType = {
  TextField: TextFieldPageElement,
};

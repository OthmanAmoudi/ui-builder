// src/components/pageElements.tsx
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { TextField } from "./elements/TextField";
import { Icon, IconProps } from "@tabler/icons-react";
import { Header } from "./elements/Header";
import { Footer } from "./elements/Footer";
import { ImageElement } from "./elements/ImageElement";
import { Navbar } from "./elements/Navbar";
import { TextBlock } from "./elements/TextBlock";
import { Box } from "./elements/Box";

export type ElementsType =
  | "TextField"
  | "Header"
  | "Navbar"
  | "Footer"
  | "Box"
  | "TextBlock"
  | "ImageElement";

export type PageElement = {
  type: ElementsType;

  construct: (id: string) => PageElementInstance;

  sidebarPreviewBtn: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    label: string;
  };

  dropzoneComponent: React.FC<{
    elementInstance: PageElementInstance;
  }>;
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
  TextField: TextField,
  Header: Header,
  Navbar: Navbar,
  Footer: Footer,
  Box: Box,
  TextBlock: TextBlock,
  ImageElement: ImageElement,
};

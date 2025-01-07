"use client";
import { IconLayoutNavbar } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const type: ElementsType = "Header";

const extraAttributes = {
  title: "Header Title",
  subtitle: "Subtitle text",
  alignment: "center",
  bgColor: "#ffffff",
  textColor: "#000000",
};

export const Header: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconLayoutNavbar,
    label: "Header",
  },
  dropzoneComponent: HeaderComponent,
  pageComponent: () => <div>Header Component</div>,
  propertiesComponent: () => <div>Header Properties</div>,
};

type HeaderComponentType = PageElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function HeaderComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as HeaderComponentType;
  return (
    <header
      className="w-full p-4 bg-white shadow-sm"
      style={{
        backgroundColor: element.extraAttributes.bgColor,
        color: element.extraAttributes.textColor,
        textAlign: element.extraAttributes.alignment as any,
      }}
    >
      <h1 className="text-2xl font-bold">{element.extraAttributes.title}</h1>
      <p className="text-sm opacity-80">{element.extraAttributes.subtitle}</p>
    </header>
  );
}

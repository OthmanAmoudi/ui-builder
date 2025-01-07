"use client";
import { IconMenu2 } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const type: ElementsType = "Navbar";

const extraAttributes = {
  links: [
    { label: "Home", url: "#" },
    { label: "About", url: "#" },
    { label: "Contact", url: "#" },
  ],
  bgColor: "#ffffff",
  textColor: "#000000",
};

export const Navbar: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconMenu2,
    label: "Navigation Bar",
  },
  dropzoneComponent: NavbarComponent,
  pageComponent: () => <div>Navbar Component</div>,
  propertiesComponent: () => <div>Navbar Properties</div>,
};

function NavbarComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance &
    typeof extraAttributes;
  return (
    <nav className="w-full p-4 flex gap-4 bg-white shadow-sm">
      {element.links.map((link, index) => (
        <a key={index} href={link.url} className="hover:underline">
          {link.label}
        </a>
      ))}
    </nav>
  );
}

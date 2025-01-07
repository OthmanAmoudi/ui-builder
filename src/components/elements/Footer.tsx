"use client";
import { IconLayoutBottombar } from "@tabler/icons-react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const type: ElementsType = "Footer";

const extraAttributes = {
  copyright: "© 2024 Your Company",
  links: [
    { label: "Privacy", url: "#" },
    { label: "Terms", url: "#" },
  ],
  bgColor: "#f8f8f8",
  textColor: "#666666",
};

export const Footer: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconLayoutBottombar,
    label: "Footer",
  },
  dropzoneComponent: FooterComponent,
  pageComponent: () => <div>Footer Component</div>,
  propertiesComponent: () => <div>Footer Properties</div>,
};

function FooterComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance &
    typeof extraAttributes;
  return (
    <footer
      className="w-full p-4 mt-auto"
      style={{
        backgroundColor: element.bgColor,
        color: element.textColor,
      }}
    >
      <div className="flex justify-between items-center">
        <p>{element.copyright}</p>
        <div className="flex gap-4">
          {element.links.map((link, index) => (
            <a key={index} href={link.url} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

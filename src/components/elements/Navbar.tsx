"use client";
import { IconMenu2 } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const navbarType: ElementsType = "Navbar";

const navbarExtraAttributes = {
  title: "Enter Navbar Title",
  links: [
    { label: "Home", url: "#" },
    { label: "About", url: "#" },
    { label: "Contact", url: "#" },
  ],
  titleColor: "#000000",
  backgroundColor: "#ffffff",
};

export const Navbar: PageElement = {
  type: navbarType,
  construct: (id: string) => ({
    id,
    type: navbarType,
    extraAttributes: navbarExtraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconMenu2,
    label: "Navbar",
  },
  dropzoneComponent: NavbarComponent,
  pageComponent: () => <div>Navbar Component</div>,
  propertiesComponent: NavbarProperties,
};

function NavbarComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof navbarExtraAttributes;
  };
  const { title, links, titleColor, backgroundColor } = element.extraAttributes;

  return (
    <nav
      className="flex justify-between w-full items-center p-4"
      style={{ backgroundColor }}
    >
      <h1 className="text-lg font-bold" style={{ color: titleColor }}>
        {title}
      </h1>
      <ul className="flex gap-4">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NavbarProperties({
  elementInstance,
  updateElement,
}: {
  elementInstance: PageElementInstance;
  updateElement: (instance: PageElementInstance) => void;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof navbarExtraAttributes;
  };
  const [localState, setLocalState] = useState(element.extraAttributes);

  const updateLocalState = useCallback((field: string, value: any) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleLinkChange = (
    index: number,
    field: keyof (typeof localState.links)[0],
    value: string
  ) => {
    const updatedLinks = [...localState.links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    updateLocalState("links", updatedLinks);
  };

  const applyChanges = useCallback(() => {
    const updatedElement = {
      ...element,
      extraAttributes: localState,
    };
    updateElement(updatedElement);
  }, [element, localState, updateElement]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Navbar Title</label>
        <input
          type="text"
          value={localState.title}
          onChange={(e) => updateLocalState("title", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Title Color</label>
        <input
          type="color"
          value={localState.titleColor}
          onChange={(e) => updateLocalState("titleColor", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Background Color</label>
        <input
          type="color"
          value={localState.backgroundColor}
          onChange={(e) => updateLocalState("backgroundColor", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Links</label>
        {localState.links.map((link, index) => (
          <div key={index} className="flex flex-col- gap-2">
            <input
              type="text"
              placeholder="Label"
              value={link.label}
              onChange={(e) => handleLinkChange(index, "label", e.target.value)}
              className="border rounded px-3 py-2 w-1/2"
            />
            {/* <small>url for {link.label}:</small> */}
            <input
              type="text"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              className="border rounded px-3 py-2 w-1/2"
            />
          </div>
        ))}
      </div>

      <button
        onClick={applyChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Apply Changes
      </button>
    </div>
  );
}

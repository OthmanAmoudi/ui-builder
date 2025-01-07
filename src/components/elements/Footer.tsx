"use client";
import { IconLayoutBottombar } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import {
  ElementsType,
  PageElement,
  PageElementInstance,
} from "../PageElements";

const footerType: ElementsType = "Footer";

const footerExtraAttributes = {
  text: "Enter Footer Text",
  links: [
    { label: "Privacy Policy", url: "#" },
    { label: "Terms of Service", url: "#" },
  ],
  textColor: "#666666",
  backgroundColor: "#f8f8f8",
};

export const Footer: PageElement = {
  type: footerType,
  construct: (id: string) => ({
    id,
    type: footerType,
    extraAttributes: footerExtraAttributes,
  }),
  sidebarPreviewBtn: {
    icon: IconLayoutBottombar,
    label: "Footer",
  },
  dropzoneComponent: FooterComponent,
  pageComponent: () => <div>Footer Component</div>,
  propertiesComponent: FooterProperties,
};

function FooterComponent({
  elementInstance,
}: {
  elementInstance: PageElementInstance;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof footerExtraAttributes;
  };
  const { text, links, textColor, backgroundColor } = element.extraAttributes;

  return (
    <footer
      className="flex justify-between w-full items-center p-4"
      style={{ backgroundColor }}
    >
      <p className="text-sm " style={{ color: textColor }}>
        {text}
      </p>
      <ul className="flex gap-4 ">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

function FooterProperties({
  elementInstance,
  updateElement,
}: {
  elementInstance: PageElementInstance;
  updateElement: (instance: PageElementInstance) => void;
}) {
  const element = elementInstance as PageElementInstance & {
    extraAttributes: typeof footerExtraAttributes;
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
        <label className="text-sm font-medium">Footer Text</label>
        <input
          type="text"
          value={localState.text}
          onChange={(e) => updateLocalState("text", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Text Color</label>
        <input
          type="color"
          value={localState.textColor}
          onChange={(e) => updateLocalState("textColor", e.target.value)}
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
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Label"
              value={link.label}
              onChange={(e) => handleLinkChange(index, "label", e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              className="border rounded px-3 py-2"
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

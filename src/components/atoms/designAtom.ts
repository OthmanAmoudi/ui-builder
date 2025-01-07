import { atom } from "jotai";
import { pageElementsAtom } from "./elementsAtom";
import { PageElementInstance } from "../PageElements";

export type DesignConfig = {
  version: string;
  elements: PageElementInstance[];
  name: string;
  lastModified: string;
};

// Atom for current design metadata
export const designMetadataAtom = atom<Omit<DesignConfig, "elements">>({
  version: "1.0",
  name: "Untitled Design",
  lastModified: new Date().toISOString(),
});

// Export function
export const exportDesignAtom = atom(null, async (get) => {
  const elements = get(pageElementsAtom);
  const metadata = get(designMetadataAtom);

  const designConfig: DesignConfig = {
    ...metadata,
    elements,
  };

  // Create and download the JSON file
  const blob = new Blob([JSON.stringify(designConfig, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${metadata.name.toLowerCase().replace(/\s+/g, "-")}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

// Import function
export const importDesignAtom = atom(null, async (get, set, file: File) => {
  try {
    const text = await file.text();
    const designConfig: DesignConfig = JSON.parse(text);

    // Validate the imported data
    if (!designConfig.version || !Array.isArray(designConfig.elements)) {
      throw new Error("Invalid design configuration file");
    }

    // Update the state
    set(pageElementsAtom, designConfig.elements);
    set(designMetadataAtom, {
      version: designConfig.version,
      name: designConfig.name,
      lastModified: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("Error importing design:", error);
    return false;
  }
});

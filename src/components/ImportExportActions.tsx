import React, { useRef } from "react";
import { useAtom } from "jotai";
import {
  exportDesignAtom,
  importDesignAtom,
  designMetadataAtom,
} from "../components/atoms/designAtom";
import { IconDownload, IconUpload, IconEdit } from "@tabler/icons-react";

export function ImportExportActions() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, exportDesign] = useAtom(exportDesignAtom);
  const [, importDesign] = useAtom(importDesignAtom);
  const [metadata, setMetadata] = useAtom(designMetadataAtom);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const success = await importDesign(file);
    if (success) {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      alert("Failed to import design. Please check the file format.");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({
      ...metadata,
      name: e.target.value,
      lastModified: new Date().toISOString(),
    });
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="flex items-center gap-2 flex-1">
        <IconEdit className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={metadata.name}
          onChange={handleNameChange}
          className="border-none bg-transparent focus:outline-none text-lg font-medium"
          placeholder="Untitled Design"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 text-sm border rounded hover:bg-gray-50"
        >
          <IconUpload className="w-4 h-4" />
          Import
        </button>

        <button
          onClick={() => exportDesign()}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <IconDownload className="w-4 h-4" />
          Export
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>
    </div>
  );
}

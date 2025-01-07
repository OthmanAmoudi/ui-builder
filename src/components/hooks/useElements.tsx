import { useAtom } from "jotai";
import {
  addElementAtom,
  pageElementsAtom,
  removeElementAtom,
  setPageElementAtom,
  selectedPageElementAtom,
  updateElementAtom,
} from "../atoms/elementsAtom";
import { PageElementInstance } from "../PageElements";

export function usePageElements() {
  const [elements] = useAtom(pageElementsAtom);
  const [, addElement] = useAtom(addElementAtom);
  const [, removeElement] = useAtom(removeElementAtom);
  const [, setPageElement] = useAtom(setPageElementAtom);
  const [selectedPageElement] = useAtom(selectedPageElementAtom);
  const [, updateElement] = useAtom(updateElementAtom);

  return {
    elements,
    addElement: (index: number, element: PageElementInstance) =>
      addElement({ index, element }),
    removeElement: (id: string) => removeElement(id),
    setPageElement: (element: PageElementInstance | null) =>
      setPageElement(element),
    selectedPageElement,
    updateElement: (element: PageElementInstance) => updateElement(element),
  };
}

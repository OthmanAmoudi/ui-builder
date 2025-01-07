import { useAtom } from "jotai";
import {
  addElementAtom,
  pageElementsAtom,
  removeElementAtom,
} from "../atoms/elementsAtom";
import { PageElementInstance } from "../PageElements";

export function usePageElements() {
  const [elements] = useAtom(pageElementsAtom);
  const [, addElement] = useAtom(addElementAtom);
  const [, removeElement] = useAtom(removeElementAtom);

  return {
    elements,
    addElement: (index: number, element: PageElementInstance) =>
      addElement({ index, element }),
    removeElement: (index: number) => removeElement(index),
  };
}

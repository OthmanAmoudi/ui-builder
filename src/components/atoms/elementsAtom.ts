import { PageElementInstance } from "@/components/PageElements";

import { atom } from "jotai";

export const pageElementsAtom = atom<PageElementInstance[]>([]);

export const addElementAtom = atom(
  null,
  (
    get,
    set,
    { index, element }: { index: number; element: PageElementInstance }
  ) => {
    const prevElements = get(pageElementsAtom);
    const newElements = [...prevElements];
    newElements.splice(index, 0, element);
    set(pageElementsAtom, newElements);
  }
);

export const removeElementAtom = atom(null, (get, set, index: number) => {
  const prevElements = get(pageElementsAtom);
  const newElements = [...prevElements];
  newElements.splice(index, 1);
  set(pageElementsAtom, newElements);
});

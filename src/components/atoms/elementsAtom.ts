// src/atoms/elementsAtom.ts
import { atom } from "jotai";
import { PageElementInstance } from "../PageElements";

export const pageElementsAtom = atom<PageElementInstance[]>([]);
export const selectedPageElementAtom = atom<PageElementInstance | null>(null);

export const addElementAtom = atom(
  null,
  (
    get,
    set,
    { index, element }: { index: number; element: PageElementInstance }
  ) => {
    const elements = get(pageElementsAtom);
    const newElements = [...elements];
    newElements.splice(index, 0, element);
    set(pageElementsAtom, newElements);
  }
);

export const removeElementAtom = atom(null, (get, set, id: string) => {
  const elements = get(pageElementsAtom);
  const newElements = elements.filter((element) => element.id !== id);
  set(pageElementsAtom, newElements);
});

export const setPageElementAtom = atom(
  null,
  (get, set, element: PageElementInstance | null) => {
    set(selectedPageElementAtom, element);
  }
);

// Add new atom for updating element properties
export const updateElementAtom = atom(
  null,
  (get, set, updatedElement: PageElementInstance) => {
    const elements = get(pageElementsAtom);
    const newElements = elements.map((element) =>
      element.id === updatedElement.id ? updatedElement : element
    );
    set(pageElementsAtom, newElements);
    set(selectedPageElementAtom, null);
  }
);

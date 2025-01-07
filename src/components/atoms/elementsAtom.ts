import { PageElementInstance } from "@/components/PageElements";

import { atom } from "jotai";

export const pageElementsAtom = atom<PageElementInstance[]>([]);

export const selectedPageElementAtom = atom<PageElementInstance>();
export const setPageElementAtom = atom(
  null,
  (get, set, element: PageElementInstance) => {
    set(selectedPageElementAtom, element);
  }
);

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

export const removeElementAtom = atom(null, (get, set, id: string) => {
  const prevElements = get(pageElementsAtom);
  const newElements = prevElements.filter((element) => element.id !== id);
  set(pageElementsAtom, newElements);
});

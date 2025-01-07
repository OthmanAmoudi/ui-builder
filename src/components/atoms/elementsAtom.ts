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

export const reorderElementsAtom = atom(
  null,
  (get, set, { activeId, overId }: { activeId: string; overId: string }) => {
    const elements = get(pageElementsAtom);

    // Find the indices of the dragged element and the drop target
    const activeIndex = elements.findIndex((el) => el.id === activeId);
    const overIndex = elements.findIndex((el) => el.id === overId);

    if (activeIndex === -1 || overIndex === -1) return;

    // Create new array with reordered elements
    const newElements = [...elements];
    const [draggedElement] = newElements.splice(activeIndex, 1);
    newElements.splice(overIndex, 0, draggedElement);

    // Update the atom with the new order
    set(pageElementsAtom, newElements);
  }
);

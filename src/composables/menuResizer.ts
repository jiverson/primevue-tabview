import { ref } from 'vue';

import { type MaybeComputedElementRef, unrefElement, useResizeObserver } from '@vueuse/core';

export type MenuResizerReturn = ReturnType<typeof useMenuResizer>;
export type UseMenuResizerOptions = {
  classList?: string | string[];
};

export function useMenuResizer(
  target: MaybeComputedElementRef,
  menuItems: Array<HTMLElement>,
  moreElement: HTMLElement,
  options: UseMenuResizerOptions = {}
) {
  const hidden = ref<number[]>([]);
  const classList = Array.isArray(options.classList) ? options.classList : [options.classList ?? 'hidden'];

  const obs = useResizeObserver(target, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;
    resize(width);
  });

  function resize(width?: number) {
    const primaryWidth = width ?? (unrefElement(target) as HTMLElement).offsetWidth;
    let stopWidth = moreElement?.offsetWidth;

    menuItems.forEach((item) => {
      item.classList.remove(...classList);
      hidden.value.shift();
    });
    // hidden.value.splice(0, hidden.value.length);

    menuItems.forEach((item, i) => {
      if (primaryWidth >= stopWidth + item.offsetWidth) {
        stopWidth += item.offsetWidth;
        // item.classList.remove('hidden');
      } else {
        item.classList.add(...classList);
        hidden.value.push(i);
      }
    });

    if (!hidden.value.length) {
      moreElement?.classList.add(...classList);
    } else {
      moreElement?.classList.remove(...classList);
    }
  }

  return {
    forceResize: resize,
    hiddenItems: hidden.value,
    stop: obs.stop,
  };
}

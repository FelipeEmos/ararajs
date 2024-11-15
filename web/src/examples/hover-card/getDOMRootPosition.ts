export function getDOMRootPosition(element: HTMLElement | null | undefined): {
  top: number
  left: number
} {
  if (!element) {
    return { top: 0, left: 0 }
  }
  const parentPosition = getDOMRootPosition(element.offsetParent as HTMLElement)
  return {
    top: element.offsetTop + parentPosition.top,
    left: element.offsetLeft + parentPosition.left,
  }
}

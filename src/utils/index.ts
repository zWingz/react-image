const { documentElement } = document
let scrollBarWidth: number = 0

export function getScrollbarSize(): number {
  if(scrollBarWidth) {
    return scrollBarWidth
  }
  scrollBarWidth = window.innerWidth - documentElement.clientWidth
  return scrollBarWidth
}
export function getDomStyle(dom: HTMLElement, name: string) {
  return window.getComputedStyle(dom)[name]
}

function getBodyOriginPaddingRight(): number {
  return +getDomStyle(document.body, 'paddingRight')
}

export function setScrollbar() {
  const { innerWidth } = window
  const { clientWidth, offsetWidth } = documentElement
  if(clientWidth < innerWidth && innerWidth > offsetWidth) {
    document.body.style.paddingRight = `${getScrollbarSize()
      + getBodyOriginPaddingRight()}px`
  }
}

export function resetScrollbar() {
  document.body.style.paddingRight = ''
}

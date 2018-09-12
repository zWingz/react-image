const { documentElement } = document
let scrollBarWidth = 0

export function getScrollbarSize() {
  if(scrollBarWidth) {
    return scrollBarWidth
  }
  scrollBarWidth = window.innerWidth - documentElement.clientWidth
  return scrollBarWidth
}
export function getDomStyle(dom, name) {
  return window.getComputedStyle(dom)[name]
}

function getBodyOriginPaddingRight() {
  return parseInt(getDomStyle(document.body, 'paddingRight'), 10)
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

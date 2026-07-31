/**
 * Freezes the page behind an overlay and hands back the undo.
 *
 * `document.body.style.overflow = "hidden"` on its own is the reason the page
 * jumped every time the gallery lightbox or the mobile menu opened: on a
 * desktop with a classic scrollbar, hiding the overflow removes that scrollbar,
 * the viewport grows by its width, and the entire layout — sticky header
 * included — slides sideways by some 15px, then slides back on close. The
 * padding replaces exactly the width that was taken away, so nothing moves.
 *
 * The previous values are captured rather than reset to the empty string: two
 * overlays can be open at once (a lightbox on a page whose mobile menu is up),
 * and the one that closes first must not unlock the page for the other.
 */
export function lockScroll(): () => void {
  const body = document.body
  const gap = window.innerWidth - document.documentElement.clientWidth
  const previous = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
  }

  /*
    `overflow: hidden` alone does not hold on iOS Safari.

    Touch-scrolling over an overlay scrolls the document behind it anyway, so
    swiping through the open mobile menu or the photo lightbox moved the page
    underneath, and closing it dropped the visitor somewhere they had never
    navigated to. Only taking the body out of the flow actually stops it — the
    scroll position is stored, applied as a negative offset so nothing appears to
    move, and restored on release.

    `left/right/width` come along because a fixed body loses its width otherwise
    and the layout would collapse to its content.
  */
  const scrollY = window.scrollY

  body.style.overflow = "hidden"
  body.style.position = "fixed"
  body.style.top = `-${scrollY}px`
  body.style.left = "0"
  body.style.right = "0"
  body.style.width = "100%"
  if (gap > 0) {
    const current = parseFloat(getComputedStyle(body).paddingRight) || 0
    body.style.paddingRight = `${current + gap}px`
  }

  return () => {
    body.style.overflow = previous.overflow
    body.style.paddingRight = previous.paddingRight
    body.style.position = previous.position
    body.style.top = previous.top
    body.style.left = previous.left
    body.style.right = previous.right
    body.style.width = previous.width
    /*
      Only the outermost overlay restores the scroll position. A lightbox closing
      on a page whose menu is still open must leave the body fixed — and putting
      the page back to `scrollY` while it is still fixed would scroll the
      document behind the menu, which is the bug this whole function exists to
      prevent.
    */
    if (!body.style.position) window.scrollTo(0, scrollY)
  }
}

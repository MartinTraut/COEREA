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
  }

  body.style.overflow = "hidden"
  if (gap > 0) {
    const current = parseFloat(getComputedStyle(body).paddingRight) || 0
    body.style.paddingRight = `${current + gap}px`
  }

  return () => {
    body.style.overflow = previous.overflow
    body.style.paddingRight = previous.paddingRight
  }
}

/**
 * Marks everything outside a modal surface `inert` — untabbable and hidden from
 * assistive tech — and hands back the function that undoes exactly that.
 *
 * `<main>` alone is not the whole page: in the site layout the header and the
 * footer are its siblings, so an open overlay still let you tab straight into
 * the eleven footer links sitting invisible behind the teal panel. Rather than
 * naming the regions to disable — which breaks again the moment a region is
 * added — this walks from the dialog up to `<body>` and, at each level, marks
 * its siblings inert. The dialog's own ancestor chain is the only path left
 * active, which is exactly the definition of modal.
 *
 * WHY IT RETURNS A RESTORE FUNCTION instead of taking an on/off flag:
 *
 * The flag version could not switch itself off for a dialog that unmounts when
 * it closes, and that is the normal case — the gallery lightbox is rendered
 * only while it is open. React runs an effect's cleanup after the DOM has been
 * updated, so by the time `setOutsideInert(false, dialog)` ran the dialog was
 * already detached: `parentElement` was null, the walk exited on its first
 * check, and nothing was ever restored. The header, the footer and everything
 * outside the vanished gallery stayed `inert` for the rest of the visit, every
 * link and button dead with nothing on screen to explain why. Opening a photo
 * of an area and closing it again broke the page.
 *
 * Capturing the elements at the moment they are disabled drops the dependency
 * on the DOM still being intact later. It also closes a second hole: siblings
 * that were *already* inert — a second overlay above this one — are left alone
 * rather than being switched back on by whichever modal happens to close first.
 */
export function setOutsideInert(node: Element | null): () => void {
  if (!node) return () => {}

  const disabled: HTMLElement[] = []
  let el: Element = node
  while (el !== document.body && el.parentElement) {
    const parent: HTMLElement = el.parentElement
    for (const sibling of Array.from(parent.children)) {
      if (sibling === el || !(sibling instanceof HTMLElement) || sibling.inert) continue
      sibling.inert = true
      disabled.push(sibling)
    }
    el = parent
  }

  return () => {
    for (const sibling of disabled) sibling.inert = false
  }
}

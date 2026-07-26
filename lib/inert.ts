/**
 * Marks everything outside a modal surface `inert` — untabbable and hidden from
 * assistive tech — and puts it back afterwards.
 *
 * The mobile menu used to do this by setting `inert` on `#main` alone. But
 * `<main>` is not the whole page: in the site layout the header and the footer
 * are its siblings, so an open overlay still let you tab straight into the
 * eleven footer links sitting invisible behind the teal panel. The lightbox in
 * the listing gallery had the same hole, and claimed `aria-modal="true"` while
 * the page behind it stayed fully readable.
 *
 * Rather than naming the regions to disable — which breaks again the moment a
 * region is added — this walks from the dialog up to `<body>` and, at each
 * level, marks its siblings inert. The dialog's own ancestor chain is the only
 * path left active, which is exactly the definition of modal.
 */
export function setOutsideInert(on: boolean, node: Element | null) {
  if (!node) return
  let el: Element = node
  while (el !== document.body && el.parentElement) {
    const parent: HTMLElement = el.parentElement
    for (const sibling of Array.from(parent.children)) {
      if (sibling !== el && sibling instanceof HTMLElement) sibling.inert = on
    }
    el = parent
  }
}

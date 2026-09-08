/*
Everything this site's JavaScript does now, in one file with no dependency: the mobile nav toggle
(replacing Bootstrap's `offcanvas` component), the install-command copy buttons (replacing
ClipboardJS, which was wired to every `.btn` on the page, including plain download links that had
no `data-clipboard-*` attribute to act on), and the docs page's "on this page" list.
*/

document.getElementById('nav-toggle')?.addEventListener('click', () => {
  const nav = document.getElementById('site-nav');
  const open = nav.classList.toggle('is-open');
  document.getElementById('nav-toggle').setAttribute('aria-expanded', open);
});

for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    const text = document.getElementById(button.dataset.copy)?.textContent.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const original = button.innerHTML;
      button.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
      setTimeout(() => (button.innerHTML = original), 1500);
    } catch {
      // Clipboard access denied or unavailable — the command is still selectable as plain text.
    }
  });
}

/*
kramdown's tables come out as plain <table>, with nothing around them to scroll — a keybindings table
with a cell like "Cmd+Option+Right-Arrow/Left-Arrow" was forcing the whole page wider than the phone
showing it instead of scrolling in place. Wrapping at runtime rather than asking every doc author to
remember a div is the same call the TOC below makes.
*/
for (const table of document.querySelectorAll('.mk-docs-body table')) {
  const wrap = document.createElement('div');
  wrap.className = 'mk-docs-table-scroll';
  table.replaceWith(wrap);
  wrap.append(table);
}

/*
Built from whatever headings a doc actually has, rather than hand-maintained — a doc with three
sections and a doc with none both work with no extra front matter. `h2, h3` because the docs
themselves are inconsistent about which level starts a section — Key Bindings goes straight to `###`,
Developer Guide uses `##` — and a "page title" `h1` inside a doc's own body (Introduction's "Benchmarks"
section) is content, not a section of itself, so it's deliberately left out of this list. kramdown
already gives every heading an `id` (its own auto-id extension, on by default), so this only falls back
to slugifying the text when one is somehow missing.
*/
const toc = document.getElementById('docs-toc');
if (toc) {
  const headings = document.querySelectorAll('.mk-docs-body h2, .mk-docs-body h3');
  if (headings.length > 1) {
    const label = document.createElement('span');
    label.className = 'mk-docs-group-name';
    label.textContent = 'On this page';
    toc.append(label);
    headings.forEach((h, i) => {
      if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const a = document.createElement('a');
      a.href = `#${h.id}`;
      a.textContent = h.textContent;
      if (i === 0) a.classList.add('is-current');
      toc.append(a);
    });
  }
}

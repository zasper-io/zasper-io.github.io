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

const COPY_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>';
const DONE_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

/*
One copy routine for both callers below. `navigator.clipboard` needs a secure context, so it is
present on the live site and on localhost but not, say, over a plain-http preview on another machine
— and a button that silently does nothing is worse than no button. When the write fails the block is
selected instead, which leaves the reader one Ctrl/Cmd-C away rather than stranded.
*/
async function copyToClipboard(button, text, selectOnFailure) {
  if (!text) return;
  const label = button.getAttribute('aria-label');
  try {
    await navigator.clipboard.writeText(text);
    button.innerHTML = DONE_ICON;
    button.setAttribute('aria-label', 'Copied');
    button.classList.add('is-copied');
  } catch {
    if (!selectOnFailure) return;
    const range = document.createRange();
    range.selectNodeContents(selectOnFailure);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    button.setAttribute('aria-label', 'Press Ctrl or Cmd + C to copy');
  }
  setTimeout(() => {
    button.innerHTML = COPY_ICON;
    button.setAttribute('aria-label', label);
    button.classList.remove('is-copied');
  }, 1500);
}

for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', () =>
    copyToClipboard(button, document.getElementById(button.dataset.copy)?.textContent.trim()),
  );
}

/*
A copy button on every rendered code block, wrapped at runtime for the same reason the tables below
are: asking each doc author to remember a div around every fenced block is a rule that gets forgotten
once and then reads as a bug. Rouge already wraps these in `.highlighter-rouge`, but the wrapper here
is added anyway so a plain <pre> written directly in HTML behaves identically — and so the button's
container is never the element that scrolls, which would carry the button off the edge with the code.

Only trailing whitespace is trimmed: leading indentation is part of what someone is copying.
*/
for (const pre of document.querySelectorAll('.mk-docs-body pre')) {
  const host = document.createElement('div');
  host.className = 'mk-code';
  pre.replaceWith(host);
  host.append(pre);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mk-code-copy';
  button.setAttribute('aria-label', 'Copy code');
  button.title = 'Copy';
  button.innerHTML = COPY_ICON;
  button.addEventListener('click', () =>
    copyToClipboard(button, pre.textContent.replace(/\s+$/, ''), pre),
  );
  host.append(button);
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

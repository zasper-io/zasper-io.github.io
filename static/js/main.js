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

/*
Fetched in the browser, not at build time: Pages only rebuilds on a push, so a baked-in count goes stale.
Cached per session to stay inside the API's 60 unauthenticated requests an hour; hidden if the request fails.
*/
const stars = document.querySelector('[data-github-stars]');
if (stars) {
  const KEY = 'zasper-github-stars';
  const show = (count) => {
    stars.textContent = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
      .format(count)
      .toLowerCase();
    stars.hidden = false;
    stars.closest('a').setAttribute('aria-label', `GitHub, ${count.toLocaleString('en')} stars`);
  };
  let cached = null;
  try {
    cached = JSON.parse(sessionStorage.getItem(KEY));
  } catch {}
  if (typeof cached === 'number') {
    show(cached);
  } else {
    fetch('https://api.github.com/repos/zasper-io/zasper')
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((repo) => {
        show(repo.stargazers_count);
        try {
          sessionStorage.setItem(KEY, JSON.stringify(repo.stargazers_count));
        } catch {}
      })
      .catch(() => {});
  }
}

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
  // A tutorial figure is a picture of the IDE: the <pre> in it is a cell's source, not a sample to
  // copy, and a copy chip floating over the code is the page's furniture inside the product's.
  if (pre.closest('.tut-shot')) continue;
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
  // Same exclusion as the copy buttons: a DataFrame drawn inside a figure already scrolls with the
  // figure, and a scroll container around it would scroll the picture's insides on their own.
  if (table.closest('.tut-shot')) continue;
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

/*
Which platform the visitor is on, and the two places that answer differently because of it: the
downloads page's button, and the landing page's install command.

Both pages render a working answer first — the macOS archive, and `brew install` — so a visitor with
no JavaScript, and the crawler that indexes the page, still get a real command and a real file. This
only swaps them for something likelier.

`navigator.userAgentData` is the current way to ask and exists only in Chromium, so the user agent
string is read where it is missing, which is every Safari and Firefox. Neither tells the truth about
an Apple Silicon Mac: both report Intel, deliberately. So macOS is offered the Apple Silicon build,
which is every Mac sold since 2020, and the Intel one stays a row away in the table.
*/
function visitorPlatform() {
  const hinted = navigator.userAgentData?.platform ?? '';
  const agent = `${hinted} ${navigator.userAgent ?? ''}`.toLowerCase();
  if (agent.includes('mac')) return { os: 'mac', slug: 'darwin-arm64' };
  if (agent.includes('win')) return { os: 'windows', slug: 'windows-amd64' };
  // Android reports Linux too, and has nothing to install: it is left on the default.
  if (agent.includes('linux') && !agent.includes('android')) return { os: 'linux', slug: 'linux-amd64' };
  return null;
}

const platform = visitorPlatform();

// The downloads page: the button follows the row in the table for this platform, so the two agree.
const primary = document.getElementById('dl-primary');
if (primary && platform) {
  const match = document.querySelector(`.mk-dl-files a[data-slug="${platform.slug}"]`);
  if (match) {
    primary.href = match.href;
    document.getElementById('dl-primary-label').textContent = match.dataset.label;
    document.getElementById('dl-primary-size').textContent = match.dataset.size;
  }
}

/*
The landing page: the hero shows the package manager that platform installs from — Homebrew on macOS,
snap on Linux, conda on Windows, which is the one of the three that has a Windows build. The commands
are the downloads page's own, carried here in data attributes so both pages read _data/release.yml
and cannot drift.
*/
const heroCommand = document.getElementById('install-cmd');
if (heroCommand && platform) {
  const command = heroCommand.dataset[platform.os];
  if (command) {
    heroCommand.textContent = command;
  }
}

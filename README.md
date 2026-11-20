# Academic website

A one-page academic website in plain HTML, CSS and a little JavaScript. There's no build step, and it's hosted free on GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | All the text on the site. Look for `EDIT:` comments and `[square brackets]`. |
| `style.css` | Colours, fonts and layout. Change `--accent` at the top (and in the dark-mode block) to change the main colour. |
| `script.js` | Dark-mode button, phone menu, publication filters, "Cite" buttons, and the network pattern in the header. |
| `images/photo.jpg` | Your profile photo (square). To change it, replace this file with another square photo of the same name. |
| `images/favicon.svg` | The small icon in the browser tab (shows your initials). |
| `cv.pdf` | Not added yet. When your CV is ready, save it as `cv.pdf` next to `index.html`, then in `index.html` find the comment that starts with "CV:" and remove the comment markers around the "Download CV" line. |

## Common edits

- **Add a publication:** copy one whole `<li class="pub"> … </li>` block and paste it at the top of the right list:
  - "Peer-reviewed articles & conference papers"
  - "Work in progress & conference abstracts"
  - When a work-in-progress item gets published, move its block up into the peer-reviewed list and delete its "Work in progress" badge line.
  - Put the full reference in `data-cite`. This is what the "Cite" button copies.
  - Put your own name inside `<strong>…</strong>`.
- **Remove a section** (e.g. Projects): delete its `<section> … </section>` block and its link in the `<nav>`.
- **Remove a profile icon** (e.g. LinkedIn): delete that `<li>` line in the header and in Contact.
- **Different network pattern:** in `script.js`, change the number after `let seed =`.
- **Last updated:** change the date in the footer whenever you update the site.

## Publishing (GitHub Pages)

The site goes in a public repository named `arminioluigi.github.io`. It's live at https://arminioluigi.github.io a minute or two after each change.

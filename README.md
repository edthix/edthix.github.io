# dawillah.com

The personal website of **Edham Arief Dawillah** — data engineer at
[Mindvalley](https://www.mindvalley.com/), co-founder of
[Kinabalu Coders](https://kinabalucoders.org/) and RoboNeo, based in Kota
Kinabalu, Sabah, Malaysia.

## Design

A custom theme, **“Hyperspace, reimagined”**, built as a modern reinterpretation
of [HTML5 UP's Hyperspace](https://html5up.net/hyperspace):

- A fixed left rail with letter-spaced, numbered navigation and a gradient
  active indicator — the template's signature sidebar, rebuilt.
- A full-viewport intro with an orbital portrait, gradient display type and
  layered depth, echoing Hyperspace's full-screen hero.
- Hyperspace's violet (`#5e42a6`) and magenta (`#b74e91`) DNA, pushed into a
  deeper cosmic palette of nebulae, starlight and soft glass surfaces.
- A hand-written canvas starfield with twinkle, pointer parallax and rare
  shooting stars; drifting CSS nebulae; a fine film-grain layer.
- Space Grotesk for display, Inter for reading, JetBrains Mono for the small
  technical labels.
- Scroll reveals, gradient-underlined rail navigation, cursor spotlights on
  cards, a live Kota Kinabalu clock and copy-to-clipboard email.
- Reduced-motion support, keyboard focus styles, a skip link, inert page
  content behind the mobile menu, and responsive layouts from 320 px up.

## Stack

- Semantic HTML5 and a single hand-written CSS file (custom properties, grid,
  flexbox, gradients, masks).
- Dependency-free vanilla JavaScript for interaction and the starfield.
- No build step, no framework, no tracking, no cookies.
- Typefaces served by Google Fonts with system fallbacks.

## Structure

```
index.html              Main single-page site
assets/css/main.css     Design system and layout
assets/js/site.js       Starfield, menu, reveals, nav spy, copy button, clock
assets/favicon.svg      Orbit mark favicon
images/avatar.jpg       Portrait
CNAME                   Custom domain (dawillah.com)
```

Earlier iterations of the site, including the Escape Velocity-era pages, are
preserved in the repository's git history.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

The static site is published with GitHub Pages from the `main` branch and
served on **dawillah.com** via `CNAME`.

## Changelog

### 2026-10-22 — Hyperspace rebuild and cleanup

- **Theme** (`8d2fb77`): replaced the Escape Velocity layout with an original
  Hyperspace-inspired design — fixed rail navigation, full-viewport orbital
  hero, violet/magenta cosmic palette, glass cards, gradient display type and
  scroll-reveal rhythm.
- **Motion and atmosphere** (`8d2fb77`): added a hand-written canvas starfield
  with twinkle, pointer parallax and shooting stars, plus drifting nebulae and
  film grain. All motion respects `prefers-reduced-motion`.
- **Content** (`8d2fb77`): rewrote the site around publicly available profile
  information — Mindvalley, Kinabalu Coders, RoboNeo, six public repositories,
  a journey timeline and contact details.
- **Metadata** (`8d2fb77`): added a favicon, Open Graph and Twitter card
  metadata, Person JSON-LD, an image preload and accessible social labels.
- **Accessibility** (`8d2fb77`): added a skip link, focus styles, reduced-motion
  support, inert page content behind the mobile menu and AA-conscious contrast.
- **Privacy** (`8d2fb77`, `eb1ed1c`): removed the embedded personal Google
  Calendar page and stale X/RoboNeo links. No phone number, physical address or
  other private data is published.
- **Cleanup** (`eb1ed1c`): removed the superseded Escape Velocity-era pages,
  unused theme CSS, Fontello and Fancybox assets, and the vulnerable jQuery.
- **Deployment** (`e877719`): renamed the default branch `master` → `main`,
  repointed GitHub Pages at `main`, updated local branch tracking and
  documented the branch in this README.
- **Security**: dismissed the two jQuery Dependabot alerts as `not_used` once
  the vulnerable file had been deleted; no open alerts remain.

### Earlier

- `d5490f2` — previous Escape Velocity-based design, preserved in git history
  alongside the site's earlier iterations.

## Content & privacy

The site publishes only publicly available professional information: full name,
email address, city, employer, community roles, social profiles and public
repositories.

## Credits

- Theme inspired by [Hyperspace](https://html5up.net/hyperspace) by
  [HTML5 UP](https://html5up.net) (CCA 3.0). This is an original
  implementation, not the template itself.
- Typefaces: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk),
  [Inter](https://fonts.google.com/specimen/Inter) and
  [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).
- Portraits and project facts from Edham's own public profiles.

## Contact

- Email: [edham.arief@gmail.com](mailto:edham.arief@gmail.com)
- GitHub: [@edthix](https://github.com/edthix)
- LinkedIn: [edhamarief](https://www.linkedin.com/in/edhamarief/)

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

The original experiments remain in the repository for reference:
`index01.html`, `index02.html`, `css/`, `js/`, `font/` and
`images/fancybox/`. They are not linked from the current site.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

The static site is published with GitHub Pages from the repository's default
branch and served on **dawillah.com** via `CNAME`.

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

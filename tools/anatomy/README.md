# Workshop 5 Anatomy figures

Build all six standalone figures with `node tools/anatomy/build.mjs` from the deck root.
Individual builders live in `tools/anatomy/<id>/build.mjs`.
They write self-contained HTML and SVG posters to `assets/anatomy/`.
No network request or external script is required when opening the figures.

Source: https://github.com/wheresryan22/anatomy.
The vendored Anatomy kit is pinned to commit `dbf697a527bbf7d358668e1557cb1e35ff725d46`.
Its license remains in `vendor/`. Generated figures use the AetherLink palette.

Each slide uses `visual.anatomy = {src, poster, title, caption}`.
The normal classroom renders the HTML in an iframe.
The presenter previews (`?embed=1`) render the SVG poster.
Both variants retain the caption and an accessible description.
Changing slides removes the iframe and stops its animation.
The deck's navigation keys apply when focus is outside the figure.

Slide 44 uses `eval.html?preset=rejected` and `eval-rejected.svg`.
Illustrative throughput values are not measured delivery estimates.
Hook demonstrations do not constitute an operating-system sandbox.
Fixture evaluation checks known criteria; it does not prove unrestricted model reasoning.

## Verification

`node tools/anatomy/build.mjs --audit` forwards the flag only to builders that support it.
Builder audits and part counts are not proof of geometry correctness.
The remote Anatomy acceptance workflow runs model tests with at most two workers,
checks regenerated assets against Git, and uses the vendor line audit in both themes.
It records classroom interaction changes, presenter posters, mobile reduced-motion
checks, and standalone closeups at four device pixels per CSS pixel.
Screenshots and ringed line-check outputs remain available when a check fails.
Human review still checks the mechanism and educational claims.

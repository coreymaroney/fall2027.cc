# Logo writing animation

The hero keeps the original solid-white artwork from `img/logo-lg.svg`.
`js/logo-animation.js` reveals it through an SVG mask whose pen trajectories
follow the script lettering. Only the mask's stroke offset animates: the artwork
never changes fill, opacity, or scale.

The sequence starts after a 1.45-second delay for the site-entry overlay and
writes for 4.2 seconds. Pen durations are proportional to trajectory lengths.
The mask stays in place after writing; there is no final fill switch.

The countdown fades upward for 900ms after the final pen stroke, followed by
the hero RSVP row 180ms later. The script sets `--hero-reveal-delay` from the
logo timeline, keeping the sequence synchronized. Without the animated logo,
the content uses a 1.45-second CSS delay instead. Reduced motion shows both
immediately, and keyboard focus reveals the RSVP row without waiting.

Below the hero, `js/scripts.js` uses IntersectionObserver to reveal section
headings, text groups, photos, wedding-party cards, travel/map content, RSVP,
and the footer once as they enter the viewport. Groups use the same 900ms
fade-up with short sibling staggers. Modals, nested form controls, and the
hero timeline are excluded. This replaces the old directional Waypoint
animations. Content stays visible without JavaScript or IntersectionObserver;
reduced motion disables reveals, and keyboard focus immediately shows a group.
Engagement and wedding-party photos use high-quality WebP display-size versions
with the original files as fallbacks. Those images are promoted from lazy,
low-priority loading as they approach the viewport, and photo groups reveal
after their images decode. The desktop YouTube player initializes as soon as
page scripts are ready so it can buffer well before the section enters view;
it stays unloaded on small screens.
Page overflow uses `overflow-x: clip` rather than `hidden` so translated
content does not turn the body into a second vertical scroll container.
Scrollbar styling applies to both the document and body without disabling scrolling.

Trajectory coordinates use an 800 x 154 coordinate system, scaled to the source
SVG's viewBox. If the logo changes, its trajectories must be updated too.

Reduced-motion users see the original static image without a fetch. CSS also
completes the mask immediately if reduced motion is enabled during animation.
Failed requests or malformed SVGs log a warning and preserve the original image
and its accessible name.

Compile stylesheet changes with `npx gulp sass`. Preview over HTTP (for example
with the installed live-server); opening the page directly from disk does not
support fetching the SVG.

Open `tests/logo-animation.html` on the preview server to run the browser
regression checks. These sample the actual CSS animation, verify that revealed
ink never disappears, and compare the completed mask pixel-for-pixel with the
original SVG. Run again with reduced motion enabled to check the static version.
`tests/scroll-reveal.html` scrolls through the live page to verify reveal
coverage, one-time behavior, keyboard focus, and fallback visibility.

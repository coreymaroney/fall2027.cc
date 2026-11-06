(function () {
  'use strict';

  // Pen trajectories follow the lettering, not the filled SVG's outer contour.
  // Coordinates use a quarter-scale version of the logo's 3200 x 616 viewBox.
  const strokes = [
    'M128 59 C155 59 185 23 169 13 C148 -1 112 31 107 62 C96 111 139 125 181 70',
    'M210 48 C185 34 174 106 195 104 C214 104 223 42 210 48 C210 65 224 66 230 54',
    'M228 40 C237 61 223 65 219 62 M226 60 L244 51 C234 76 231 104 245 104 C254 104 261 88 265 79',
    'M264 77 C292 73 289 39 276 48 C262 55 252 92 268 103 C279 111 292 93 298 79',
    'M300 49 C292 73 290 103 300 103 C312 104 321 71 325 49 L319 118 C316 151 291 158 289 141 C287 121 314 111 337 94',
    'M372 38 C399 17 371 9 348 33 C326 56 334 75 366 69',
    'M397 48 C424 22 447 52 402 76 C373 91 366 102 378 107',
    'M381 64 C347 80 325 111 342 131 C361 157 423 119 420 92 C419 72 405 73 393 81',
    'M448 73 C480 72 508 35 486 26 C461 12 429 47 422 78 C409 124 453 139 500 84',
    'M535 61 C515 47 497 114 513 116 C526 119 537 77 537 61 L532 99 C528 123 543 122 551 91',
    'M550 54 C564 74 549 77 544 73 M553 73 L572 65 C560 89 559 116 572 116 C579 116 584 103 588 92',
    'M595 64 C584 90 580 117 591 117 C600 117 607 101 611 91',
    'M597 45 L598 44',
    'M614 65 L603 116 C613 84 624 59 634 65 C643 70 621 114 636 117 C644 119 651 105 655 92',
    'M684 66 C663 51 646 114 660 118 C673 121 684 80 684 66 L679 102 C674 126 693 121 699 98'
  ];

  async function initializeLogoAnimation() {
    const logoImg = document.querySelector('.hero-content img[src*="logo-lg.svg"]');
    if (!logoImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    try {
      const response = await fetch(logoImg.src);
      if (!response.ok) {
        throw new Error('Logo request failed: ' + response.status);
      }
      const svgDoc = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
      const svg = svgDoc.documentElement;
      if (svgDoc.querySelector('parsererror') || svg.localName !== 'svg' || !svg.querySelector('path')) {
        throw new Error('Invalid logo SVG');
      }

      const namespace = 'http://www.w3.org/2000/svg';
      const defs = document.createElementNS(namespace, 'defs');
      const mask = document.createElementNS(namespace, 'mask');
      mask.id = 'hero-logo-writing-mask';
      mask.setAttribute('maskUnits', 'userSpaceOnUse');
      mask.setAttribute('x', '0');
      mask.setAttribute('y', '0');
      mask.setAttribute('width', '3200');
      mask.setAttribute('height', '616');
      const pen = document.createElementNS(namespace, 'g');
      pen.setAttribute('transform', 'scale(4)');
      pen.setAttribute('fill', 'none');
      pen.setAttribute('stroke', 'white');
      pen.setAttribute('stroke-width', '28');
      pen.setAttribute('stroke-linecap', 'round');
      pen.setAttribute('stroke-linejoin', 'round');

      const paths = strokes.map(function (data) {
        const path = document.createElementNS(namespace, 'path');
        path.setAttribute('d', data);
        path.setAttribute('pathLength', '1');
        path.setAttribute('class', 'logo-pen');
        pen.appendChild(path);
        return path;
      });
      mask.appendChild(pen);
      defs.appendChild(mask);
      const artwork = document.createElementNS(namespace, 'g');
      artwork.setAttribute('mask', 'url(#hero-logo-writing-mask)');
      while (svg.firstChild) {
        artwork.appendChild(svg.firstChild);
      }
      svg.appendChild(defs);
      svg.appendChild(artwork);
      svg.setAttribute('class', 'animated-logo');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', logoImg.alt);

      const lengths = paths.map(function (path) { return path.getTotalLength(); });
      const totalLength = lengths.reduce(function (sum, length) { return sum + length; }, 0);
      let delay = 1.45; // Wait for the existing site-entry overlay to leave.
      paths.forEach(function (path, index) {
        const duration = 2.5 * lengths[index] / totalLength;
        path.style.setProperty('--pen-delay', delay + 's');
        path.style.setProperty('--pen-duration', duration + 's');
        delay += duration;
      });
      logoImg.closest('.hero').style.setProperty('--hero-reveal-delay', delay + 's');
      logoImg.replaceWith(svg);
    } catch (error) {
      console.warn('Logo animation unavailable; keeping the static logo.', error);
    }
  }

  if (document.readyState === 'loading' &&
      !document.querySelector('.hero-content img[src*="logo-lg.svg"]')) {
    document.addEventListener('DOMContentLoaded', initializeLogoAnimation);
  } else {
    initializeLogoAnimation();
  }
})();

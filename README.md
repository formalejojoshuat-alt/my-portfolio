# Joshua Formalejo — Portfolio Website

A free, editable, responsive, multi-page portfolio built with **HTML, CSS, and JavaScript**. It uses a corporate-friendly navy-and-blue visual system, custom SVG placeholder illustrations, and optional GSAP ScrollTrigger motion.

**Status: portfolio-first revision (v2).** The website is ready to preview and can be published free, but please customize personal photos, project samples, wording, and date details before sharing it professionally.

## Open the website on your computer

1. Unzip the downloaded project.
2. Open the `joshua-portfolio` folder.
3. Double-click `index.html`. It should open in Chrome, Safari, Edge, or another browser.
4. Click the project cards to explore the three individual case-study pages.
5. For the best preview, use an internet connection because the Google Fonts and GSAP animation library are loaded from free CDNs. The site still displays and uses simpler native reveal effects if these are unavailable.

**Optional local server:** If you have Python installed, open a terminal in the site folder and run `python3 -m http.server 8000`, then visit `http://localhost:8000`.

## Where to edit

| What to change | File |
|---|---|
| Name, introductory text, sections, contact details | `index.html` |
| Colors, sizes, mobile layouts, spacing | `assets/css/style.css` |
| Scroll animations, navigation, progress bar | `assets/js/main.js` |
| Case study text and details | `projects/*.html` |
| Professional portrait placeholder | `assets/img/portrait-placeholder.svg` |
| Illustrative project artwork | `assets/img/project-tingkad.svg`, `project-wordtext.svg`, `project-sharaliy.svg` |
| Website preview shown when sharing links | `assets/img/og-cover.svg` |
| Favicon / monogram | `assets/img/favicon.svg` |

### Replace the portrait

- Put an optimized, permission-cleared photo, for example `joshua-portrait.webp`, into `assets/img/`.
- In `index.html`, find `<img src="assets/img/portrait-placeholder.svg"` and change the file name to `joshua-portrait.webp`.
- Change the `alt` text to describe the new photo and **remove** the small `YOUR PHOTO HERE` tag (search for `photo-placeholder-tag`).
- Use a 4:5 or similar portrait crop at around 1000–1400 pixels wide, compressed as WebP.

### Replace the project images

- Put actual approved screenshots into `assets/img/`; optimize to WebP/JPG (ideally 1200–1800px wide, under 500 KB where possible).
- For each project, update the `<img src="...">` in `index.html` and its matching `projects/*.html` file.
- Change the picture's `alt` text to describe the **actual** deliverable.
- Remove the `PLACEHOLDER PREVIEW` labels in homepage project cards and illustrative-image disclaimers when all images are genuinely replaced.
- Add only verified before/after results, approved designs, real screenshots, or non-confidential workflow examples. Never present the SVG graphics as actual client work.

### Edit colors and fonts

At the top of `assets/css/style.css`, change the variables in `:root`:

- `--ink: #102a43` = main deep navy
- `--blue: #2155cd` = primary action and highlight blue
- `--teal: #137c83` = calm secondary accent
- `--paper: #f8fafc` = light background

The site uses **Plus Jakarta Sans** for headings and **DM Sans** for body text via Google Fonts (free-to-use font families). You can switch fonts by modifying the Google Fonts `<link>` lines on every HTML page and the `--font-title` / `--font-body` variables in the CSS.

## Publish for ₱0 using Cloudflare Pages

Cloudflare Pages supports direct uploading a ZIP archive or folder and provides a free `*.pages.dev` subdomain, subject to project-name availability.

1. Go to https://dash.cloudflare.com/ and create a free account.
2. Open **Workers & Pages**.
3. Choose **Create application / Pages / Upload assets** (the exact dashboard labels may vary).
4. Enter a project name, e.g. `joshua-formalejo-portfolio`.
5. Drag in the **site ZIP** or the unzipped `joshua-portfolio` **folder contents**. Cloudflare needs `index.html` at the top level of your uploaded website, not hidden inside an extra wrapper folder.
6. Click **Deploy**.
7. Open the newly assigned `*.pages.dev` address and inspect the page, animations, mobile navigation, images, and project links.

Official instructions: https://developers.cloudflare.com/pages/get-started/direct-upload/

**Important:** Cloudflare says a Pages project created with Direct Upload cannot later be switched to Git integration. If you want automatic Git-based deployments later, start a separate Pages project connected to a Git repository instead. Direct Upload is easier for beginners.

### Update the published website

Edit files locally, then create a new deployment from Cloudflare's Pages dashboard. Upload the updated folder or site ZIP again. Static files do **not** automatically sync from your computer.

## Ready-to-launch checklist

- [ ] Replace the illustrative portrait and three category graphics with real, approved work.
- [ ] Verify the exact dates, titles, and achievements from Joshua's resume. The résumé lists a Tingkad role ending **November 2026**, which is in the future as of October 12, 2026; this draft uses **Present** provisionally. Confirm this before publishing.
- [ ] Check employer names and whether you are permitted to publish brand assets and screenshots.
- [ ] Add measurable outcomes only when supported by real data.
- [ ] Ensure contact email and LinkedIn are correct and intended to be public.
- [ ] If providing a downloadable résumé later, **remove private home address and phone number** first. The supplied PDF is **not included** in this website for privacy.
- [ ] Replace the illustration-specific labels and preview captions where appropriate.
- [ ] Test mobile navigation and every project page on desktop and phone.
- [ ] Recheck colors and keyboard focus after edits for accessibility.
- [ ] Optionally replace `og-cover.svg` with a 1200x630 PNG/JPG social image and set a full absolute `og:image` URL after publishing.

## Notes for developers

- No node build, database, PHP, WordPress, or paid hosting is required.
- GSAP and ScrollTrigger are loaded via jsDelivr; animations are progressive enhancement. If the scripts are blocked, native IntersectionObserver reveals still work.
- CSS has a `prefers-reduced-motion` safeguard.
- Mobile menu uses semantic HTML, `aria-expanded`, Escape-to-close, and focus-visible styles.
- Case study content is grounded in Joshua's resume; no invented performance claims, testimonials, or client work samples have been added.
- The original Canva portfolio was not fully accessible to automated inspection; this version is an original design rather than a visual reproduction of that website.

## Version 2 changes

- Shifted from service-business sales copy to a **work-first personal portfolio**.
- Added six dedicated sample slots for graphics, videos, website screenshots, SEO content, workflow documentation, and future learning projects. These are categories/placeholders, **not fabricated completed projects**.
- Added a cursor-following radial spotlight to **01 / THE BIG PICTURE** on pointer devices, and a gradient hover effect on its label.
- Changed heading font to **Plus Jakarta Sans**, keeping DM Sans for body text.
- Calls to action point to sections or project detail pages within the site only; contact information is shown as plain text with a copy button, never a `mailto:` link.
- To change gallery item text, search `work-gallery` in `index.html`; the sample artwork is styled in `assets/css/style.css` under `.sample-art`.
- Contact information and button can be changed in `index.html`, around `contact-bottom-simple`.


## Version 4 changes
- Removed numbered section labels, portfolio cards, samples, and timeline items.
- Removed hero “Scroll to explore”.
- Big Picture now has a soft navy gradient and a three-times-larger subtle cursor-tracking glow.
- Experience timeline lists Position → Company → Tasks, with dates on the side.
- “Notes from my practice” chart arrow now uses a separately drawn arrowhead and a native IntersectionObserver animation. It respects reduced-motion settings.

## Version 5: Scroll animation refinements
- Section reveals now begin when the individual element enters the viewport (IntersectionObserver), not during initial page load. Once revealed, content stays visible.
- The zigzag graph draws only after its section enters view. Its arrowhead is attached to the tip of the SVG path and rotates continuously based on the actual curve direction.
- `prefers-reduced-motion` keeps content visible and shows the completed graph without motion.
- If GSAP cannot load, the native scroll reveals and zigzag animation still work.

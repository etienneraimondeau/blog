# CLAUDE.md — LaPipette Website (GitHub Pages)

This file gives Claude Code full context for working on the lapipette.com repository.
Strategy context lives in: `/Users/etienne/Documents/Claude/Projects/LaPipette/CLAUDE.md`

---

## What This Site Is

**lapipette.com** — scientific information design studio site for Etienne, a PhD biochemist and biotech PM based in Oxford. Information design is the umbrella discipline: every piece — whether scientific illustration, data visualisation, or infographic — is organised to communicate a specific insight. The illustration is the wrapper for the data.

Stack: Jekyll + Forty theme (Andrew Banchich) + GitHub Pages
Repo: `/Users/etienne/Documents/LaPipette/blog`
Live at: https://lapipette.com  (canonical host is the apex domain — `_config.yml` `url` and `CNAME` both use `lapipette.com`, no `www`)

Three audiences the site must serve:
1. **Hiring managers and scientific leads** — discovering lapipette in the context of a job application or referral; need to see genuine scientific thinking, not just aesthetic skill
2. **Science enthusiasts / consumers** — potential merch buyers discovering via Instagram or Redbubble
3. **Scientists and researchers** — arriving from a shared Data Story or conference reference; need to see methodology and analytical rigour

**The three improvement goals driving all website work:**
1. **SEO** — rank for "science illustrator UK", "biotech illustration", "scientific data visualisation UK", "bioinformatics figure design", "scientific information design"
2. **Mobile** — the majority of referrals land on a phone; the site must be readable and navigable on small screens
3. **Portfolio clarity** — every visitor should immediately understand what LaPipette makes, how it thinks, and what the Data Stories category is. Merch is discoverable but secondary. Commission inquiries are welcome but not the primary CTA.

---

## The Trajectory This Site Serves (read before making decisions)

LaPipette is on a C → D → B trajectory. Understanding what each stage means shapes every site decision.

**C (now):** Personal creative project. Making things driven by genuine curiosity. No client briefs, no follower targets, no revenue OKRs. FC Nantes data vis is a C piece — made because it was interesting, not because it fits a content plan.

**D (6–12 months):** Career evidence portfolio. 5–6 strong Data Stories with visible methodology and real data — enough that hiring managers in scientific roles encounter the work and say "this is unusual for someone at your level." The site at D is coherent: a visitor reads three pieces and understands how Etienne thinks, not just what he can draw.

**B (12–18 months out):** Public scientific voice. A specific, arguable thesis about where a field is going — one he'd defend in a room of experts. At B, the Data Stories aren't isolated pieces; they're chapters in a developing argument. The site reads like a body of evidence for a position, not a portfolio.

**What this means for site work:**

The difference between D and a normal portfolio is that methodology is visible and the analytical question is always stated. Don't let site changes bury this — the methodology note and data source on every Data Story post are not optional footnotes, they are what makes the site work for its actual purpose.

The difference between D and B is that at B the pieces connect. The site architecture should make a through-line possible when the time comes — a Data Stories index page where 5–6 pieces can be read in sequence. Build toward that structure now (category page, filter tabs) even though it's not needed yet.

Never optimise the site for commission leads or follower growth at the expense of analytical clarity. A hiring manager or scientist arriving from a shared piece is worth more than a hundred social media visitors.

---

## Site Architecture

| File | URL | Nav | Purpose |
|---|---|---|---|
| `index.md` | `/` | — | Hero + brand intro + portfolio tiles |
| `about.md` | `/about/` | About | Who I am + what I make + CTA. Data Stories section **commented out** — uncomment when first Data Story ships. |
| `contact.md` | `/contact/` | Work with me | Inquiry form + brief prompts |
| `_posts/*.md` | `/[permalink]/` | — | Portfolio pieces (tiles on homepage) |
| Redbubble URL | external | Shop | Merch |

Navigation order in `_includes/header.html`: **Portfolio → About → Shop → Work with me**

Note: `services.md` deleted (May 2026) — content consolidated into `about.md`. Pinned post `2026-05-09-about-lapipette.markdown` deleted — homepage hero section now handles that role.

**Portfolio filtering:** When the Data Stories category has 2+ posts, add category filter tabs to the portfolio page (Data Stories / Illustrations / Infographics). This lets the category feel coherent to new visitors who land on it specifically. Until then, Data Stories posts appear in the main grid like any other post.

---

## SEO — Specific Tasks

All SEO work lives in `_includes/head.html`, `_config.yml`, and page front matter.

### Structured data (JSON-LD) — ✅ implemented
Implemented in `_includes/seo-schema.html` (included from `head.html`). It emits page-type-aware schema: `Organization` on the homepage, `ProfessionalService` on `/about/`, `BlogPosting` on posts, and a `WebPage` fallback elsewhere — all `jsonify`-escaped. The reference snippet below is kept for context only; the live implementation is richer (it adds `knowsAbout`, `priceRange`, `areaServed`, publisher/logo).

```html
<!-- Structured data: Person + ProfessionalService -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "LaPipette",
  "url": "https://lapipette.com",
  "description": "Scientific information design studio — science illustration, data visualisation, and visual stories for biotech companies and academic researchers.",
  "founder": {
    "@type": "Person",
    "name": "Etienne Raimondeau",
    "jobTitle": "Scientific Information Designer & Biotech PM",
    "alumniOf": "EMBL Grenoble"
  },
  "areaServed": "GB"
}
</script>
```

For portfolio posts, add a `CreativeWork` block in the post layout (`_layouts/post.html`):
```html
{% if page.layout == 'post' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "{{ page.title }}",
  "description": "{{ page.description }}",
  "creator": { "@type": "Person", "name": "Etienne Raimondeau" },
  "dateCreated": "{{ page.date | date: '%Y-%m-%d' }}"
}
</script>
{% endif %}
```

### Meta descriptions — current state
- `index.md` — ✅ `"Scientific information design studio. Publication figures, mechanism of action visuals, and data visualisation for researchers and biotech companies."`
- `about.md` — ✅ `"PhD biochemist and scientific information designer based in Oxford"`
- `contact.md` — ✅ `"Get in touch about a project or just to say hello."`

### robots.txt — ✅ exists at repo root

### Page titles — current state (keep short per preference)
- `about.md` — `"About"` ✅
- `contact.md` — `"Work with me"` ✅

### Image alt text — ✅ done
All inline post images already carry descriptive alt text (audited Jun 2026 — no bare `![](/path)` tags remain). Keep this up for new posts. Inline post images also now carry `loading="lazy"` via the kramdown `{:loading="lazy"}` IAL convention.

### Open Graph image — homepage
`index.md` has `image: assets/images/visualise/header-05.png`. ✅ Set. Confirm this looks good as a 1200×630px social share crop — swap for a portfolio image if header-05 doesn't represent the work well.

---

## Mobile — Specific Tasks

The Forty theme is responsive but has known mobile friction points.

### CTA buttons — too small on mobile
The `<ul class="actions">` buttons in `index.md` render at ~14px text. In `assets/css/main.scss` (or the compiled CSS), ensure `.button` has `min-height: 44px` and `padding: 0 1.5em` for touch targets. Also check the Contact button in the nav (`nav-contact` class).

### Portfolio tiles — column count on mobile
The tiles grid in `_includes/tiles.html` or its CSS should collapse to 1 column below 480px. Check `@media screen and (max-width: 480px)` rules and confirm tiles stack correctly. If they're still side-by-side at 320px, add:
```scss
@include breakpoint('<=xsmall') {
  .tiles article { width: 100%; }
}
```

### Contact form — mobile keyboard type
In `_layouts/contact.html` or the form include, add `type="email"` to the email field and `type="tel"` to any phone field so mobile keyboards open the right input. Also ensure form labels are above inputs, not inline (inline labels break on small screens).

### Image loading — lazy load for mobile performance
All `<img>` tags in posts should have `loading="lazy"` to avoid blocking page render on slow mobile connections:
```html
<img src="..." alt="..." loading="lazy">
```
Update the post layouts to add this attribute by default.

### Test target
After any mobile change: open on iPhone SE (375px wide) in browser DevTools. Check: nav, CTA buttons, portfolio tiles, contact form, post images.

---

## Lead Generation — Specific Tasks

### ✅ Done (May 2026)
- Contact page rewritten with brief prompts — `contact.md`
- About page: moat paragraph added, Jekyll section removed, CTA at bottom — `about.md`
- Nav updated: About visible, "Work with me" CTA — `_includes/header.html`

### Still to do

**Testimonials** — create `_data/testimonials.yml` and `_includes/testimonials.html`, include in `_layouts/about.html` before the footer. Format:
```yaml
- quote: "Etienne turned our 20-page methods section into a single figure that our reviewers praised."
  name: "Dr. A. Researcher"
  role: "Postdoc, University of Oxford"
```
Populate with real quotes — placeholder copy is fine to stub the layout first.

**Redbubble teaser** — add a short strip to `_layouts/home.html` between the tiles and the bottom CTA:
```html
<section id="shop-teaser">
  <div class="inner">
    <h3>Science you can wear</h3>
    <p>Prints, t-shirts, and totes featuring LaPipette illustrations.</p>
    <a href="{{ site.redbubble_url }}" class="button" target="_blank">Browse the shop →</a>
  </div>
</section>
```

---

## Portfolio Posts

8 posts in `_posts/`. Last substantive update May 2026 (ARC post added and cleaned up).

| Post file | Category | Tag | Date |
|---|---|---|---|
| `2016-11-08-thesis.markdown` | illustrations | Portfolio | 2016 |
| `2017-10-10-CART.md` | infographics | Portfolio | 2017 |
| `2017-11-15-RNAi.md` | infographics | Portfolio | 2017 |
| `2018-01-09-checkpoint-inhibitors.markdown` | infographics | Portfolio | 2018 |
| `2018-02-15-lab-meat.markdown` | infographics | Portfolio | 2018 |
| `2021-04-07-covid_cards.markdown` | illustrations | Portfolio | 2021 |
| `2025-06-30-arc-amyloidosis-leaflet.md` | client-work | Portfolio | 2025 |

**Image folder naming convention (established May 2026):** All `assets/images/` subfolders use date-prefixed format: `YYMMDD_name` (e.g., `250630_ARC`, `171005_CART`, `171220_checkpoints_inhibitors`). New post image folders must follow this convention.

**Draft post:** `_drafts/2022-10-30-maxwell_animation.md` — MaxWell Biosystems HD-MEA animation/infographic. Well-written post, client work. Blocked: `assets/images/maxwell/` folder and assets do not exist yet. Needs assets before it can be published.

Front matter required: `layout`, `title`, `date`, `category`, `tag: ['Portfolio']` (or `['Client']` for client work), `image`, `description`.

### Categories and their pages

| Category value | Page | Status |
|---|---|---|
| `illustrations` | `category/illustrations.html` | Active |
| `infographics` | `category/infographics.html` | Active |
| `data-stories` | not yet created | Pending FC Nantes post |
| `client-work` | `category/client_work.html` at `/category/client-work/` | Active — ARC post uses this category. Category values are slug form (lowercase, hyphenated); the homepage tile prettifies them for display via `replace:'-',' ' | capitalize`. (Note: the FC Nantes WIP still uses scalar `category: data-stories` rather than the array `['data-stories']` form — align it when that piece leaves WIP.) |

### Data Stories — new portfolio category (May 2026)

LaPipette now has a **Data Stories** category for data visualisation work. This sits alongside `illustrations` and `infographics` as a distinct portfolio type.

Category tag: `data-stories`

**What a Data Stories post must include** (in the post body or front matter):
- A `data_source` field (or clearly stated in the post intro): where the data came from, n, date range
- An analytical framing sentence at the top: the question being answered, not just the answer
- A methodology note: key analytical or design decision explained in plain language

These are not optional — they are what separates a Data Stories post from a regular infographic and signal the analytical rigour that justifies the premium positioning.

**Pending posts:**
- [ ] Journal figures post — assets exist in `assets/images/journal_figures/`, need post file
- [ ] CRISPR explainer — when ready
- [ ] **FC Nantes coaches data vis** — IN PROGRESS (May 2026). First Data Stories piece. Football coaching tenure data, personal project. Category: `data-stories`. When complete, create post with methodology note and data source visible. This is the proof-of-concept for the Data Stories category.
- [ ] **Protein folding / AlphaFold / Isomorphic** — next science-adjacent Data Story candidate. Thesis: AlphaFold confidence is lowest for the disease-relevant disordered proteins where prediction matters most. Data is in the public AlphaFold database. Briefing at `/Users/etienne/Documents/Claude/Projects/LaPipette/exploration/protein-folding-isomorphic-brief.md`.
- [ ] **AI × wet lab reality** — Data Story candidate grounded in sequencing data quality. Thesis: AI-guided design overestimates wet lab data quality; the gap is visible in read-level distributions from public datasets. Briefing at `/Users/etienne/Documents/Claude/Projects/LaPipette/exploration/ai-wetlab-brief.md`.
- [ ] **CAS9 enrichment** — Data Story candidate drawing on patent-level depth. Thesis: the field abandoned CAS9 enrichment prematurely. Briefing at `/Users/etienne/Documents/Claude/Projects/LaPipette/exploration/protein-seq-cas9-brief.md`.

---

## Key Config (`_config.yml`)

```yaml
title: LaPipette
email: contact.lapipette@gmail.com
description: "Science illustration and data visualisation — I make complex biology look beautiful."
url: "https://lapipette.com"
tiles-source: posts
tiles-count: 10
instagram_url: https://www.instagram.com/lapipette.labs/
behance_url: https://www.behance.net/etienneraimondeau
redbubble_url: https://www.redbubble.com/people/LaPipette/
```

`linkedin_url` — ✅ set (`https://www.linkedin.com/in/etienneraimondeau/`).

---

## Brand Voice

Curious, playful, rigorous. Short sentences. Science as discovery, not lecture. The discipline is information design — every piece starts with the data, not the visual style.

**Tagline:** *"Beauty emerges from accuracy. Data, wrapped in illustration."*
**Descriptor:** *LaPipette is a scientific information design studio — illustration, data visualisation, and visual stories built from the biology up.*

- Good: "CRISPR is essentially molecular scissors. But cooler. And way more precise."
- Good: "The science is never simplified. The visuals are never boring."
- Bad: "We provide bespoke scientific illustration services for academic and commercial clients."
- Bad: "Clear, compelling visuals for your research needs." (generic — every design studio says this)

**Information design tradition:** David Goodsell (molecular biology as information design), Nigel Holmes (explanation graphics), Edward Tufte (data-ink ratio). Every visual element earns its place.

---

## Business Rules to Honour in All Copy

- **PhD accuracy is the moat** — position above BioRender and AI tools
- **Data Stories are the primary output** — the site should foreground analytical work with visible methodology, not just illustration portfolios
- **Merch is welcome but secondary** — the shop teaser belongs in the layout, not on the homepage hero
- **No aggressive commission pitch** — commission work is welcome if it comes inbound; the site should not be structured around generating leads for it
- The work should speak for itself — methodology visible, data sources cited, one question answered per piece

---

## Layouts Available

`home`, `about`, `archives`, `category`, `contact`, `landing`, `page`, `post`, `post_detail`, `post_labmeat`, `services`, `tag`

---

## Implementation Priority Order

✅ = done as of May 2026

1. ✅ **Page consolidation** — `services.md` deleted, `about-lapipette.markdown` deleted (May 2026), content consolidated into `about.md`
2. ✅ **Nav updated** — Portfolio → About → Shop → Work with me
3. ✅ **About page** — moat paragraph, data vis services, CTA
4. ✅ **Contact page** — rewritten with brief prompts, two-audience framing (commission + science conversation)
5. ✅ **Homepage** — static banner, brand intro, CTAs to About and Contact
6. ✅ **robots.txt** — exists at repo root
7. ✅ **JSON-LD structured data** — `ProfessionalService` schema in `_includes/seo-schema.html`, wired into `_layouts/about.html`
8. ✅ **About page title** — keywords in front matter
9. ✅ **Mobile: button touch targets** — `min-height: 44px` confirmed on line 41 of `_sass/components/_button.scss`
10. ✅ **lazy loading** — `loading="lazy"` added to post banner images in `_layouts/post.html`
11. ✅ **Redbubble teaser** — strip added to `_layouts/home.html`
12. ✅ **Testimonials stub** — `_data/testimonials.yml` + `_includes/testimonials.html` created, wired into about layout. Needs real quotes — currently empty.
13. ✅ **Commit unstaged changes** — path fixes committed (`5c224e5`)
14. ✅ **Delete `about-lapipette.markdown`** — removed (`9649120`)
15. ✅ **`client-work` category** — ARC categorized `client-work`, page at `/category/client-work/`; category values normalized to slug form, tiles prettify for display (Jun 2026)
15b. ✅ **Markup + hygiene fixes (Jun 2026)** — fixed malformed `class id="style2"` → `class="style2"` and empty `alt` in `category.html`/`tag.html`; fixed homepage meta-description typo; lazy-loaded all inline post images; untracked all `.DS_Store` from git
16. **Data Stories category page** — create `data-stories.md` once FC Nantes post is published (30 min)
17. **Portfolio filter tabs** — Illustrations / Infographics / Data Stories once Data Stories has 2+ posts (1 hr)
18. **Maxwell post** — add assets to `assets/images/maxwell/` and publish `_drafts/2022-10-30-maxwell_animation.md`

---

## Connected Strategy Files

| File | Location | Purpose |
|---|---|---|
| Co-founder agent | `/Users/etienne/Documents/Claude/Projects/LaPipette/CLAUDE.md` | Full business context & persona |
| Business plan | `/Users/etienne/Documents/Claude/Projects/LaPipette/LaPipette_Business_Plan_2026_v3.md` | Current strategy (v3, May 2026) |
| Portfolio research | `/Users/etienne/Documents/Claude/Projects/LaPipette/knowledge-base/market-intel/portfolio-research.md` | Design benchmarks |
| Exploration briefs | `/Users/etienne/Documents/Claude/Projects/LaPipette/exploration/` | Data Story thesis briefs — protein folding, AI × wet lab, CAS9 |

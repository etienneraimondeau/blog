# LaPipette — Scientific Information Design

Portfolio for [lapipette.com](https://lapipette.com) — data stories, scientific illustration and infographics, built from the biology up.

Built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages.

---

## Adding a post

Create a file in `_posts/` named `YYYY-MM-DD-slug.md`, where the date matches the `date:` field:

```yaml
---
layout: post
title: "Post title"
permalink: /url-slug
date: 2026-01-15
category: ['infographics']   # illustrations | infographics | client-work | data-stories (lowercase slugs)
tag: ['Portfolio']
tools: ['Illustrator']
description: "One-sentence description shown in tiles, share cards and search results."
image: assets/images/YYMMDD_slug/preview.png
---
```

- Image folders for new posts use the `YYMMDD_slug` naming convention.
- Inline images: `![Descriptive alt text](assets/images/...){:loading="lazy"}`.
- Data Stories use `layout: scrollytelling` and also need `analytical_question`, `data_source` and `methodology`.
- Add `published: false` to keep a post out of the live site while you work on it (`bundle exec jekyll serve --unpublished` to preview it).

Posts appear as tiles on the homepage, newest first. The homepage banner is static (set in `index.md`).

---

## Site structure

| Path | Purpose |
|---|---|
| `_posts/` | Portfolio posts |
| `_drafts/` | Unpublished drafts (`jekyll serve --drafts` to preview) |
| `_layouts/` | Page templates |
| `_includes/` | Partials — `meta.html` (SEO/share tags), `seo-schema.html` (JSON-LD), header, footer, tiles |
| `assets/images/` | One subfolder per post |
| `_config.yml` | Site settings, social links (`email` is also the Formspree endpoint), publish `exclude` list |
| `category/` | One `.html` per category archive page |

---

## Theme

Based on [Forty by HTML5 UP](https://html5up.net/forty), adapted for Jekyll by Andrew Banchich.

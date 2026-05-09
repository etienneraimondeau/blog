# LaPipette — Science Communication & Visual Design

Portfolio and blog for [lapipette.com](https://lapipette.com) — scientific infographics, illustrations, and visual design for researchers, biotech companies, and science communicators.

Built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages.


---

## Adding a post

Create a file in `_posts/` named `YYYY-MM-DD-title.markdown` with this front matter:

```yaml
---
layout: post
title: "Post title"
permalink: /url-slug
date: 2024-01-15
category: ['infographics']   # illustrations | infographics | longread
tag: ['Portfolio']
tools: ['Illustrator']
description: "One-sentence description shown in tiles and banner."
image: assets/images/folder/preview.png
---
```

The most recently dated post automatically becomes the homepage banner.

### Pinned post

To keep a post permanently in the banner regardless of date, add `pinned: true` to its front matter. The pinned post appears only in the banner — not in the tile grid below.

---

## Site structure

| Path | Purpose |
|---|---|
| `_posts/` | Portfolio posts |
| `_layouts/` | Page templates |
| `_includes/` | Reusable partials (header, footer, tiles) |
| `assets/images/` | One subfolder per post |
| `_config.yml` | Site settings, social links |
| `category/` | One `.html` per category for archive pages |

---

## Theme

Based on [Forty by HTML5 UP](https://html5up.net/forty), adapted for Jekyll.

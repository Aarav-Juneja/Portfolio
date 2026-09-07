# Aarav Juneja Portfolio

Personal portfolio site built with Astro, Tailwind CSS, and DaisyUI.

## Pages

- `/` Homepage with featured highlights and overview sections
- `/portfolio` Full portfolio breakdown
- `/reference` Structured data-first reference view
- `/blog` Blog archive and posts

## Development

All commands run from the repository root:

| Command       | Action                                      |
| :------------ | :------------------------------------------ |
| `bun install` | Install dependencies                        |
| `bun dev`     | Start local dev server at `localhost:4321` |
| `bun build`   | Build the production site into `dist/`      |
| `bun preview` | Preview the production build locally        |

## Content Sources

- Main portfolio content lives in `src/portfolio-data.ts`.
- Homepage and reference/portfolio pages are designed to stay in sync with shared data.

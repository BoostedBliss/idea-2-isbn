# Sunny Idea-to-ISBN Mentor

A browser-based toolkit for evaluating book categories, estimating sales velocity, planning backend keywords, and exploring ISBN options.

## Run locally

```sh
bun install
bun run dev
```

## Deploy to GitHub Pages

The `Deploy to GitHub Pages` workflow builds and publishes the site when changes are pushed to `main`, or when the workflow is started manually. The production build uses the `/idea-2-isbn/` project-site path.

In the repository settings, enable **Pages** with **GitHub Actions** as the build and deployment source. After the first successful deployment, the site is available at `https://boostedbliss.github.io/idea-2-isbn/`.

GitHub Pages hosts only the static frontend. The Express `/api/generate-keywords` endpoint requires a server and is not deployed by this workflow.

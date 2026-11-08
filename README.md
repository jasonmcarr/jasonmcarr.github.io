# Jason Carr — Engineering Portfolio

Source code for [jacecarr.dev](https://jacecarr.dev), a responsive portfolio featuring experimental research, optoelectronics, materials characterization, and software/data projects.

## Development

This site is a Create React App project using `react-app-rewired`, React Router (hash routing), and EmailJS for the contact form.

```bash
npm ci --legacy-peer-deps
npm start
npm run build
```

The `src/` directory holds editable components, styles, project metadata, and visualizations. Public research images and downloadable files live in `public/research/` and `public/documents/`.

## Publishing

- **`main`** is the authoritative, editable source branch.
- **`gh-pages`** contains compiled deployment output; don't edit it by hand.
- Pushing or merging into `main` triggers `.github/workflows/publish.yml`, which builds the site and publishes to `gh-pages`.
- GitHub Pages serves the production site at **jacecarr.dev**. The `CNAME` file must be retained.
- React Router uses hash URLs, such as `/#/projects`, for reliable navigation on static hosting.

The original `redesign/sage-instruments` branch and previous commits are preserved for comparison or rollback.

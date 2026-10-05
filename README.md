# BankDash — React dashboard

A responsive banking dashboard (React 18 + Vite + React Router) with a custom teal / violet theme.
Pages: Dashboard, Transactions, Accounts, Investments, Credit Cards, Loans, Services, Setting (Edit Profile / Preferences / Security) and a My Privileges placeholder.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts: `npm run build` (output in `dist/`) and `npm run preview`.
Requires Node.js 18 or newer.

## Structure

```
src/
  main.jsx            entry: HashRouter + UIProvider
  App.jsx             routes
  data.js             nav items, sample data, helpers
  icons.js            SVG icon paths
  styles.css          theme tokens (:root variables, light + dark) and all styles
  components/         Layout, Icon, BankCard, StatCard, ListRow, Section, Field, Toggle, Charts, ui (toast + modal)
  pages/              one file per screen
```

## Colour themes

Four palettes ship with the app: **Amethyst** (default), **Teal**, **Ember** and **Slate**, each with a light and a dark variant.
Pick one in **Setting → Preferences → Color Theme**; the choice is saved in `localStorage` (`bd-palette`).

To add your own: add a `:root[data-palette="name"]` block (light) and a `:root[data-palette="name"][data-theme="dark"]` block in `src/styles.css`,
copying the variables from an existing palette, then add it to `PALETTES` in `src/data.js` and to the allow-list in `index.html`.

## Changing the theme

Each palette is a set of CSS variables in `src/styles.css` (`--pri`, `--pri2`, `--sec`, `--amb`, `--cor`, `--bg`, card gradients `--g1..3` / `--t1..3`, …).
A dark variant follows the system setting. Chart colours are passed as props in each page file.

## Dark mode and animation

- The moon / sun button in the header switches between light and night mode. The choice is saved in `localStorage` (`bd-theme`); on first visit it follows the system setting.
- Theme colours live in `:root` and `:root[data-theme="dark"]` in `src/styles.css`. Charts use the same variables, so they recolour automatically.
- Animations: page entrance stagger, chart draw/grow, count-up numbers (`components/CountUp.jsx`), hover lift on cards, press feedback, notification pulse and bell ring, modal and menu transitions. All are switched off when the OS "reduce motion" setting is on.

## Notes

Data is sample data held in memory (resets on reload). Routing uses the URL hash, so the built `dist/` folder works on any static host.

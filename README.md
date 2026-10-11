# AetherConvert

**Convert anything, trust nothing.**

A glassy, gradient-soaked unit converter with a catch: flip on **Frenzy Mode** and it starts lying to you. Your job is to spot the lies.


**Live demo:** https://aether-converts.vercel.app/

---

## Features

- **8 categories, 70+ units:** Length, Mass, Temperature, Volume, Time, Speed, Data, and **Chaos** (bananas, blue whales, football fields, Mount Everest...)
- **Frenzy Mode:** about 40% of results are secretly wrong
- **Spot the Lie game:** after each result, call it **Legit** or **Liar!**. Track your score and streak, and your best streak is saved in your browser
- **Five kinds of lies:**
  - Secretly converted into a different unit
  - Decimal point slid around (x10, x100, /10...)
  - Digits scrambled
  - Sign flipped
  - Nudged by a few percent (the sneaky one)
- **Reveal:** after you guess, the real answer and the type of lie are shown
- **Aesthetic UI:** glassmorphism card, drifting gradient blobs, glitch and shake effects, and a color theme that changes in frenzy mode

## Tech stack

- [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- [lucide-react](https://lucide.dev/) for icons
- Plain CSS (no UI framework)

## Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
# 1. Clone the repo
git clone (https://github.com/aaronstone-23/AetherConverts)
cd AetherConverts

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the local link it prints (usually http://localhost:5173).

### Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server with live reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
├── main.jsx                  App entry point
├── App.jsx                   Page layout and frenzy on/off state
├── index.css                 Main styles (theme, card, blobs, effects)
├── game.css                  Styles for the Spot the Lie panel
├── data/
│   └── units.js              All categories and units live here
├── utils/
│   └── convert.js            Conversion math, lie logic, number formatting
└── components/
    ├── Converter.jsx         The converter UI and the game
    └── FrenzyToggle.jsx      The frenzy mode switch
```

## Customizing

**Change how often it lies.** In `src/utils/convert.js`:

```js
export const FRENZY_CHANCE = 0.4; // 0.4 = 40%
```

**Add a unit.** In `src/data/units.js`, add one line inside a category's `units`:

```js
furlong: { name: "Furlong", ...lin(201.168) },
```

The number passed to `lin()` is how many base units it equals (meters for length, kilograms for mass, and so on). The key (`furlong`) must be unique within its category.

**Add a category.** Copy an existing category block in `units.js`, change its label, icon, and units, and pick an icon from [lucide.dev/icons](https://lucide.dev/icons) (add it to the import at the top of the file).

**Add a new lie type.**
1. Add an entry to `LIE_LABELS` in `convert.js`
2. Add a matching `else if` branch inside `convert()`

**Change colors.** Edit `--accent1` and `--accent2` at the top of `src/index.css`. Frenzy mode's colors are set in the `.app--frenzy` rule.

## How the conversion works

Every unit defines how to turn itself into a base unit (`toBase`) and back (`fromBase`). Converting 5 miles to kilometers goes miles -> meters -> kilometers. This also makes non-linear units like temperature work in the same system.

## Deploying

The easiest free options are [Vercel](https://vercel.com/) and [Netlify](https://www.netlify.com/). Sign in with GitHub, import this repo, and it will detect Vite automatically. Every `git push` redeploys.


## License

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


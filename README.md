# Sammy Seal

Sammy Seal is a playful single-page Next.js app that randomizes:

- a Sammy Seal portrait
- a nickname/title style
- a joke popup experience with a delayed "Close" state
- a bonus random cartoon character in the popup

The app is built with Next.js App Router, React, and TypeScript.

## Requirements

- Node.js 20+ (recommended)
- pnpm (recommended, lockfile included)

## Getting started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `pnpm dev` - Start the local dev server with Turbopack
- `pnpm build` - Create a production build
- `pnpm start` - Run the production server
- `pnpm lint` - Run Next.js/ESLint checks

## Project structure

```text
src/app/
  page.tsx                    # Main splash page and joke button behavior
  jokes.ts                    # Joke data (setup/punchline)
  components/
    JokePopup.tsx             # Joke modal UI and answer/close flow
    RandomCartoon.tsx         # Random side-character image in popup
    ImagePreloader.tsx        # Preloads cartoon images
  utilities/
    homePageUtils.ts          # Randomization + popup action helpers
public/                       # Portraits, characters, and favicon assets
```

## Behavior notes

- Randomized values are persisted in `sessionStorage` to avoid immediate repeats.
- Joke selection avoids repeating the current and previous joke when possible.
- The joke popup shows `Answer` first, then enables `Close` after a short delay.

## Credits

Original artwork by Matthew Hill.

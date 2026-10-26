# The Unopened Letter

A poem game. Twelve poems about a letter nobody has opened yet. You deal yourself five cards, the game names your poker hand, and the matching poem is revealed with its own animation, design and music.

- **Ten poems** are tied to poker hands, from Royal Flush down to High Card.
- **Two poems** are read by everyone: *Poker with Poems* opens the game and *After the Deal* closes it (unlocked after three hands).
- Deals are weighted so rare hands turn up. The odds are in `src/logic.js` (`HANDS`, field `w`, adding up to 100).

No dependencies and no framework. The whole game is one HTML file.

## Layout

```
src/
  head.html    page title, meta, font link
  style.css    all styling, including each poem's design skin
  body.html    page markup
  logic.js     cards, hand evaluator, weighted dealing
  poems.js     the 12 poems (edit text here)
  art.js       SVG scenes and ornaments
  sound.js     generative music, one tune per hand
  app.js       game flow and rendering
tests/         hand detection and poem checks
build.js       joins src/ into index.html
index.html     built game (this is what gets published)
promo/         teaser reel and feed post
```

## Editing

Change anything in `src/`, then:

```
npm run build     # writes index.html
npm test          # checks all 10 hands deal and evaluate correctly
npm run preview   # writes preview.html with every hand already drawn
```

Open `index.html` in a browser to play. `preview.html` is for proofreading all poems; it is git-ignored.

### Poem markup (in `src/poems.js`)

- A blank line starts a new stanza.
- `_text_` is italic.
- `{color|text}` colors a phrase, e.g. `{#a8342c|wax}`.
- A line starting with `>` is stepped in; repeat it for a deeper step.
- A line starting with `~` is another voice.

## Notes

Fonts (IM Fell English, Newsreader, Courier Prime) load from Google Fonts. Without a connection the page falls back to system serif and monospace fonts. Sound starts on the first tap, as browsers require, and progress is saved in the visitor's browser.

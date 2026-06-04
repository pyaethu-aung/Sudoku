# Product

## Register

product

## Users

People solving or checking a Sudoku by hand who want an answer or a sanity check
fast. They arrive with a puzzle from a newspaper, book, or app and either want it
solved outright, or want to know whether their in-progress grid is still valid.
Context is a quick, focused session: enter digits, get a verdict, move on. No
account, no setup, no learning curve.

## Product Purpose

A no-friction Sudoku solver. Type a puzzle into a 9×9 grid and the tool reports
one of three outcomes — solved (with the full solution filled in), no solution
exists, or multiple solutions exist — while flagging rule conflicts live as you
type. Success is: a correct verdict in seconds, with zero ambiguity about which
digits the user entered versus which the solver supplied. No puzzle generation,
difficulty rating, timers, or hints — those are explicitly out of scope.

## Brand Personality

Precise, calm, confident. Three words: exact, quiet, trustworthy. The interface
should feel like a well-made instrument — the answer is correct and the tool gets
out of the way. Voice in UI copy is plain and literal ("No solution exists", not
"Uh oh!"). No mascots, no celebration, no gamification.

## Anti-references

- Toy/gamey Sudoku apps: confetti, stars, streaks, cartoon styling.
- Ad-heavy "free sudoku solver" web pages: cluttered, untrustworthy, slow.
- Generic AI-default look: warm cream/beige surface with a dusty accent, soft
  drop-shadowed cards on a tinted near-white, an uppercase tracked eyebrow over
  every section.

## Design Principles

- **The grid is the product.** Everything else (title, two buttons, one status
  line) is subordinate and minimal. The tool disappears into the task.
- **Never confuse the user about authorship.** A digit the user typed and a digit
  the solver supplied must be unmistakably different, by more than color alone.
- **Show validity continuously.** Conflicts surface the moment they exist, not on
  a button press, so the user trusts the grid as they type.
- **Plain verdicts.** State outcomes literally and without decoration; the value
  is correctness, not flourish.
- **Earned familiarity.** Standard affordances (click to select, type to fill,
  arrows to move) behave exactly as a category-fluent user expects.

## Accessibility & Inclusion

- WCAG AA for all text and meaningful UI (body ≥4.5:1, large/bold ≥3:1).
- Color is never the sole carrier of meaning: user vs solver digits also differ
  in font weight; conflicts also carry a ring/underline. Solver cells use teal
  (hue ~200), kept distinct from red conflicts across red-green color blindness.
- Full keyboard operation: select, fill, clear, and arrow-key navigation.
- Respect `prefers-reduced-motion` (instant/crossfade fallback for all motion).
- Auto light/dark via `prefers-color-scheme`.

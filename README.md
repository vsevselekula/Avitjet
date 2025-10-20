# Avitjet Builder

Figma plugin that builds parameterized "Avitjet" components from a single grid step value. The plugin enforces Avitjet layout constraints, automatically generates a responsive component, and stores configuration in plugin data for safe resizing.

## Features

- Create an Avitjet component with a configurable grid module size `G`.
- Stroke thickness choices: `1G` or `2G`, enforced automatically.
- Vector border drawn from quarter-circle arcs with inside stroke alignment.
- Internal content frame with vertical auto layout, padding `G`, spacing `0.5G`.
- Optional color segment group toggled from the UI.
- Resize guards keep the inner area ≥ `4G × 4G`, clamp extreme aspect ratios to ≤ `4:1`, and lock corner radius to the `2G…4G` window.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the plugin bundle:
   ```bash
   npm run build
   ```
   Outputs compiled assets to `dist/main.js`, `dist/ui.js`, and copies `src/ui.html` to `dist/ui.html`.
3. In Figma Desktop, open **Plugins → Development → Import plugin from manifest…** and select the `manifest.json` file in this project.

## Usage

1. Run **Avitjet Builder** from the plugins list.
2. Enter a grid step `G` in pixels (integer ≥ 2).
3. Choose stroke thickness (`1G` or `2G`) and whether to show color segments.
4. Click **Create Avitjet** to generate a component named `Avitjet/G=<G>/Stroke=<1|2>G/Segments=<On|Off>` in the current page.

### Avitjet Guidelines Encoded in the Plugin

- Base frame starts at `8G × 8G`.
- Border thickness clamped to `1G` or `2G`.
- Inner content region never smaller than `4G × 4G`.
- Aspect ratio constrained to a maximum of `4:1`.
- Corner radius computed from the shortest side but clamped between `2G` and `4G`.
- Optional color segments aligned to the grid and hidden by default.

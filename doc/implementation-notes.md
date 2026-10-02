# Implementation Notes - Lunar Lander

Developer-facing notes on the architecture. The physics itself is documented for educators in
[model.md](./model.md).

## Architecture Overview

Lunar Lander is a single-screen SceneryStack port of the classic PhET Flash *Lunar Lander*, with
physics constants and integration formulas taken verbatim from the ActionScript source.

```
src/
  main.ts, brand.ts, splash.ts, assert.ts, init.ts
  LunarLanderColors.ts, LunarLanderNamespace.ts
  i18n/StringManager.ts, strings_*.json
  preferences/
  lunar-lander/
    LunarLanderScreen.ts
    model/
      LunarLanderModel.ts           TModel: step, controls, landing/collision
      Lander.ts                       position, velocity, angle, thrust, fuel, mass
      Terrain.ts, TerrainData.ts      seeded deterministic surface, zones, boulders
      ScoreKeeper.ts                  per-zone scoring
      CrashState.ts                   IN_FLIGHT | SOFT | HARD | CRASH
      LunarLanderConstants.ts
    view/
      LunarLanderScreenView.ts        camera zoom, keyboard, world assembly
      StarfieldNode.ts, TerrainNode.ts, LanderNode.ts
      VectorsNode.ts, ExplosionNode.ts, MessageNode.ts
      ControlPanel.ts, ReadoutsNode.ts, FuelGaugeNode.ts
      AttitudeIndicatorNode.ts, ScoreReadoutNode.ts
      ThrottleControlNode.ts, StartOverlayNode.ts
      LunarLanderSoundView.ts         synthesized tambo audio
      LunarLanderScreenSummaryContent.ts, LunarLanderKeyboardHelpContent.ts
```

Data flows Model → View through AXON `Property` objects and one-shot `Emitter`s (`tiltEmitter`,
`explosionEmitter`, `outOfFuelEmitter`). Empty-tank events fire only for engine consumption,
after collision resolution, so crashes never announce fuel depletion.

## Key design decisions

- **Flash-fidelity physics.** `stepInternal` uses the original constant-acceleration (exact kinematic) update, `GRAVITY`
  = 1.6, `MASS_EMPTY` = 6839, `MAX_THRUST` = 45000, `ISP` = 3050, fuel burn Δm = F·Δt/ISP.
  Do not "modernize" integrator or constants without an explicit fidelity break.
- **Absolute coordinates.** `Lander.positionProperty` is (x, y_abs) in model metres. Altitude
  readout = y_abs − `terrain.surfaceY(x)`. Landing test: y_abs ≤ surfaceY(x).
- **Fixed timestep.** `FIXED_DT` = 0.04 s, `MAX_CATCHUP_STEPS` = 5. Game paused until
  `startGame()` sets `hasStartedProperty` and `isPlayingProperty`.
- **CrashState terminal.** `CRASH_LANDED` stops physics until Reset All. Boulder hit zeros fuel,
  fires `explosionEmitter`.
- **Level attitude test.** The angle is reduced modulo a full turn before comparing its magnitude
  with `LEVEL_ANGLE_TOLERANCE` (0.2 rad), treating full rotations and either tilt direction equally.
- **Terrain.** `TerrainData.ts` generates pads, slopes, boulders from a fixed PRNG seed (same
  surface every game); `ScoreKeeper` uses zone index and
  `SPOT_SCORES` palette (width ↔ points inverse relationship in data).
- **Camera.** View zooms from `ZOOM_START_ALTITUDE` toward `ZOOM_MAX` at touchdown; pans with
  a horizontal dead zone and follows high ascents vertically once minimum zoom is reached — see
  `LunarLanderConstants.ts`.
- **Nested constants.** `src/LunarLanderConstants.ts`.

## View components

- **LunarLanderScreenView** — inverted-Y `ModelViewTransform2`, dynamic camera on `worldNode`,
  keyboard (held ↑↓ thrust and ←→ tilt repeat, Space full thrust toggles once; Space is ignored when a button has focus so
  it doesn't double-fire). Pause/play and reset are the stock Alt+K / Alt+R hotkeys of the
  Play/Pause and Reset All buttons — no single-character game shortcuts (WCAG 2.1.4).
- **LanderNode**, **TerrainNode**, **StarfieldNode** — scene inside zoomable world.
- **Instrument cluster** — fuel gauge, attitude indicator, altitude/range/speed readouts, score.
- **ThrottleControlNode** — on-screen touch buttons mirroring keyboard.
- **StartOverlayNode** — gates play until Start pressed.
- **LunarLanderSoundView** — procedural thrust, RCS puff, low-fuel alarm, explosion (tambo
  oscillators + noise).

`LunarLanderScreenSummaryContent` is the fleet reference for live model-derived current-details in
screen summaries.

## Disposal conventions

Single-screen, session-lifetime nodes. The screen view and every node in it
(`LunarLanderScreenView`, `LunarLanderSoundView`, `FuelGaugeNode`, `VectorsNode`, `LanderNode`,
`StartOverlayNode`, `ScoreReadoutNode`) are built once and live as long as the sim, so their
`link`s, `multilink`s and `addListener`s are never removed and those classes have no `dispose()`.
`LunarLanderSoundView` generators register with the sound manager for the sim's lifetime. There is
no dynamic entity add/remove. `tests/memory-leak.test.ts` therefore covers the models
(`LunarLanderModel`, `TimeModel`) only.

## Testing

`npm test` (vitest):

- `tests/lunar-lander/model/LunarLanderModel.test.ts` — gravity fall with zero thrust,
  reset restores `IN_FLIGHT`, full-rotation landings, and engine depletion versus crash fuel loss
- `tests/browser/flight-controls.spec.ts` — ascent/descent camera tracking and reset, keyboard
  repetition, Space/button activation, and audio/accessibility fuel warnings. Run with
  `npx playwright test tests/browser --project=chromium`.
- `tests/memory-leak.test.ts` — WeakRef/GC regression suite

CI gate: `npm run lint && npm run check && npm run build`.

## Multi-screen simulations

Single-screen.

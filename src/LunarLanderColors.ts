/**
 * LunarLanderColors.ts
 *
 * All dynamic colors for the simulation, defined as ProfileColorProperty so they
 * switch automatically between the "default" (dark / space) theme and the
 * "projector" (light) theme selected in Preferences → Visual.
 *
 * Never hardcode hex values in view files — add an entry here instead.
 */
import { Color, ProfileColorProperty } from "scenerystack/scenery";
import LunarLanderNamespace from "./LunarLanderNamespace.js";

const { BLACK, WHITE } = Color;

// Neutral panel fills that contrast with either theme.
const PANEL_FILL_DARK = new Color(28, 32, 48);
const PANEL_FILL_LIGHT = new Color(240, 240, 240);
const PANEL_STROKE_DARK = "rgba(255, 255, 255, 0.4)";
const PANEL_STROKE_LIGHT = "rgba(0, 0, 0, 0.4)";

const LunarLanderColors = {
  // ── Sky / space ─────────────────────────────────────────────────────────────
  spaceBackgroundColorProperty: new ProfileColorProperty(LunarLanderNamespace, "spaceBackground", {
    default: "#05050f",
    projector: WHITE,
  }),
  starColorProperty: new ProfileColorProperty(LunarLanderNamespace, "star", { default: WHITE, projector: "#1a1a2e" }),

  // ── Earth (the blue marble hanging over the lunar surface) ────────────────────
  earthOceanColorProperty: new ProfileColorProperty(LunarLanderNamespace, "earthOcean", {
    default: "#2f6fb5",
    projector: "#3a78bd",
  }),
  earthOceanHighlightColorProperty: new ProfileColorProperty(LunarLanderNamespace, "earthOceanHighlight", {
    default: "#5aa6e6",
    projector: "#6aacea",
  }),
  earthOceanShadowColorProperty: new ProfileColorProperty(LunarLanderNamespace, "earthOceanShadow", {
    default: "#163a6b",
    projector: "#244a78",
  }),
  earthLandColorProperty: new ProfileColorProperty(LunarLanderNamespace, "earthLand", {
    default: "#5aa05a",
    projector: "#5aa05a",
  }),
  earthLandShadowColorProperty: new ProfileColorProperty(LunarLanderNamespace, "earthLandShadow", {
    default: "#3c7a40",
    projector: "#3c7a40",
  }),
  earthCloudColorProperty: new ProfileColorProperty(LunarLanderNamespace, "earthCloud", {
    default: "#f4f8ff",
    projector: "#f4f8ff",
  }),
  earthIceColorProperty: new ProfileColorProperty(LunarLanderNamespace, "earthIce", {
    default: "#eaf2f8",
    projector: "#eaf2f8",
  }),
  earthAtmosphereColorProperty: new ProfileColorProperty(LunarLanderNamespace, "earthAtmosphere", {
    default: "#8fc2ff",
    projector: "#8fc2ff",
  }),

  // ── Terrain (shaded: sunlit rim → mid → shadowed base) ───────────────────────
  terrainHighlightColorProperty: new ProfileColorProperty(LunarLanderNamespace, "terrainHighlight", {
    default: "#ddbb7e",
    projector: "#c4a468",
  }),
  terrainColorProperty: new ProfileColorProperty(LunarLanderNamespace, "terrain", {
    default: "#c2a06a",
    projector: "#b08e58",
  }),
  terrainShadowColorProperty: new ProfileColorProperty(LunarLanderNamespace, "terrainShadow", {
    default: "#7e6234",
    projector: "#6a5230",
  }),
  terrainStrokeColorProperty: new ProfileColorProperty(LunarLanderNamespace, "terrainStroke", {
    default: "#8a7038",
    projector: "#7a6230",
  }),
  terrainRimColorProperty: new ProfileColorProperty(LunarLanderNamespace, "terrainRim", {
    default: "#f3dca0",
    projector: "#d8bc78",
  }),
  terrainCraterColorProperty: new ProfileColorProperty(LunarLanderNamespace, "terrainCrater", {
    default: "rgba(110,84,40,0.40)",
    projector: "rgba(120,96,52,0.35)",
  }),
  landingZoneColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landingZone", {
    default: "#e0c888",
    projector: "#c8a860",
  }),

  // ── Boulders (3D-shaded rocks) ───────────────────────────────────────────────
  boulderHighlightColorProperty: new ProfileColorProperty(LunarLanderNamespace, "boulderHighlight", {
    default: "#f59a44",
    projector: "#e07f2a",
  }),
  boulderColorProperty: new ProfileColorProperty(LunarLanderNamespace, "boulder", {
    default: "#d2691e",
    projector: "#b8551a",
  }),
  boulderShadowColorProperty: new ProfileColorProperty(LunarLanderNamespace, "boulderShadow", {
    default: "#7c3a10",
    projector: "#6a340d",
  }),
  boulderStrokeColorProperty: new ProfileColorProperty(LunarLanderNamespace, "boulderStroke", {
    default: "#5e2c0a",
    projector: "#572808",
  }),

  // ── Lander ──────────────────────────────────────────────────────────────────
  landerHighlightColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerHighlight", {
    default: "#ececf2",
    projector: "#c6c6d0",
  }),
  landerBodyColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerBody", {
    default: "#c8c8d0",
    projector: "#a8a8b4",
  }),
  landerShadeColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerShade", {
    default: "#86889a",
    projector: "#6c6e80",
  }),
  landerAccentColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerAccent", {
    default: "#8890a8",
    projector: "#6a7088",
  }),
  // Apollo-style gold-foil descent stage.
  landerFoilColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerFoil", {
    default: "#d4a83e",
    projector: "#bb9132",
  }),
  landerFoilShadeColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerFoilShade", {
    default: "#9a7420",
    projector: "#86641c",
  }),
  landerLegColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerLeg", {
    default: "#c4c8d4",
    projector: "#80869a",
  }),
  landerEngineColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerEngine", {
    default: "#5a5a6a",
    projector: "#46465a",
  }),
  landerWindowColorProperty: new ProfileColorProperty(LunarLanderNamespace, "landerWindow", {
    default: "#1a2438",
    projector: "#14202f",
  }),
  flameColorProperty: new ProfileColorProperty(LunarLanderNamespace, "flame", {
    default: "#ffb030",
    projector: "#ff8c10",
  }),
  flameMidColorProperty: new ProfileColorProperty(LunarLanderNamespace, "flameMid", {
    default: "#ffd84a",
    projector: "#ffc230",
  }),
  flameCoreColorProperty: new ProfileColorProperty(LunarLanderNamespace, "flameCore", {
    default: "#fff6d8",
    projector: "#fff0b0",
  }),
  rcsPuffColorProperty: new ProfileColorProperty(LunarLanderNamespace, "rcsPuff", {
    default: "rgba(255,255,255,0.85)",
    projector: "rgba(120,120,140,0.85)",
  }),
  explosionColorProperty: new ProfileColorProperty(LunarLanderNamespace, "explosion", {
    default: "#ff7020",
    projector: "#e85a10",
  }),

  // ── Vectors (brighter on dark, darker on projector — same pattern as LadyBug) ─
  velocityVectorColorProperty: new ProfileColorProperty(LunarLanderNamespace, "velocityVector", {
    default: "#35cc35",
    projector: "#1f9e1f",
  }),
  accelerationVectorColorProperty: new ProfileColorProperty(LunarLanderNamespace, "accelerationVector", {
    default: "#cd2520",
    projector: "#9c1c18",
  }),

  // Play triangle on the green Start button (dark for contrast on either profile).
  playIconColorProperty: new ProfileColorProperty(LunarLanderNamespace, "playIcon", {
    default: BLACK,
    projector: BLACK,
  }),

  // ── Panels / text / readouts ──────────────────────────────────────────────────
  // Base color for the on-screen control buttons (throttle arrows, full-thrust).
  controlButtonColorProperty: new ProfileColorProperty(LunarLanderNamespace, "controlButton", {
    default: "#c8c8d0",
    projector: "#c8c8d0",
  }),
  // Green "start / play" button on the pre-launch overlay.
  startButtonColorProperty: new ProfileColorProperty(LunarLanderNamespace, "startButton", {
    default: "#35cc35",
    projector: "#1f9e1f",
  }),
  panelFillProperty: new ProfileColorProperty(LunarLanderNamespace, "panelFill", {
    default: PANEL_FILL_DARK,
    projector: PANEL_FILL_LIGHT,
  }),
  panelStrokeProperty: new ProfileColorProperty(LunarLanderNamespace, "panelStroke", {
    default: PANEL_STROKE_DARK,
    projector: PANEL_STROKE_LIGHT,
  }),
  foregroundColorProperty: new ProfileColorProperty(LunarLanderNamespace, "foreground", {
    default: WHITE,
    projector: BLACK,
  }),
  readoutBackgroundColorProperty: new ProfileColorProperty(LunarLanderNamespace, "readoutBackground", {
    default: "#0f1424",
    projector: "#e8e8ee",
  }),
  readoutTextColorProperty: new ProfileColorProperty(LunarLanderNamespace, "readoutText", {
    default: "#7CFC00",
    projector: "#0a6a00",
  }),

  // ── Fuel gauge ────────────────────────────────────────────────────────────────
  fuelBarColorProperty: new ProfileColorProperty(LunarLanderNamespace, "fuelBar", {
    default: "#35cc35",
    projector: "#1f9e1f",
  }),
  fuelBarWarningColorProperty: new ProfileColorProperty(LunarLanderNamespace, "fuelBarWarning", {
    default: "#ff5030",
    projector: "#d83018",
  }),
  fuelGaugeTrackColorProperty: new ProfileColorProperty(LunarLanderNamespace, "fuelGaugeTrack", {
    default: "#1a1f30",
    projector: "#d0d0d8",
  }),

  // ── Overlays ────────────────────────────────────────────────────────────────
  overlayFillProperty: new ProfileColorProperty(LunarLanderNamespace, "overlayFill", {
    default: "rgba(5,5,15,0.82)",
    projector: "rgba(255,255,255,0.85)",
  }),

  // Fleet-standard aliases for shared Panel + ButtonOptions modules.
  panelBackgroundColorProperty: new ProfileColorProperty(LunarLanderNamespace, "panelBackground", {
    default: PANEL_FILL_DARK,
    projector: PANEL_FILL_LIGHT,
  }),
  panelBorderColorProperty: new ProfileColorProperty(LunarLanderNamespace, "panelBorder", {
    default: PANEL_STROKE_DARK,
    projector: PANEL_STROKE_LIGHT,
  }),
  textColorProperty: new ProfileColorProperty(LunarLanderNamespace, "text", { default: WHITE, projector: BLACK }),

  // ── Light control surfaces ───────────────────────────────────────────────────
  // White chrome (combo boxes, flat push buttons, editable input fields) stays light
  // in both profiles; its text stays dark.

  /** Fill of light control surfaces: combo-box button/list, editable input fields. */
  controlSurfaceColorProperty: new ProfileColorProperty(LunarLanderNamespace, "controlSurface", {
    default: "#ffffff",
    projector: "#ffffff",
  }),

  /** Fill of a disabled control surface (grayed-out editable input field). */
  controlSurfaceDisabledColorProperty: new ProfileColorProperty(LunarLanderNamespace, "controlSurfaceDisabled", {
    default: "#cccccc",
    projector: "#cccccc",
  }),

  /** Text on light control surfaces: combo items, flat-button labels, field values, preferences. */
  controlSurfaceTextColorProperty: new ProfileColorProperty(LunarLanderNamespace, "controlSurfaceText", {
    default: "#1a1a1a",
    projector: "#1a1a1a",
  }),
};

export default LunarLanderColors;

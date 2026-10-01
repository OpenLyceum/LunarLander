/**
 * LunarLanderHotkeyData.ts
 *
 * Global flight and game shortcuts. The screen view's KeyboardListener and the
 * keyboard-help dialog both read these objects, so the dialog icons stay tied
 * to the keys that actually fire.
 *
 * Game shortcuts carry a modifier (WCAG 2.1.4, character key shortcuts):
 * pause/play is the Play/Pause button's own Alt+K hotkey and reset is the Reset
 * All button's own Alt+R hotkey, so neither is declared here.
 */

import { HotkeyData } from "scenerystack/scenery";
import { StringManager } from "../../i18n/StringManager.js";

const keyboardHelpStrings = StringManager.getInstance().getKeyboardHelpStrings();

/** Keys handled by the global flight/game listener. */
export const LunarLanderKey = {
  increaseThrust: "arrowUp",
  decreaseThrust: "arrowDown",
  tiltLeft: "arrowLeft",
  tiltRight: "arrowRight",
  fullThrust: "space",
} as const;

export const thrustHotkeyData = new HotkeyData({
  keys: [LunarLanderKey.increaseThrust, LunarLanderKey.decreaseThrust],
  repoName: "lunar-lander",
  global: true,
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.thrustStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.thrustDescriptionStringProperty,
});

export const tiltHotkeyData = new HotkeyData({
  keys: [LunarLanderKey.tiltLeft, LunarLanderKey.tiltRight],
  repoName: "lunar-lander",
  global: true,
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.tiltStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.tiltDescriptionStringProperty,
});

export const fullThrustHotkeyData = new HotkeyData({
  keys: [LunarLanderKey.fullThrust],
  repoName: "lunar-lander",
  global: true,
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.fullThrustStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.fullThrustDescriptionStringProperty,
});

/** Every global flight hotkey handled by the screen view, in dialog order. */
export const lunarLanderHotkeyData = [thrustHotkeyData, tiltHotkeyData, fullThrustHotkeyData];

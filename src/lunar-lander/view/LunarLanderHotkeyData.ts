/**
 * LunarLanderHotkeyData.ts
 *
 * Global flight and game shortcuts. The screen view's KeyboardListener and the
 * keyboard-help dialog both read these objects, so the dialog icons stay tied
 * to the keys that actually fire.
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
  reset: "r",
  pausePlay: "p",
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

export const resetHotkeyData = new HotkeyData({
  keys: [LunarLanderKey.reset],
  repoName: "lunar-lander",
  global: true,
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.resetStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.resetDescriptionStringProperty,
});

export const pausePlayHotkeyData = new HotkeyData({
  keys: [LunarLanderKey.pausePlay],
  repoName: "lunar-lander",
  global: true,
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.pausePlayStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.pausePlayDescriptionStringProperty,
});

/** Every global hotkey, in dialog order. */
export const lunarLanderHotkeyData = [
  thrustHotkeyData,
  tiltHotkeyData,
  fullThrustHotkeyData,
  resetHotkeyData,
  pausePlayHotkeyData,
];

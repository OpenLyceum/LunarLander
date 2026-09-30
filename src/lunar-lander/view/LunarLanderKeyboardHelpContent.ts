/**
 * LunarLanderKeyboardHelpContent.ts
 *
 * Content for the standard SceneryStack keyboard-help dialog (opened from the
 * keyboard "?" button joist adds to the navigation bar). Rows are built from
 * the same HotkeyData that drives LunarLanderScreenView.addKeyboardControls.
 */
import { KeyboardHelpSection, KeyboardHelpSectionRow, TwoColumnKeyboardHelpContent } from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";
import {
  fullThrustHotkeyData,
  pausePlayHotkeyData,
  resetHotkeyData,
  thrustHotkeyData,
  tiltHotkeyData,
} from "./LunarLanderHotkeyData.js";

export class LunarLanderKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    const strings = StringManager.getInstance().getKeyboardHelpStrings();

    const flightControls = new KeyboardHelpSection(strings.flightControlsHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(thrustHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(tiltHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(fullThrustHotkeyData),
    ]);

    const gameControls = new KeyboardHelpSection(strings.gameControlsHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(resetHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(pausePlayHotkeyData),
    ]);

    KeyboardHelpSection.alignHelpSectionIcons([flightControls, gameControls]);

    super([flightControls], [gameControls]);
  }
}

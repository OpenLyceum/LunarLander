/**
 * LunarLanderKeyboardHelpContent.ts
 *
 * Content for the standard SceneryStack keyboard-help dialog (opened from the
 * keyboard "?" button joist adds to the navigation bar). Rows are built from
 * the same HotkeyData that drives LunarLanderScreenView.addKeyboardControls.
 */
import {
  KeyboardHelpSection,
  KeyboardHelpSectionRow,
  PlayControlButton,
  ResetAllButton,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";
import { fullThrustHotkeyData, thrustHotkeyData, tiltHotkeyData } from "./LunarLanderHotkeyData.js";

export class LunarLanderKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    const strings = StringManager.getInstance().getKeyboardHelpStrings();

    const flightControls = new KeyboardHelpSection(strings.flightControlsHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(thrustHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(tiltHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(fullThrustHotkeyData),
    ]);

    const gameControls = new KeyboardHelpSection(strings.gameControlsHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(PlayControlButton.TOGGLE_PLAY_HOTKEY_DATA),
      KeyboardHelpSectionRow.fromHotkeyData(ResetAllButton.RESET_ALL_HOTKEY_DATA),
    ]);

    KeyboardHelpSection.alignHelpSectionIcons([flightControls, gameControls]);

    super([flightControls], [gameControls]);
  }
}

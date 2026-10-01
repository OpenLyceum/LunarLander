import { expect, test } from "@playwright/test";
import type { Bounds2 } from "scenerystack/dot";
import type { Node } from "scenerystack/scenery";
import type { LunarLanderModel } from "../../src/lunar-lander/model/LunarLanderModel.js";

// Inspect rendered geometry and capture the live warning consumers without
// changing production visibility or exposing additional public view APIs.
type FlightView = Node & {
  landerNode: Node;
  playAreaViewBounds: Bounds2;
  soundView: { beepAlarm: () => void };
  addAccessibleResponse: (response: string) => void;
  reset: () => void;
};

test.beforeEach(async ({ page }) => {
  await page.goto("/?ea");
  await page.waitForFunction(() => window.phet["joist"].sim?.screens[0]?.model);
  await page.getByRole("button", { name: "Start", exact: true }).focus();
  await page.keyboard.press("Space");
  await page.evaluate(() => {
    const model = window.phet["joist"].sim.screens[0]?.model as LunarLanderModel;
    model.timer.isPlayingProperty.value = false;
  });
});

test("camera keeps the lander visible through ascent, coasting, descent, and reset", async ({ page }) => {
  const flight = await page.evaluate(() => {
    const screen = window.phet["joist"].sim.screens[0];
    const model = screen?.model as LunarLanderModel;
    const view = screen?.view as unknown as FlightView;
    const samples: { altitude: number; descending: boolean; contained: boolean }[] = [];
    model.timer.isPlayingProperty.value = true;
    model.toggleFullThrust();
    for (let i = 0; i < 10_000 && model.crashStateProperty.value === "inFlight"; i++) {
      model.step(0.04);
      if (i % 750 === 0) {
        const craft = view.landerNode.localToGlobalBounds(view.landerNode.localBounds);
        const playArea = view.localToGlobalBounds(view.playAreaViewBounds);
        samples.push({
          altitude: model.altitudeProperty.value,
          descending: model.lander.velocityProperty.value.y < 0,
          contained: playArea.containsBounds(craft),
        });
      }
    }
    model.reset();
    view.reset();
    const resetCraft = view.landerNode.localToGlobalBounds(view.landerNode.localBounds);
    return { samples, resetContained: view.localToGlobalBounds(view.playAreaViewBounds).containsBounds(resetCraft) };
  });

  expect(flight.samples.some((sample) => sample.altitude > 2000)).toBe(true);
  expect(flight.samples.some((sample) => sample.altitude > 2000 && sample.descending)).toBe(true);
  expect(flight.samples.every((sample) => sample.contained)).toBe(true);
  expect(flight.resetContained).toBe(true);
});

test("arrow keys repeat thrust and tilt while Space toggles only once per press", async ({ page }) => {
  await page.mouse.click(400, 100);
  for (const key of ["ArrowUp", "ArrowRight"]) {
    for (let i = 0; i < 5; i++) {
      await page.keyboard.down(key);
    }
    await page.keyboard.up(key);
  }
  const controls = await page.evaluate(() => {
    const model = window.phet["joist"].sim.screens[0]?.model as LunarLanderModel;
    return { thrust: model.lander.thrustProperty.value, angle: model.lander.angleProperty.value };
  });
  expect(controls.thrust).toBe(5 * 2250);
  expect(controls.angle).toBeCloseTo((5 * 3 * Math.PI) / 180);

  for (let i = 0; i < 6; i++) {
    await page.keyboard.down("Space");
  }
  await page.keyboard.up("Space");
  expect(
    await page.evaluate(() => {
      const model = window.phet["joist"].sim.screens[0]?.model as LunarLanderModel;
      return model.lander.thrustProperty.value;
    }),
  ).toBe(45000);
  await page.keyboard.press("Space");
  expect(
    await page.evaluate(() => {
      const model = window.phet["joist"].sim.screens[0]?.model as LunarLanderModel;
      return model.lander.thrustProperty.value;
    }),
  ).toBe(0);

  await page.getByRole("button", { name: "Full Thrust", exact: true }).focus();
  await page.keyboard.press("Space");
  expect(
    await page.evaluate(() => {
      const model = window.phet["joist"].sim.screens[0]?.model as LunarLanderModel;
      return model.lander.thrustProperty.value;
    }),
  ).toBe(45000);
});

test("audio and accessible warnings distinguish fuel consumption from crash damage", async ({ page }) => {
  const warnings = await page.evaluate(() => {
    const screen = window.phet["joist"].sim.screens[0];
    const model = screen?.model as LunarLanderModel;
    const view = screen?.view as unknown as FlightView;
    const responses: string[] = [];
    let beeps = 0;
    view.addAccessibleResponse = (response) => {
      responses.push(String(response));
    };
    view.soundView.beepAlarm = () => {
      beeps++;
    };
    model.lander.remainingFuelProperty.value = 50;
    responses.length = 0;
    beeps = 0;
    const x = model.terrain.startX;
    const pos = model.lander.positionProperty.value;
    model.lander.positionProperty.value = pos.plusXY(0, model.terrain.surfaceY(x) + 0.01 - pos.y);
    model.lander.velocityProperty.value = model.lander.velocityProperty.value.plusXY(0, -10);
    model.timer.isPlayingProperty.value = true;
    model.step(0.04);
    const crash = { responses: [...responses], beeps };

    model.reset();
    model.startGame();
    model.lander.remainingFuelProperty.value = 0.1;
    model.toggleFullThrust();
    responses.length = 0;
    beeps = 0;
    model.step(0.04);
    return { crash, depletion: { responses, beeps } };
  });

  expect(warnings.crash.beeps).toBe(0);
  expect(warnings.crash.responses).toHaveLength(1);
  expect(warnings.crash.responses[0]).toContain("Crash landing");
  expect(warnings.depletion.beeps).toBe(1);
  expect(warnings.depletion.responses).toEqual(["Out of fuel. The engine has shut down."]);
});

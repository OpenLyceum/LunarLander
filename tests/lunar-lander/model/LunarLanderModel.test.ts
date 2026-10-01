import { Vector2 } from "scenerystack/dot";
import { afterEach, describe, expect, it } from "vitest";
import LunarLanderConstants from "../../../src/LunarLanderConstants.js";
import { CrashState } from "../../../src/lunar-lander/model/CrashState.js";
import { LunarLanderModel } from "../../../src/lunar-lander/model/LunarLanderModel.js";
import { LunarLanderPreferencesModel } from "../../../src/preferences/LunarLanderPreferencesModel.js";

const FIXED_DT: number = LunarLanderConstants.FIXED_DT;

describe("LunarLanderModel", () => {
  let model: LunarLanderModel;

  afterEach(() => {
    model.reset();
  });

  it("falls under gravity with zero thrust after startGame", () => {
    const preferences = new LunarLanderPreferencesModel();
    model = new LunarLanderModel(preferences);

    const yBefore = model.lander.positionProperty.value.y;
    expect(model.lander.thrustProperty.value).toBeCloseTo(0, 6);

    model.startGame();
    model.step(FIXED_DT);

    expect(model.lander.positionProperty.value.y).toBeLessThan(yBefore);
    expect(model.crashStateProperty.value).toBe(CrashState.IN_FLIGHT);
  });

  it("reset restores IN_FLIGHT crash state", () => {
    const preferences = new LunarLanderPreferencesModel();
    model = new LunarLanderModel(preferences);
    model.crashStateProperty.value = CrashState.CRASH_LANDED;

    model.reset();

    expect(model.crashStateProperty.value).toBe(CrashState.IN_FLIGHT);
    expect(model.hasStartedProperty.value).toBe(false);
  });

  it("full thrust falls slower than free fall", () => {
    const preferences = new LunarLanderPreferencesModel();
    const freeFall = new LunarLanderModel(preferences);
    const thrusting = new LunarLanderModel(preferences);

    freeFall.startGame();
    thrusting.startGame();
    thrusting.toggleFullThrust();

    for (let i = 0; i < 10; i++) {
      freeFall.step(FIXED_DT);
      thrusting.step(FIXED_DT);
    }

    expect(thrusting.lander.positionProperty.value.y).toBeGreaterThan(freeFall.lander.positionProperty.value.y);
    freeFall.reset();
    thrusting.reset();
    model = freeFall;
  });

  it.each([-2, -1, 1, 2])("lands softly after %i full rotations", (turns) => {
    model = new LunarLanderModel(new LunarLanderPreferencesModel());
    model.startGame();
    for (let i = 0; i < Math.abs(turns) * 120; i++) {
      if (turns < 0) {
        model.tiltLeft();
      } else {
        model.tiltRight();
      }
    }
    const x = model.terrain.startX;
    model.lander.positionProperty.value = new Vector2(x, model.terrain.surfaceY(x) + 0.01);
    model.lander.velocityProperty.value = new Vector2(0, -1);

    model.step(FIXED_DT);

    expect(model.crashStateProperty.value).toBe(CrashState.SOFT_LANDED);
    expect(model.scoreKeeper.scoreProperty.value).toBeGreaterThan(0);
  });

  it.each([-0.25, 0.25])("still crashes when tilted by %f radians after a full turn", (tilt) => {
    model = new LunarLanderModel(new LunarLanderPreferencesModel());
    model.startGame();
    model.lander.angleProperty.value = 2 * Math.PI + tilt;
    const x = model.terrain.startX;
    model.lander.positionProperty.value = new Vector2(x, model.terrain.surfaceY(x) + 0.01);
    model.lander.velocityProperty.value = new Vector2(0, -1);

    model.step(FIXED_DT);

    expect(model.crashStateProperty.value).toBe(CrashState.CRASH_LANDED);
  });

  it("reports engine fuel depletion once and can report it again after reset", () => {
    model = new LunarLanderModel(new LunarLanderPreferencesModel());
    let warnings = 0;
    model.outOfFuelEmitter.addListener(() => {
      warnings++;
    });

    for (let burn = 0; burn < 2; burn++) {
      model.startGame();
      model.lander.remainingFuelProperty.value = 0.1;
      model.toggleFullThrust();
      model.step(FIXED_DT);
      expect(model.lander.remainingFuelProperty.value).toBe(0);
      expect(model.lander.thrustProperty.value).toBe(0);
      expect(warnings).toBe(burn + 1);
      model.step(FIXED_DT);
      expect(warnings).toBe(burn + 1);
      model.reset();
      expect(warnings).toBe(burn + 1);
    }
  });

  it.each(["terrain", "boulder"])("does not report fuel depletion for a low-fuel %s crash", (obstacle) => {
    model = new LunarLanderModel(new LunarLanderPreferencesModel());
    model.startGame();
    model.lander.remainingFuelProperty.value = 50;
    let warnings = 0;
    model.outOfFuelEmitter.addListener(() => {
      warnings++;
    });
    if (obstacle === "boulder") {
      const boulder = model.terrain.boulders[0];
      expect(boulder).toBeDefined();
      if (!boulder) {
        throw new Error("The terrain must contain a boulder");
      }
      model.lander.positionProperty.value = new Vector2(boulder.x, boulder.surface + boulder.radius);
    } else {
      const x = model.terrain.startX;
      model.lander.positionProperty.value = new Vector2(x, model.terrain.surfaceY(x) + 0.01);
    }
    model.lander.velocityProperty.value = new Vector2(0, -10);

    model.step(FIXED_DT);

    expect(model.crashStateProperty.value).toBe(CrashState.CRASH_LANDED);
    expect(model.lander.remainingFuelProperty.value).toBe(0);
    expect(warnings).toBe(0);
  });

  it("only reports a crash when the engine empties the tank on the impact slice", () => {
    model = new LunarLanderModel(new LunarLanderPreferencesModel());
    model.startGame();
    model.lander.remainingFuelProperty.value = 0.1;
    model.toggleFullThrust();
    const x = model.terrain.startX;
    model.lander.positionProperty.value = new Vector2(x, model.terrain.surfaceY(x) + 0.01);
    model.lander.velocityProperty.value = new Vector2(0, -10);
    let warnings = 0;
    model.outOfFuelEmitter.addListener(() => {
      warnings++;
    });

    model.step(FIXED_DT);

    expect(model.crashStateProperty.value).toBe(CrashState.CRASH_LANDED);
    expect(warnings).toBe(0);
  });
});

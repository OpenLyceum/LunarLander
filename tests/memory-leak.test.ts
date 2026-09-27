/**
 * Fleet-standard memory-leak regression suite.
 * LunarLanderModel is created, started, stepped, reset, and dropped for GC.
 */

import { describe, expect, it } from "vitest";
import { TimeModel } from "../src/common/TimeModel.js";
import LunarLanderConstants from "../src/LunarLanderConstants.js";
import { LunarLanderModel } from "../src/lunar-lander/model/LunarLanderModel.js";
import { LunarLanderPreferencesModel } from "../src/preferences/LunarLanderPreferencesModel.js";
import { describeDisposalLeaks, forceGC } from "./helpers/memoryLeak.js";

const FIXED_DT: number = LunarLanderConstants.FIXED_DT;

function createAndDropModel(): WeakRef<object> {
  const preferences = new LunarLanderPreferencesModel();
  const model = new LunarLanderModel(preferences);
  model.startGame();
  model.step(FIXED_DT);
  model.reset();
  return new WeakRef<object>(model);
}

describe("Memory leak regression", () => {
  it("LunarLanderModel is collected after drop", async () => {
    const ref = createAndDropModel();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("repeated create/drop cycles leave no survivors", async () => {
    const refs: WeakRef<object>[] = [];
    for (let i = 0; i < 10; i++) {
      refs.push(createAndDropModel());
    }
    await forceGC(refs);
    expect(refs.filter((r) => r.deref() !== undefined).length).toBe(0);
  });
});

describeDisposalLeaks([{ name: "TimeModel", create: () => new TimeModel(), idempotentDispose: true }]);

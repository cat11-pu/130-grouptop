import assert from "node:assert";
import { groupCount } from "../count.js";
import { ranked } from "../top.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("groupCount returns pairs", () => {
  assert.ok(Array.isArray(groupCount([{ a: 1 }], ["a"])));
});

check("groupCount pairs have key and count", () => {
  const pair = groupCount([{ a: 1 }], ["a"])[0];
  assert.strictEqual(pair.length, 2);
});

check("ranked returns pairs", () => {
  assert.ok(Array.isArray(ranked([{ a: 1 }], ["a"], 1)));
});

check("render counts groups", () => {
  assert.strictEqual(typeof render({ rows: [{ a: 1 }], keys: ["a"], limit: 1 }).groups, "number");
});

check("render exposes biggest", () => {
  assert.strictEqual(typeof render({ rows: [{ a: 1 }], keys: ["a"], limit: 1 }).biggest, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);

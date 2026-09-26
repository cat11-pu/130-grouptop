// app.js：渲染结果
import { groupCount } from "./count.js";
import { ranked } from "./top.js";

export function render(spec) {
  const rows = spec.rows || [];
  const keys = spec.keys || [];
  const all = ranked(rows, keys, Math.max(rows.length, 1));
  const counts = all.map((pair) => pair[1]);
  const top = all.slice(0, spec.limit || 0);
  return { top_keys: top.map((pair) => pair[0]), top_counts: top.map((pair) => pair[1]),
           counts: counts, groups: all.length,
           biggest: counts.length ? Math.max.apply(null, counts) : 0 };
}

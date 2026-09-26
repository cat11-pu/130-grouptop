// top.js：排名与取前列（条数从多到少，条数相同按组合键字典序从小到大）
import { groupCount } from "./count.js";

export function ranked(rows, keys, limit) {
  if (limit === undefined || limit === null || limit < 1) {
    const error = new Error("E_BAD_LIMIT: limit must be at least 1");
    error.code = "E_BAD_LIMIT";
    throw error;
  }
  const pairs = groupCount(rows, keys);
  pairs.sort((left, right) => {
    if (right[1] !== left[1]) return right[1] - left[1];
    return left[0] < right[0] ? -1 : left[0] > right[0] ? 1 : 0;
  });
  return pairs.slice(0, limit);
}

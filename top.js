// top.js：排名与取前列（条数降序，同条数按组合键字典序升序）
import { groupCount } from "./count.js";

export function ranked(rows, keys, limit) {
  if (limit === undefined || limit === null || limit < 1) {
    const error = new Error("取前几名的上限必须不小于一");
    error.code = "E_BAD_LIMIT";
    throw error;
  }
  const groups = groupCount(rows, keys);
  groups.sort((left, right) => {
    if (right[1] !== left[1]) { return right[1] - left[1]; }
    if (left[0] === right[0]) { return 0; }
    return left[0] < right[0] ? -1 : 1;
  });
  return groups.slice(0, limit);
}

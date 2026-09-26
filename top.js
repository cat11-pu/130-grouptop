// top.js：排名与取前列（基线：原样返回）
import { groupCount } from "./count.js";

export function ranked(rows, keys, limit) {
  return groupCount(rows, keys);
}

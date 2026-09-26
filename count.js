// count.js：分组计数（基线：不分组，每行算一组）
export function groupCount(rows, keys) {
  return rows.map((item, spot) => [String(spot), 1]);
}

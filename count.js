// count.js：按组合键分组计数（一次扫描，哈希聚合）
export function groupCount(rows, keys) {
  if (!rows || rows.length === 0) {
    const error = new Error("没有记录可分组");
    error.code = "E_EMPTY_ROWS";
    throw error;
  }
  const tally = new Map();
  for (const row of rows) {
    const parts = [];
    for (const field of keys) {
      const value = row ? row[field] : undefined;
      parts.push(value === undefined || value === null ? "" : String(value));
    }
    const key = parts.join("|");
    tally.set(key, (tally.get(key) || 0) + 1);
  }
  return Array.from(tally, (pair) => [pair[0], pair[1]]);
}

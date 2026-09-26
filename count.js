// count.js：分组计数（按字段顺序取值，竖线连成组合键）
export function groupCount(rows, keys) {
  if (!rows || rows.length === 0) {
    const error = new Error("E_EMPTY_ROWS: no rows to group");
    error.code = "E_EMPTY_ROWS";
    throw error;
  }
  const counts = new Map();
  for (const row of rows) {
    const combo = keys.map((key) => {
      const value = row ? row[key] : undefined;
      return value === undefined || value === null ? "" : String(value);
    }).join("|");
    counts.set(combo, (counts.get(combo) || 0) + 1);
  }
  return Array.from(counts.entries());
}

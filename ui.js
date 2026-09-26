// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let limit = spec.limit || 3;
  parts.log.textContent = "行 " + (spec.rows || []).length + " 条，取前 " + limit + " 名。";

  function draw() {
    const scene = Object.assign({}, spec, { limit: limit });
    let view = null;
    try {
      view = render(scene);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.top_keys.forEach(function (key, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = key;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = view.top_counts[spot] + " 条";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "分组 " + view.groups + " 个，最大条数 " + view.biggest;
    parts.log.textContent = "全部组的条数 " + JSON.stringify(view.counts);
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "分组并取前列";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "多取一名";
  moreButton.addEventListener("click", function () {
    limit = limit + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "少取一名";
  lessButton.addEventListener("click", function () {
    limit = Math.max(1, limit - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "取前几名";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(limit);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 1) { limit = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看分组数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { limit: limit }));
    parts.out.textContent = "分组 " + view.groups + " 个，最大条数 " + view.biggest;
  });
  parts.controls.appendChild(readButton);

  draw();
}

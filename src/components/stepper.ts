export interface StepperOptions {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function renderStepper(opts: StepperOptions): HTMLElement {
  const bar = document.createElement("div");
  bar.className = "stepper";

  const prev = document.createElement("button");
  prev.className = "prev";
  prev.textContent = "◀ Prev";
  prev.disabled = opts.index === 0;
  prev.addEventListener("click", opts.onPrev);

  const pos = document.createElement("span");
  pos.className = "stepper-pos";
  pos.textContent = `${opts.index + 1} of ${opts.total}`;

  const next = document.createElement("button");
  next.className = "next";
  next.textContent = "Next ▶";
  next.disabled = opts.index === opts.total - 1;
  next.addEventListener("click", opts.onNext);

  bar.append(prev, pos, next);
  return bar;
}

const gridInput = document.getElementById("grid-input") as HTMLInputElement;
const strokeSelect = document.getElementById("stroke-select") as HTMLSelectElement;
const segmentsCheckbox = document.getElementById("segments-checkbox") as HTMLInputElement;
const form = document.getElementById("avitjet-form") as HTMLFormElement;
const errorLabel = document.getElementById("error") as HTMLDivElement;
const createButton = document.getElementById("create-button") as HTMLButtonElement;

function parseGrid(): number | null {
  const value = Number(gridInput.value);
  if (!Number.isFinite(value)) return null;
  if (!Number.isInteger(value)) return null;
  if (value < 2) return null;
  return value;
}

function validate(): void {
  const grid = parseGrid();
  if (grid === null) {
    errorLabel.textContent = "Grid step must be an integer ≥ 2.";
    createButton.disabled = true;
  } else {
    errorLabel.textContent = "";
    createButton.disabled = false;
  }
}

gridInput.addEventListener("input", validate);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const grid = parseGrid();
  if (grid === null) {
    validate();
    return;
  }
  const strokeMultiplier = Number(strokeSelect.value);
  const stroke = strokeMultiplier * grid;
  const segments = segmentsCheckbox.checked;

  parent.postMessage(
    {
      pluginMessage: {
        type: "create",
        grid,
        stroke,
        segments,
      },
    },
    "*",
  );
});

validate();

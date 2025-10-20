const gridInput = document.getElementById("grid-input");
const strokeSelect = document.getElementById("stroke-select");
const segmentsCheckbox = document.getElementById("segments-checkbox");
const form = document.getElementById("avitjet-form");
const errorLabel = document.getElementById("error");
const createButton = document.getElementById("create-button");

function parseGrid() {
  const value = Number(gridInput.value);
  if (!Number.isFinite(value)) return null;
  if (!Number.isInteger(value)) return null;
  if (value < 2) return null;
  return value;
}

function validate() {
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

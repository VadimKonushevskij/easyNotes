const userInput = document.getElementById("userInput");
const addButton = document.getElementById("addButton");
const noteList = document.getElementById("noteList");

const noteArray = [
  { title: "First note", completed: false },
  { title: "Second note", completed: true },
  { title: "Third note", completed: false },
];

addButton.onclick = function () {
  if (userInput.value) {
    const newNote = {
      title: userInput.value,
      completed: false,
    };
    noteArray.push(newNote);
  } else return;
  userInput.value = "";
  renderPreviousNote();
};

noteList.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;
    if (type === "ready") {
      noteArray[index].completed = !noteArray[index].completed;
    } else if (type === "delete") {
      noteArray.splice(index, 1);
    }
    renderPreviousNote();
  }
};

function renderPreviousNote() {
  noteList.innerHTML = "";
  for (let i = 0; i < noteArray.length; i++) {
    noteList.insertAdjacentHTML("beforeend", getNoteTemplate(noteArray[i], i));
  }
}
renderPreviousNote();

function getNoteTemplate(noteArray, index) {
  console.log(noteArray.completed);
  return `
   <li id="noteItem">
      <span class="${noteArray.completed ? "crossText" : ""}">${
    noteArray.title
  }</span>
      <div class="buttonHolder">
        <button id="ready" class="${
          noteArray.completed ? "completed" : ""
        }" data-index="${index}" data-type="ready">+</button>
        <button id="delete" data-index="${index}" data-type="delete">-</button>
      </div>
    </li>
        `;
}

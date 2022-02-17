export default class TaskCollection {
  static counter = 0;

  constructor() {
    this.collection = [
      {
        description: "This is Task 1 with bigger length!",
        completed: false,
        index: 1,
      },
      {
        description: "Task 2",
        completed: false,
        index: 2,
      },
      {
        description: "Task 3",
        completed: false,
        index: 3,
      },
      {
        description: "Task 4",
        completed: false,
        index: 4,
      },
      {
        description: "Task 5",
        completed: false,
        index: 5,
      },
      {
        description: "Task 6",
        completed: false,
        index: 6,
      },
    ];
    TaskCollection.counter = this.collection.length;
  }

  add(desc) {
    const idx = this.getCollection().length + 1;
    const newTask = { index: idx, description: desc, completed: false };
    this.collection.push(newTask);

    // Append task to the markup
    let ul = document.querySelector("ul");
    let listItem = document.createElement("li");
    listItem.className = "d-flex item";
    listItem.id = "task-" + newTask.index;
    listItem.setAttribute("draggable", true);
    let label = document.createElement("label");
    label.id = "label-" + newTask.index;
    label.setAttribute("for", "task" + newTask.index);
    let status = document.createElement("input");
    status.setAttribute("type", "checkbox");
    status.id = "task" + newTask.index;
    status.setAttribute("name", "status-" + newTask.index);
    label.appendChild(status);
    label.append(newTask.description);
    listItem.appendChild(label);
    let controls = document.createElement("div");
    controls.id = "controls-" + newTask.index;
    controls.classList.add("controls");
    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.id = "remove-btn-" + newTask.index;
    removeBtn.innerText = "Delete";
    controls.appendChild(removeBtn);
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.id = "edit-btn-" + newTask.index;
    editBtn.innerText = "Edit";
    controls.appendChild(editBtn);
    let editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.className = "edit-input d-none";
    editInput.value = newTask.description;
    editInput.id = "edit-input-" + newTask.index;
    listItem.appendChild(editInput);
    listItem.appendChild(controls);
    ul.appendChild(listItem);

    // Add event listeners
    this.addTaskRemoveEventListener(newTask.index);
    this.addTaskEditBtnEventListener(newTask.index);
    this.addTaskEditInputEventListener(newTask.index);
  }

  addTaskRemoveEventListener(index) {
    let removeBtn = document.querySelector("#remove-btn-" + index);
    removeBtn.addEventListener("click", (e) => {
      this.remove(index);
    });
  }

  addTaskEditBtnEventListener(index) {
    let editBtn = document.querySelector("#edit-btn-" + index);
    editBtn.addEventListener("click", () => {
      let controls = document.querySelector("#controls-" + index);
      controls.classList.add("d-none");
      let label = document.querySelector("#label-" + index);
      label.classList.add("d-none");
      let editInput = document.querySelector("#edit-input-" + index);
      editInput.classList.remove("d-none");
    });
  }

  addTaskEditInputEventListener(index) {
    let editInput = document.querySelector("#edit-input-" + index);
    editInput.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
        this.editTask(index, e.target.value);
        e.preventDefault();

        let controls = document.querySelector("#controls-" + index);
        controls.classList.remove("d-none");
        let label = document.querySelector("#label-" + index);
        label.innerHTML = "";
        label.classList.remove("d-none");
        let status = document.createElement("input");
        status.setAttribute("type", "checkbox");
        status.id = "task" + index;
        status.setAttribute("name", "status-" + index);
        label.appendChild(status);
        label.append(e.target.value);
        let editInput = document.querySelector("#edit-input-" + index);
        editInput.classList.add("d-none");
      }
    });
  }

  remove(idx) {
    this.collection = this.collection.filter(
      (task) => task.index !== parseInt(idx, 10)
    );
    const toRemove = document.querySelector("#task-" + idx);
    toRemove.remove();
    TaskCollection.counter -= 1;
    this.resetIndexes(idx);
    this.render();
  }

  resetIndexes(deletedIndex) {
    if (deletedIndex < this.getCollection().length) {
      for (
        let idx = deletedIndex - 1;
        idx < this.getCollection().length;
        idx += 1
      ) {
        this.getCollection()[idx].index = idx + 1;
      }
    }
  }

  getCollection() {
    return this.collection;
  }

  getTasksMarkup() {
    const ul = document.querySelector("ul");

    this.getCollection().forEach((task) => {
      ul.innerHTML += `<li draggable="true" class="d-flex item" id="task-${task.index}">
          <label for="task${task.index}" class="d-flex">
            <input type="checkbox" name="task${task.index}" id="task${task.index}" />${task.description}</label
          >
          <div class="controls">
          <button id="remove-btn-${task.index}">Delete</button>
          <button id="edit-btn-${task.index}">Edit</button>
          </div>
        </li>`;
      this.addTaskRemoveEventListener(task.index);
    });
  }

  render() {
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    this.getCollection().forEach((task) => {
      let listItem = document.createElement("li");
      listItem.className = "d-flex item";
      listItem.id = "task-" + task.index;
      listItem.setAttribute("draggable", true);
      let label = document.createElement("label");
      label.id = "label-" + task.index;
      label.setAttribute("for", "task" + task.index);
      let status = document.createElement("input");
      status.setAttribute("type", "checkbox");
      status.id = "task" + task.index;
      status.setAttribute("name", "status-" + task.index);
      label.appendChild(status);
      label.append(task.description);
      listItem.appendChild(label);
      let controls = document.createElement("div");
      controls.id = "controls-" + task.index;
      controls.classList.add("controls");
      let removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-btn");
      removeBtn.id = "remove-btn-" + task.index;
      removeBtn.innerText = "Delete";
      controls.appendChild(removeBtn);
      let editBtn = document.createElement("button");
      editBtn.classList.add("edit-btn");
      editBtn.id = "edit-btn-" + task.index;
      editBtn.innerText = "Edit";
      controls.appendChild(editBtn);
      let editInput = document.createElement("input");
      editInput.setAttribute("type", "text");
      editInput.className = "edit-input d-none";
      editInput.value = task.description;
      editInput.id = "edit-input-" + task.index;
      listItem.appendChild(editInput);
      listItem.appendChild(controls);
      ul.appendChild(listItem);

      //   Add event listeners
      this.addTaskRemoveEventListener(task.index);
      this.addTaskEditBtnEventListener(task.index);
      this.addTaskEditInputEventListener(task.index);
    });
  }

  getTask(id) {
    return this.collection.filter((task) => parseInt(id, 10) === task.id);
  }

  editTask(index, data) {
    const idx = this.collection.findIndex(
      (task) => task.index === parseInt(index, 10)
    );
    this.collection[idx].name = data;
  }
}

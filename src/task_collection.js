export default class TaskCollection {
  static counter = 0;

  constructor() {
    this.collection = [
      {
        description: "This is Task 1 with bigger length!",
        completed: false,
        index: 0,
      },
      {
        description: "Task 2",
        completed: false,
        index: 1,
      },
      {
        description: "Task 3",
        completed: false,
        index: 2,
      },
      {
        description: "Task 4",
        completed: false,
        index: 3,
      },
      {
        description: "Task 5",
        completed: false,
        index: 4,
      },
      {
        description: "Task 6",
        completed: false,
        index: 5,
      },
    ];
    TaskCollection.counter = this.collection.length;
  }

  add(desc) {
    const idx = TaskCollection.counter;
    TaskCollection.counter += 1;
    const newTask = { index: idx, description: desc, completed: false };
    this.collection.push(newTask);

    // Append task to the markup
    let ul = document.querySelector("ul");
    let listItem = document.createElement("li");
    listItem.className = "d-flex item";
    listItem.id = "task-" + newTask.index;
    listItem.setAttribute("draggable", true);
    let label = document.createElement("label");
    label.setAttribute("for", "task" + newTask.index);
    let taskDesc = document.createElement("input");
    taskDesc.setAttribute("type", "checkbox");
    taskDesc.id = "task" + newTask.index;
    taskDesc.setAttribute("name", "task" + newTask.index);
    label.appendChild(taskDesc);
    label.textContent += newTask.description;
    listItem.appendChild(label);
    let controls = document.createElement("div");
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
    listItem.appendChild(controls);
    ul.appendChild(listItem);
    this.addTaskRemoveEventListener(newTask.index);
  }

  addTaskRemoveEventListener(index) {
    let removeBtn = document.querySelector("#remove-btn-" + index);
    // console.log(removeBtn);
    removeBtn.addEventListener("click", (e) => {
      //   console.log(index);
      console.log(this);
      this.remove(index);
    });
  }

  remove(idx) {
    // console.log("removes....");
    this.collection = this.collection.filter(
      (task) => task.index !== parseInt(idx, 10)
    );
    const toRemove = document.querySelector("#task-" + idx);
    toRemove.remove();
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
      //   console.log(task.index);
      this.addTaskRemoveEventListener(task.index);
    });
  }

  render() {
    const ul = document.querySelector("ul");
    this.getCollection().forEach((task) => {
      let listItem = document.createElement("li");
      listItem.className = "d-flex item";
      listItem.id = "task-" + task.index;
      listItem.setAttribute("draggable", true);
      let label = document.createElement("label");
      label.setAttribute("for", "task" + task.index);
      let taskDesc = document.createElement("input");
      taskDesc.setAttribute("type", "checkbox");
      taskDesc.id = "task" + task.index;
      taskDesc.setAttribute("name", "task" + task.index);
      label.appendChild(taskDesc);
      label.textContent += task.description;
      listItem.appendChild(label);
      let controls = document.createElement("div");
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
      listItem.appendChild(controls);
      ul.appendChild(listItem);
      this.addTaskRemoveEventListener(task.index);
    });
  }

  getTask(id) {
    return this.collection.filter((task) => parseInt(id, 10) === task.id);
  }

  editTask(id, data) {
    const idx = this.collection.findIndex(
      (task) => task.id === parseInt(id, 10)
    );
    this.collection[idx].name = data;
  }
}

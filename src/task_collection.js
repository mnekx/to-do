export default class TaskCollection {
  static counter = 0;

  constructor() {
    this.collection = [
      {
        description: 'This is Task 1 with bigger length!',
        completed: false,
        index: 0,
      },
      {
        description: 'Task 2',
        completed: false,
        index: 1,
      },
      {
        description: 'Task 3',
        completed: false,
        index: 2,
      },
      {
        description: 'Task 4',
        completed: false,
        index: 3,
      },
      {
        description: 'Task 5',
        completed: false,
        index: 4,
      },
    ];
  }

  add(desc) {
    const idx = TaskCollection.counter;
    TaskCollection.counter += 1;
    const newTask = { index: idx, description: desc, completed: false };
    this.collection.push(newTask);
  }

  remove(idx) {
    this.collection = this.collection.filter(
      (task) => task.index !== parseInt(idx, 10),
    );
  }

  getCollection() {
    return this.collection;
  }

  getTasksMarkup() {
    const ul = document.querySelector('ul');
    this.getCollection().forEach((task) => {
      ul.innerHTML += `<li draggable="true" class="d-flex item" id="${task.index}">
        <label for="task${task.index}">
          <input type="checkbox" name="task${task.index}" id="task${task.index}" />${task.desc}</label
        >
        <div class="controls">
          <button>delete</button>
          <button>edit</button>
        </div>
      </li>`;
    });
  }

  render() {
    const ul = document.querySelector('ul');
    this.getCollection().forEach((task) => {
      ul.innerHTML += `<li draggable="true" class="d-flex item" id="${task.index}">
        <label for="task${task.index}" class="d-flex">
          <input type="checkbox" name="task${task.index}" id="task${task.index}" />${task.description}</label
        >
        <div class="controls">
          <button>delete</button>
          <button>edit</button>
        </div>
      </li>`;
    });
  }

  getTask(id) {
    return this.collection.filter((task) => parseInt(id, 10) === task.id);
  }

  editTask(id, data) {
    const idx = this.collection.findIndex(
      (task) => task.id === parseInt(id, 10),
    );
    this.collection[idx].name = data;
  }
}

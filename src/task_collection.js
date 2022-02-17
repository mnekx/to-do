import { initializeLocalStorage, populateStorage } from './local_storage.js';

export default class TaskCollection {
  static counter = 0;

  constructor() {
    this.collection = [];
    TaskCollection.counter = this.collection.length;
    const tasksArr = initializeLocalStorage(this.collection) !== null
      ? initializeLocalStorage(this.collection)
      : [];
    this.setTasks(tasksArr);
  }

  add(desc) {
    const idx = this.getCollection().length + 1;
    const newTask = { index: idx, description: desc, completed: false };
    this.collection.push(newTask);

    populateStorage(this.getCollection());

    // Append task to the markup
    const ul = document.querySelector('ul');
    const listItem = document.createElement('li');
    listItem.className = 'd-flex item';
    listItem.id = `task-${newTask.index}`;
    listItem.setAttribute('draggable', true);
    const label = document.createElement('label');
    label.id = `label-${newTask.index}`;
    label.setAttribute('for', `task${newTask.index}`);
    const status = document.createElement('input');
    status.setAttribute('type', 'checkbox');
    status.id = `task${newTask.index}`;
    status.setAttribute('name', `status-${newTask.index}`);
    label.appendChild(status);
    label.append(newTask.description);
    listItem.appendChild(label);
    const controls = document.createElement('div');
    controls.id = `controls-${newTask.index}`;
    controls.classList.add('controls');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.id = `remove-btn-${newTask.index}`;
    removeBtn.innerText = 'Delete';
    controls.appendChild(removeBtn);
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.id = `edit-btn-${newTask.index}`;
    editBtn.innerText = 'Edit';
    controls.appendChild(editBtn);
    const editInput = document.createElement('input');
    editInput.setAttribute('type', 'text');
    editInput.className = 'edit-input d-none';
    editInput.value = newTask.description;
    editInput.id = `edit-input-${newTask.index}`;
    listItem.appendChild(editInput);
    listItem.appendChild(controls);
    ul.appendChild(listItem);

    // Add event listeners
    this.addTaskRemoveEventListener(newTask.index);
    this.addTaskEditBtnEventListener(newTask.index);
    this.addTaskEditInputEventListener(newTask.index);
  }

  addTaskRemoveEventListener(index) {
    const removeBtn = document.querySelector(`#remove-btn-${index}`);
    removeBtn.addEventListener('click', () => {
      this.remove(index);
    });
  }

  addTaskEditBtnEventListener(index) {
    const editBtn = document.querySelector(`#edit-btn-${index}`);
    editBtn.addEventListener('click', () => {
      const controls = document.querySelector(`#controls-${index}`);
      controls.classList.add('d-none');
      const label = document.querySelector(`#label-${index}`);
      label.classList.add('d-none');
      const editInput = document.querySelector(`#edit-input-${index}`);
      editInput.classList.remove('d-none');
    });
    this.getCollection();
  }

  addTaskEditInputEventListener(index) {
    const editInput = document.querySelector(`#edit-input-${index}`);
    editInput.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.editTask(index, e.target.value);
        e.preventDefault();

        const controls = document.querySelector(`#controls-${index}`);
        controls.classList.remove('d-none');
        const label = document.querySelector(`#label-${index}`);
        label.innerHTML = '';
        label.classList.remove('d-none');
        const status = document.createElement('input');
        status.setAttribute('type', 'checkbox');
        status.id = `task${index}`;
        status.setAttribute('name', `status-${index}`);
        label.appendChild(status);
        label.append(e.target.value);
        const editInput = document.querySelector(`#edit-input-${index}`);
        editInput.classList.add('d-none');
      }
    });
  }

  remove(idx) {
    this.collection = this.collection.filter(
      (task) => task.index !== parseInt(idx, 10),
    );

    const toRemove = document.querySelector(`#task-${idx}`);
    toRemove.remove();
    this.resetIndexes();
    populateStorage(this.collection);
    this.render();
  }

  resetIndexes() {
    for (let idx = 1; idx <= this.getCollection().length; idx += 1) {
      const task = this.getCollection()[idx - 1];
      task.index = idx;
    }
  }

  getCollection() {
    return this.collection;
  }

  setTasks(tasksArr) {
    this.collection = tasksArr;
  }

  render() {
    const ul = document.querySelector('ul');
    ul.innerHTML = '';
    this.resetIndexes();
    this.getCollection().forEach((task) => {
      const listItem = document.createElement('li');
      listItem.className = 'd-flex item';
      listItem.id = `task-${task.index}`;
      listItem.setAttribute('draggable', true);
      const label = document.createElement('label');
      label.id = `label-${task.index}`;
      label.setAttribute('for', `task${task.index}`);
      const status = document.createElement('input');
      status.setAttribute('type', 'checkbox');
      status.id = `task${task.index}`;
      status.setAttribute('name', `status-${task.index}`);
      label.appendChild(status);
      label.append(task.description);
      listItem.appendChild(label);
      const controls = document.createElement('div');
      controls.id = `controls-${task.index}`;
      controls.classList.add('controls');
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-btn');
      removeBtn.id = `remove-btn-${task.index}`;
      removeBtn.innerText = 'Delete';
      controls.appendChild(removeBtn);
      const editBtn = document.createElement('button');
      editBtn.classList.add('edit-btn');
      editBtn.id = `edit-btn-${task.index}`;
      editBtn.innerText = 'Edit';
      controls.appendChild(editBtn);
      const editInput = document.createElement('input');
      editInput.setAttribute('type', 'text');
      editInput.className = 'edit-input d-none';
      editInput.value = task.description;
      editInput.id = `edit-input-${task.index}`;
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
      (task) => task.index === parseInt(index, 10),
    );
    this.collection[idx].description = data;
    populateStorage(this.getCollection());
  }
}

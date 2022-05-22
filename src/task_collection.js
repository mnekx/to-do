import { initializeLocalStorage, populateStorage } from './local_storage.js';
import '@fortawesome/fontawesome-free/js/all.js';
import resetStylesFormerEditedTask from './helpers.js';

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
    ul.appendChild(this.returnTaskLIMarkup(newTask));

    // Add event listeners
    this.addTaskRemoveEventListener(newTask.index);
    this.addEditTaskEventListener(newTask.index);
    this.addTaskEditInputEventListener(newTask.index);
    this.addStatusEventListener(newTask.index);
    // addBlurTaskEventListener(newTask.index);
  }

  addTaskRemoveEventListener(index) {
    const trashBtn = document.querySelector(`#trash-btn-${index}`);
    if (trashBtn) {
      trashBtn.addEventListener('click', (e) => {
        console.log('remove task');
        e.stopPropagation();
        this.remove(index);
      });
    }
  }

  addEditTaskEventListener(index) {
    const task = document.querySelector(`#task-${index}`);
    task.addEventListener('click', (e) => {
      console.log(e.target.id);
      const formerEditedTask = document.querySelector('.edit-task');
      if (formerEditedTask) {
        const formerEditedTaskID = formerEditedTask.id.split('-').reverse()[0];
        resetStylesFormerEditedTask(formerEditedTaskID);
      }

      const label = document.querySelector(`#label-${index}`);
      const taskText = label.innerHTML;
      const ellipsisBtn = document.querySelector(`#ellispis-btn-${index}`);
      ellipsisBtn.classList.add('d-none');
      const trashBtn = document.querySelector(`#trash-btn-${index}`);
      trashBtn.classList.remove('d-none');
      label.classList.add('d-none');
      const editInput = document.querySelector(`#edit-input-${index}`);
      editInput.classList.remove('d-none');
      editInput.classList.add('d-block');
      editInput.value = taskText;
      editInput.focus();
      task.classList.add('edit-task');
    }, { capture: true });
    this.getCollection();
  }

  addTaskEditInputEventListener(index) {
    const editInput = document.querySelector(`#edit-input-${index}`);
    editInput.addEventListener(
      'focusout',
      (e) => {
        // e.preventDefault();
        e.stopPropagation();
      },
    );
    editInput.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.editTask(index, e.target.value);
        e.preventDefault();

        const label = document.querySelector(`#label-${index}`);
        label.innerHTML = e.target.value;
        resetStylesFormerEditedTask(index);
      }
    });
  }

  addStatusEventListener(index) {
    const statusInput = document.querySelector(`#task${index}`);
    statusInput.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        resetStylesFormerEditedTask(index);
        this.toggleStatus(index);
        populateStorage(this.getCollection());
        const containingLabel = document.querySelector(`#label-${index}`);
        containingLabel.classList.toggle('completed');
      },
    );
  }

  toggleStatus(index) {
    this.collection[index - 1].completed = !this.collection[index - 1].completed;
    return this.collection[index - 1].completed;
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
      ul.appendChild(this.returnTaskLIMarkup(task));

      //   Add event listeners
      this.addTaskRemoveEventListener(task.index);
      this.addEditTaskEventListener(task.index);
      this.addTaskEditInputEventListener(task.index);
      this.addStatusEventListener(task.index);
      // addBlurTaskEventListener(task.index);
    });
  }

  returnTaskLIMarkup(task) {
    const listItem = document.createElement('li');
    listItem.className = 'd-flex item';
    listItem.id = `task-${task.index}`;
    listItem.setAttribute('draggable', true);
    const label = document.createElement('label');
    label.id = `label-${task.index}`;
    // label.setAttribute('for', `task${task.index}`);
    const status = document.createElement('input');
    status.setAttribute('type', 'checkbox');
    status.id = `task${task.index}`;
    status.setAttribute('name', `status-${task.index}`);
    status.className = 'status-input';

    listItem.appendChild(status);
    label.append(task.description);
    // listItem.appendChild(label);
    const controls = document.createElement('div');
    controls.id = `controls-${task.index}`;
    controls.classList.add('controls');

    const ellipsisBtn = document.createElement('span');
    ellipsisBtn.classList.add('ellispis-btn');
    ellipsisBtn.classList.add('d-flex');
    ellipsisBtn.id = `ellispis-btn-${task.index}`;
    ellipsisBtn.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

    const trashBtn = document.createElement('span');
    // const trashCheckbox = document.createElement('input');
    // trashCheckbox.setAttribute('type', 'checkbox');
    // trashCheckbox.id = `trash-checkbox-${task.index}`;
    // trashBtn.appendChild(trashCheckbox);
    trashBtn.classList.add('trash-btn');
    trashBtn.classList.add('d-flex');
    trashBtn.classList.add('d-none');
    trashBtn.id = `trash-btn-${task.index}`;
    trashBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    controls.appendChild(label);
    const editInput = document.createElement('input');
    // editInput.setAttribute('type', 'text');
    editInput.className = 'edit-input d-none';
    editInput.value = task.description;
    editInput.type = 'text';
    editInput.id = `edit-input-${task.index}`;
    controls.appendChild(editInput);
    listItem.appendChild(controls);
    listItem.appendChild(ellipsisBtn);
    listItem.appendChild(trashBtn);

    this.getCollection();

    return listItem;
  }

  getTask(id) {
    return this.collection.filter((task) => parseInt(id, 10) === task.index)[0];
  }

  editTask(index, data) {
    const idx = this.collection.findIndex(
      (task) => task.index === parseInt(index, 10),
    );
    this.collection[idx].description = data;
    populateStorage(this.getCollection());
  }

  clearAll() {
    this.collection = this.collection.filter((task) => !task.completed);
    this.resetIndexes();
    populateStorage(this.collection);
    this.render();
  }
}

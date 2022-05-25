import { initializeLocalStorage, populateStorage } from './local_storage.js';
import '@fortawesome/fontawesome-free/js/all.js';
import { resetStylesFormerEditedTask, returnTaskLIMarkup, addEditTaskEventListener } from './helpers.js';

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

    const badge = document.querySelector('legend div div');
    badge.innerHTML = this.getUncompletedTasksNo();

    populateStorage(this.getCollection());

    // Append task to the markup
    const ul = document.querySelector('ul');
    ul.appendChild(returnTaskLIMarkup(newTask));

    // Add event listeners
    this.addTaskRemoveEventListener(newTask.index);
    addEditTaskEventListener(newTask.index);
    this.addTaskEditInputEventListener(newTask.index);
    this.addStatusEventListener(newTask.index);
    // addBlurTaskEventListener(newTask.index);
  }

  addTaskRemoveEventListener(index) {
    const trashBtn = document.querySelector(`#trash-btn-${index}`);
    if (trashBtn) {
      trashBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.remove(index);
      }, { capture: true });
    }
  }

  addTaskEditInputEventListener(index) {
    const editInput = document.querySelector(`#edit-input-${index}`);
    editInput.addEventListener('focusout', (e) => {
      // e.preventDefault();
      e.stopPropagation();
    });
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
    statusInput.addEventListener('click', (e) => {
      e.stopPropagation();
      resetStylesFormerEditedTask(index);
      this.toggleStatus(index);
      const badge = document.querySelector('legend div div');
      badge.innerHTML = this.getUncompletedTasksNo();
      populateStorage(this.getCollection());
      const containingLabel = document.querySelector(`#label-${index}`);
      containingLabel.classList.toggle('completed');
    }, { capture: true });
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

  updateTaskIndex(index, newTaskIndex) {
    this.collection[index].index = newTaskIndex;
    populateStorage(this.collection);
  }

  resetIndexes() {
    for (let idx = 1; idx <= this.getCollection().length; idx += 1) {
      const task = this.getCollection()[idx - 1];
      task.index = idx;
    }
  }

  swapTaskPositions(index1, index2) {
    const temp = this.collection[index1];
    this.collection[index1] = this.collection[index2];
    this.collection[index2] = temp;
  }

  getCollection() {
    return this.collection;
  }

  orderIndexwise() {
    this.collection = this.collection.sort((a, b) => a.index - b.index);
    populateStorage(this.collection);
  }

  setTasks(tasksArr) {
    this.collection = tasksArr;
  }

  render() {
    const ul = document.querySelector('ul');
    const badge = document.querySelector('legend div div');
    badge.innerHTML = this.getUncompletedTasksNo();
    ul.innerHTML = '';
    this.resetIndexes();
    this.getCollection().forEach((task) => {
      ul.appendChild(returnTaskLIMarkup(task));

      //   Add event listeners
      this.addTaskRemoveEventListener(task.index);
      addEditTaskEventListener(task.index);
      this.addTaskEditInputEventListener(task.index);
      this.addStatusEventListener(task.index);
      // addBlurTaskEventListener(task.index);
    });
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

  getUncompletedTasksNo() {
    const uncompletedTasks = this.collection.filter((task) => !task.completed);
    return uncompletedTasks.length;
  }

  clearAll() {
    this.collection = this.collection.filter((task) => !task.completed);
    this.resetIndexes();
    populateStorage(this.collection);
    this.render();
  }
}

import './utility.css';
import './style.css';
import TaskCollection from './task_collection.js';
import { addTaskEventListeners } from './helpers.js';

let dragSrcEl;
const tasks = new TaskCollection();

tasks.render();

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  e.dataTransfer.setData('id', this.id);
}

function dragEnter() {
  this.classList.add('drag');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('drag');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return true;
}

function dragDrop(e) {
  if (dragSrcEl !== this) {
    const formerTaskID = dragSrcEl.id.split('-').reverse()[0];
    const currTaskID = this.id.split('-').reverse()[0];

    dragSrcEl.innerHTML = this.innerHTML;
    dragSrcEl.id = this.id;
    this.innerHTML = e.dataTransfer.getData('text/html');
    this.id = e.dataTransfer.getData('id');

    const formerTaskIndex = tasks.collection[formerTaskID - 1].index;
    tasks.updateTaskIndex(formerTaskID - 1, tasks.collection[currTaskID - 1].index);
    tasks.updateTaskIndex(currTaskID - 1, formerTaskIndex);
    tasks.swapTaskPositions(formerTaskID - 1, currTaskID - 1);
    tasks.orderIndexwise();

    addTaskEventListeners(formerTaskID, tasks);
    addTaskEventListeners(currTaskID, tasks);
  }
  return true;
}

function dragEnd() {
  const listItens = document.querySelectorAll('.item');
  [].forEach.call(listItens, (item) => {
    item.classList.remove('drag');
  });
  this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

let items = document.querySelectorAll('.item');

items = Array.from(items);

items.forEach((item) => {
  addEventsDragAndDrop(item);
});

const addInput = document.querySelector('#add-input');
// const lableForAddInput = document.querySelector('label[for="add-input"');
addInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    if (addInput.validity.valueMissing) {
      addInput.classList.add('error');
      addInput.setCustomValidity('A new task is expected!');
      addInput.reportValidity();
    } else {
      addInput.classList.remove('error');
      tasks.add(e.target.value);
      e.preventDefault();
      e.target.value = '';
    }
  } else {
    addInput.classList.remove('error');
  }
});

const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', () => {
  if (addInput.validity.valueMissing) {
    addInput.classList.add('error');
    addInput.setCustomValidity('A new task is expected!');
    addInput.reportValidity();
  } else {
    addInput.classList.remove('error');
    tasks.add(addInput.value);
    addInput.value = '';
    addInput.setCustomValidity('');
  }
});

const clearBtn = document.querySelector('#reset-btn');

clearBtn.addEventListener('click', () => {
  tasks.clearAll();
});

const refresher = document.querySelector('.refresh');
refresher.addEventListener('click', () => {
  refresher.classList.toggle('rotate360');
  tasks.getCollection().forEach((task) => {
    if (!task.completed) {
      tasks.remove(task.index);
    }
  });
});
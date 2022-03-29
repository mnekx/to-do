import './utility.css';
import './style.css';
import TaskCollection from './task_collection.js';

let dragSrcEl;
const tasks = new TaskCollection();

tasks.render();

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
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
  return false;
}

function dragDrop(e) {
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
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
      addInput.setCustomValidity('A task text is expected!');
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

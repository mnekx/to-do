const resetStylesFormerEditedTask = (taskID) => {
  const formerEditedTask = document.querySelector(`#task-${taskID}`);
  if (formerEditedTask) {
    // console.log(formerEditedTask);
    const formerEditedLabel = document.querySelector(`#label-${taskID}`);
    const formerEditedEllispisBtn = document.querySelector(
      `#ellispis-btn-${taskID}`,
    );
    const formerEditedTrashBtn = document.querySelector(`#trash-btn-${taskID}`);
    const formerEditedInput = document.querySelector(`#edit-input-${taskID}`);
    formerEditedInput.classList.add('d-none');
    formerEditedInput.classList.remove('d-block');
    formerEditedEllispisBtn.classList.remove('d-none');
    formerEditedLabel.classList.remove('d-none');
    formerEditedTrashBtn.classList.add('d-none');
    formerEditedTask.classList.remove('edit-task');
  }
};

const returnTaskLIMarkup = (task) => {
  const listItem = document.createElement('li');
  listItem.className = 'd-flex item';
  listItem.id = `task-${task.index}`;
  listItem.setAttribute('draggable', true);
  const label = document.createElement('label');
  label.id = `label-${task.index}`;
  if (task.completed) label.classList.add('completed');
  // label.setAttribute('for', `task${task.index}`);
  const status = document.createElement('input');
  status.setAttribute('type', 'checkbox');
  status.id = `task${task.index}`;
  status.setAttribute('name', `status-${task.index}`);
  if (task.completed) status.setAttribute('checked', true);
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

  return listItem;
};

const addEditTaskEventListener = (index) => {
  const task = document.querySelector(`#task-${index}`);
  task.addEventListener(
    'click',
    (e) => {
      const formerEditedTask = document.querySelector('.edit-task');
      if (formerEditedTask) {
        const formerEditedTaskID = formerEditedTask.id
          .split('-')
          .reverse()[0];
        resetStylesFormerEditedTask(formerEditedTaskID);
      }

      const label = e.currentTarget.querySelector('label');
      const taskText = label.innerHTML;
      const ellipsisBtn = e.currentTarget.querySelector('.ellispis-btn');
      ellipsisBtn.classList.add('d-none');
      const trashBtn = e.currentTarget.querySelector('.trash-btn');
      trashBtn.classList.remove('d-none');
      label.classList.add('d-none');
      const editInput = e.currentTarget.querySelector('.edit-input');
      editInput.classList.remove('d-none');
      editInput.classList.add('d-block');
      editInput.value = taskText;
      editInput.focus();
      task.classList.add('edit-task');
    },
    { captrue: true },
  );
};

const addTaskEventListeners = (index, collectionObj) => {
  collectionObj.addTaskRemoveEventListener(index);
  addEditTaskEventListener(index);
  collectionObj.addTaskEditInputEventListener(index);
  collectionObj.addStatusEventListener(index);
};

export {
  resetStylesFormerEditedTask,
  addTaskEventListeners,
  returnTaskLIMarkup,
  addEditTaskEventListener,
};

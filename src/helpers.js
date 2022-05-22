const resetStylesFormerEditedTask = (taskID) => {
  const formerEditedTask = document.querySelector(`#task-${taskID}`);
  if (formerEditedTask) {
    // console.log(formerEditedTask);
    const formerEditedLabel = document.querySelector(
      `#label-${taskID}`,
    );
    const formerEditedEllispisBtn = document.querySelector(
      `#ellispis-btn-${taskID}`,
    );
    const formerEditedTrashBtn = document.querySelector(
      `#trash-btn-${taskID}`,
    );
    const formerEditedInput = document.querySelector(
      `#edit-input-${taskID}`,
    );
    formerEditedInput.classList.add('d-none');
    formerEditedInput.classList.remove('d-block');
    formerEditedEllispisBtn.classList.remove('d-none');
    formerEditedLabel.classList.remove('d-none');
    formerEditedTrashBtn.classList.add('d-none');
    formerEditedTask.classList.remove('edit-task');
  }
};

export default resetStylesFormerEditedTask;

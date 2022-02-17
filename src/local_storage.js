// Local storage
export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      // everything except Firefox
      && (e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

export function getItemsFromStorage() {
  const tasksArr = JSON.parse(localStorage.getItem('tasks'));
  return tasksArr;
}

export function populateStorage(tasksArr) {
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}

export function initializeLocalStorage(tasksArr) {
  if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    if (!localStorage.getItem('tasks')) {
      populateStorage(tasksArr);
    }
    return getItemsFromStorage();
  }
  return tasksArr;
}

import dom from '../__mocks__/dom.js';
import TaskCollection from '../src/task_collection.js';

global.document = dom.window.document;
global.localStorage = dom.window.localStorage;
global.DOMException = dom.window.DOMException;

const tasksCollection = new TaskCollection();

tasksCollection.add('desc 1');

describe('Add Task', () => {
  test('Adding Task should add length by 1', () => {
    tasksCollection.add('desc 2');
    expect(tasksCollection.getCollection()).toHaveLength(2);
  });
});

describe('Add li to DOM', () => {
  test('Addition adds only one <li> into DOM', () => {
    let listItems = document.querySelectorAll('ul li');
    listItems = Array.from(listItems);
    expect(listItems).toHaveLength(2);
  });
});

describe('Remove Task', () => {
  test('Removing Task should reduce length by 1', () => {
    tasksCollection.remove(2);
    expect(tasksCollection.getCollection()).toHaveLength(1);
  });
});

describe('Edit task', () => {
  test('Task should not be equal to new task', () => {
    const availableTask = tasksCollection.getTask(1);
    tasksCollection.editTask(availableTask.index, 'new desc');
    expect(availableTask.description).not.toMatch(/^desc 1$/);
  });
});

describe('Edit Complete Status', () => {
  test('Status should be the oppisite of the old status', () => {
    const availableTask = tasksCollection.getTask(1);
    tasksCollection.toggleStatus(availableTask.index);
    expect(availableTask.completed).toBeTruthy();
    expect(availableTask.completed).not.toBeFalsy();
  });
});

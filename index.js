let items = [
  'Сделать проектную работу',
  'Полить цветы',
  'Пройти туториал по React',
  'Сделать фронт для своего проекта',
  'Погулять с собакой',
  'Разобраться в замыканиях'
];

const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');
const template = document.querySelector('#to-do__item-template').content;

const getTasksFromDOM = () => {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  
  itemsNamesElements.forEach((element) => {
    tasks.push(element.textContent);
  });
  
  return tasks;
};

const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return items;
};

const createItem = (taskText) => {
  const clone = template.querySelector('.to-do__item').cloneNode(true);
  
  const textElement = clone.querySelector('.to-do__item-text');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');

  textElement.textContent = taskText;

  deleteButton.addEventListener('click', () => {
    clone.remove();
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  duplicateButton.addEventListener('click', () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem); 
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', () => {
    textElement.setAttribute('contenteditable', 'false');
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  return clone;
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  
  const taskText = inputElement.value;
  
  if (taskText.trim() === '') return; 
  
  const newItem = createItem(taskText);
  listElement.prepend(newItem); 
  
  formElement.reset(); 
  
  items = getTasksFromDOM();
  saveTasks(items);
});


items = loadTasks();

items.forEach((item) => {
  const newItem = createItem(item);
  listElement.append(newItem);
});

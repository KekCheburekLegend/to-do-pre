let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const tasksJson = localStorage.getItem('tasks');
	if (tasksJson === null) {	
		return items;
	}
	else {
		return JSON.parse(tasksJson);
	}
}
function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  textElement.textContent = item
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  
  deleteButton.addEventListener('click', () => {
	clone.remove();
	items = getTasksFromDOM()
	saveTasks(items)
  })

  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");

  duplicateButton.addEventListener('click', () => {
	const itemName = textElement.textContent;
	const newItem = createItem(itemName); // createItem(item) <= передает item (значение в поле)
	listElement.prepend(newItem);
	items = getTasksFromDOM();
	saveTasks(items);
  })

  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
  editButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	textElement.setAttribute('contenteditable', 'true') // право на редактирование текста элемента *_*
	textElement.focus()
	})
	textElement.addEventListener('blur', () => {
		textElement.setAttribute('contenteditable','false')
		items = getTasksFromDOM()
		saveTasks(items)
		}); //blur потеря фокуса :)


  return clone;
}

function getTasksFromDOM() {
	const tasks = [];
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	itemsNamesElements.forEach((item) => {
		tasks.push(item.textContent)
	})
	return tasks
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

items = loadTasks()

items.forEach((item) => {
	listElement.append(createItem(item));
})

formElement.addEventListener('submit', function(evt){
	evt.preventDefault();
	const item = inputElement.value;
	listElement.prepend(createItem(item));
	inputElement.value = '';
	items = getTasksFromDOM()
	saveTasks(items)
})

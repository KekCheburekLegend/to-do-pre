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
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text").textContent = item;
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  return clone;
}

function getTasksFromDOM() {
	const tasks = [];
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	itemsNamesElements.forEach((items) => {
		tasks.push(items.textContent)
	})
	return tasks
}

function saveTasks(tasks) {
	
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
})
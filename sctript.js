let toDoInput // miejsce gdzie użytkownik wpisuje treść zadania
let errorInfo // info o braku zadań / konieczności wpisywania tekstu
let addBtn // przycisk ADD -dodaje nowe elementy do listy
let ulList // lista zadań, tagi UL
let newToDo // nowo dodane li do listy
let popup // popup
let popupInfo // tekst w popupie jak się doda pusty tekst
let toDoEdit // edytowany toDo
let popupInput // input w popupie
let popupAddBtn // przycisk dodaj w popupie
let popupCloseBtn // przycisk camknij w popupie
let deletePopup

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}
const prepareDOMElements = () => {
	toDoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewToDo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	toDoInput.addEventListener('keyup', enterKeycheck)
}

const addNewToDo = () => {
	if (toDoInput.value !== '') {
		newToDo = document.createElement('li')
		newToDo.textContent = toDoInput.value
		createNewArea()
		ulList.append(newToDo)
		toDoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Musisz podać treść zadania!'
	}
}

const createNewArea = () => {
	const div = document.createElement('div')
	div.classList.add('tools')
	newToDo.append(div)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	div.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editToDo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const editToDo = e => {
	toDoEdit = e.target.closest('li')
	popupInput.value = toDoEdit.firstChild.textContent
	popup.style.display = 'flex'
}
const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		toDoEdit.firstChild.textContent = popupInput.value
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

const deleteTodo = e => {
	e.target.closest('li').remove()
	const allTodos = ulList.querySelectorAll('li')

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.'
	}
}
const enterKeycheck = e => {
	if (e.key === 'Enter') {
		addNewToDo()
	}
}

document.addEventListener('DOMContentLoaded', main)


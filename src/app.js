const submitButton = document.getElementById('submit-button');
const inputText = document.getElementById('task');
const filterText = document.getElementById('filter');
const taskListContainer = document.querySelector('.columns');
const clearAllButton = document.getElementById('clear-all');

createEventListeners();

function createEventListeners() {
    submitButton.addEventListener('click', addTask);
    taskListContainer.addEventListener('click', removeTask);
    filterText.addEventListener('keyup', filterTasks);
    window.addEventListener('DOMContentLoaded', generateTasks);
    clearAllButton.addEventListener('click', clearAllTasks);
}

function addTaskToLocalStorage() {
    let taskArray = getLocalStorageArray();
    taskArray.push(inputText.value);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function getLocalStorageArray() {
    let taskArray;
    if (localStorage.getItem('tasks') === null) {
        taskArray = [];
    } else {
        taskArray = JSON.parse(localStorage.getItem('tasks'));
    }
    return taskArray;
}

function removeFromLocalStorage(taskText) {
    let taskArray = getLocalStorageArray();
    taskArray.splice(taskArray.indexOf(taskText), 1);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function createTaskElement(taskText) {
    const newDivElement = document.createElement('div');
    newDivElement.className = 'column is-12';
    newDivElement.innerHTML = `<p class="notification center">${taskText}<button class="delete"></button></p>`;
    taskListContainer.appendChild(newDivElement);
}

function addTask() {
    createTaskElement(inputText.value);
    addTaskToLocalStorage();
    inputText.value = "";
}

function removeTask(event) {
    if (event.target.className === 'delete') {
        const taskText = event.target.parentElement.innerText;
        removeFromLocalStorage(taskText);
        event.target.closest('.column').remove();
    }
}

function filterTasks(event) {
    const filterText = event.target.value;
    document.querySelectorAll('.notification.center').forEach(task => {
        if(task.textContent.toLowerCase().indexOf(filterText) > -1){
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

function generateTasks() {
    let taskArray = getLocalStorageArray();
    taskArray.forEach(taskText => {
        createTaskElement(taskText);
    });
}

function clearAllTasks() {
    localStorage.clear();
    while (taskListContainer.firstChild !=null) {
        taskListContainer.removeChild(taskListContainer.firstChild);
    }
}
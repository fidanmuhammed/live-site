const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        taskList.appendChild(createTaskElement(taskText));
        taskInput.value = '';
    }
});

function createTaskElement(text) {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
}
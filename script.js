// Select elements from the DOM
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage
window.onload = loadTasks;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(item => {
        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === "") return; // Do nothing if input is empty

    addTaskToDOM(taskText);

    saveTasks(); // Save tasks to localStorage
    todoInput.value = ""; // Clear the input field
}

function addTaskToDOM(taskText, completed = false) {
    // Create a new list item
    const listItem = document.createElement('li');
    if (completed) listItem.classList.add('completed');

    // Create a span to hold the task text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;

    // Add click event to toggle completion
    span.onclick = () => {
        listItem.classList.toggle('completed');
        saveTasks(); // Save tasks to localStorage
    };

    // Create an edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(span);

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        listItem.remove();
        saveTasks(); // Save tasks to localStorage
    };

    // Append the task text, edit button, and delete button to the list item
    listItem.appendChild(span);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    // Add the list item to the list
    todoList.appendChild(listItem);
}

// Function to edit an existing task
function editTask(span) {
    const newTaskText = prompt("Edit task:", span.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        span.textContent = newTaskText.trim();
        saveTasks(); // Save tasks to localStorage
    }
}

// Add a task when the button is clicked
addBtn.onclick = addTask;

// Add a task when the 'Enter' key is pressed
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

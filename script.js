const pendingTasksList = document.getElementById('pending-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');
const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');

// Load saved tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks on the page
function renderTasks() {
  // Clear existing tasks
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  // Render pending tasks
  tasks.filter(task => !task.completed).forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} />
      <span>${task.title}</span>
      <button class="delete-task-button">Delete</button>
    `;
    const checkbox = li.querySelector('input[type="checkbox"]');
    const deleteButton = li.querySelector('.delete-task-button');
    checkbox.addEventListener('click', () =>
      toggleTaskCompletion(task.id)
    );
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    pendingTasksList.append(li);
    });

    // Render completed tasks
    tasks.filter(task => task.completed).forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} />
            <span>${task.title}</span>
            <button class="delete-task-button">Delete</button>
        `;
        const checkbox = li.querySelector('input[type="checkbox"]');
        const deleteButton = li.querySelector('.delete-task-button');
        checkbox.addEventListener('click', () =>
            toggleTaskCompletion(task.id)
        );
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        completedTasksList.append(li);
        }
    );
}

// Function to add a new task
function addTask(title) {
    tasks.push({
        id: Date.now(),
        title,
        completed: false
    });
    renderTasks();
    saveTasks();
    }

// Function to toggle task completion
function toggleTaskCompletion(id) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });
    renderTasks();
    saveTasks();
    }

// Function to delete a task

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    saveTasks();
    }

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }

// Event listeners
addTaskButton.addEventListener('click', () => {
    const title = newTaskInput.value;
    if (title) {
        addTask(title);
        newTaskInput.value = '';
    }
}
);

// Render tasks on page load
renderTasks();




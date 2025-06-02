const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let currentFilter = 'all';

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-buttons .active').classList.remove('active');
        button.classList.add('active');
        currentFilter = button.getAttribute('data-filter');
        updateVisibility();
    });
});

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;

    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✔';
    completeBtn.title = 'Mark as complete';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateVisibility();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);

    taskInput.value = '';
    updateVisibility();
}

function updateVisibility() {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach((task) => {
        if (currentFilter === 'all') {
            task.style.display = 'flex';
        } else if (currentFilter === 'completed') {
            task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
        } else if (currentFilter === 'pending') {
            task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
        }
    });
}

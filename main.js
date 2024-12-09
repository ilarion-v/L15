document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js--form');
    const taskInput = document.querySelector('.js--form__input');
    const taskList = document.querySelector('.js--todos-wrapper');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });

    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTaskAction);

    function addTask(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        createTaskElement(task);
        taskInput.value = '';
    }

    function handleTaskAction(event) {
        const target = event.target;
        const taskId = target.closest('li').dataset.id;

        if (target.classList.contains('todo-item__delete')) {
            deleteTask(taskId);
        } else if (target.type === 'checkbox') {
            toggleComplete(taskId);
        }
    }

    function toggleComplete(taskId) {
        tasks = tasks.map(task => {
            if (task.id == taskId) {
                task.completed = !task.completed;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function createTaskElement(task) {
        const taskElement = document.createElement('li');
        taskElement.className = `todo-item ${task.completed ? 'todo-item--checked' : ''}`;
        taskElement.dataset.id = task.id;

        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="todo-item__description">${task.text}</span>
            <button class="todo-item__delete">Видалити</button>
        `;
        taskList.appendChild(taskElement);
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }
});

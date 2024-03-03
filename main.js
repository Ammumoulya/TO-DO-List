document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.className = 'task';
            if (task.completed) {
                li.classList.add('completed');
            }
            li.textContent = task.text;
            li.addEventListener('click', function() {
                toggleTaskCompletion(index);
            });
            taskList.appendChild(li);
        });
        saveTasks();
    }

    // Function to add a new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            const newTask = {
                text: text,
                completed: false
            };
            tasks.push(newTask);
            renderTasks();
            taskInput.value = '';
        }
    }

    // Function to toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);

    // Initial render
    renderTasks();
});



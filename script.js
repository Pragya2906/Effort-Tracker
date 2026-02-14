const toggle_button = document.querySelector('#toggle-button')
const date_section = document.querySelector('.date-section');
const add_but = document.querySelector('#add-but');
const task_input = document.querySelector('#task-input');
const task_list = document.querySelector('#task-list');

toggle_button.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {

        toggle_button.innerHTML = `
        <svg class="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>`;

    } else {

        toggle_button.innerHTML = `
        <svg class="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
        `;
    }
});

const currentDate = new Date()
const date = currentDate.toDateString()
if (date_section) {
    date_section.textContent = `📅${date}`;
};

function addTask() {
    const text = task_input.value.trim();
    if (text === '') return alert("Task can't be empty");

    task_input.value = '';

    const newTask = document.createElement('li');
    newTask.className = "bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 mb-3 flex flex-col gap-3";

    const topRow = document.createElement('div');
    topRow.className = "flex items-center justify-between";

    const taskName = document.createElement('span');
    taskName.textContent = text;
    taskName.className = "font-medium break-all min-w-0 flex-1";

    const delete_task = document.createElement('button');
    delete_task.textContent = '🗑️';
    delete_task.className = "opacity-60 hover:opacity-100 transition";

    delete_task.addEventListener('click', () => {
        clearInterval(intervalId);
        newTask.remove();
    });

    topRow.appendChild(taskName);
    topRow.appendChild(delete_task);

    const display_time = document.createElement('p');
    display_time.textContent = '00:00:00';
    display_time.className = "text-center text-2xl font-mono";

    const controls = document.createElement('div');
    controls.className = "flex gap-2";

    const start_but = document.createElement('button');
    start_but.textContent = 'Start';
    start_but.className = "flex-1 py-1 rounded-md bg-green-500 text-black hover:bg-green-600";

    const stop_but = document.createElement('button');
    stop_but.textContent = 'Stop';
    stop_but.className = "flex-1 py-1 rounded-md bg-red-500 text-black hover:bg-red-600";

    controls.appendChild(start_but);
    controls.appendChild(stop_but);

    let sec = 0, min = 0, hrs = 0;
    let isRunning = false;
    let intervalId = null;

    function updateDisplay() {
        const s = sec < 10 ? '0' + sec : sec;
        const m = min < 10 ? '0' + min : min;
        const h = hrs < 10 ? '0' + hrs : hrs;
        display_time.textContent = `${h}:${m}:${s}`;
    }

    function setTimer() {
        sec++;
        if (sec === 60) { sec = 0; min++; }
        if (min === 60) { min = 0; hrs++; }
        updateDisplay();
    }

    start_but.addEventListener('click', () => {
        if (isRunning) return;
        intervalId = setInterval(setTimer, 1000);
        isRunning = true;
    });

    stop_but.addEventListener('click', () => {
        if (!isRunning) return;
        clearInterval(intervalId);
        isRunning = false;
    });

    newTask.appendChild(topRow);
    newTask.appendChild(display_time);
    newTask.appendChild(controls);
    task_list.appendChild(newTask);
}

add_but.addEventListener('click', () => {
    addTask()
});

task_input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask()
    }
})
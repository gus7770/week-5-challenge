

// References to DOM elements
const timeDisplayEl = $('#time-display');
const taskTitleEl = $('#task-title');
const taskDescEl = $('#task-desc');
const taskDueDateEl = $('#task-due-date');
const projectFormEl = $('#project-form');

// Display the current time
function displayTime() {
  const rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

// Initialize Datepicker
$(function() {
  $('#task-due-date').datepicker({
    dateFormat: 'mm/dd/yy',
    changeMonth: true,
    changeYear: true
  });
});

// Helper function to read tasks from localStorage
function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) tasks = [];
  return tasks;
}

// Helper function to save tasks to localStorage
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create task card
function createTaskCard(task) {
  const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text('Due: ' + task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete-task')
    .text('Delete')
    .attr('data-task-id', task.id);

  const now = dayjs();
  const taskDue = dayjs(task.dueDate, 'MM/DD/YYYY'); // Parse the due date correctly

  // Apply color coding based on due date
  if (now.isSame(taskDue, 'day')) {
    taskCard.addClass('bg-warning text-white'); // Nearing deadline (yellow)
  } else if (now.isAfter(taskDue)) {
    taskCard.addClass('bg-danger text-white'); // Overdue (red)
  }

  cardDeleteBtn.on('click', handleDeleteTask);

  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

// Print tasks to the screen
function printTaskData() {
  const tasks = readTasksFromStorage();

  $('#todo-cards').empty();
  $('#in-progress-cards').empty();
  $('#done-cards').empty();

  tasks.forEach((task) => {
    const taskCard = createTaskCard(task);
    if (task.status === 'not-yet-started') {
      $('#todo-cards
  }}

 
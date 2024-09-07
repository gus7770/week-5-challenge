// DOM Element References
const timeDisplayEl = $('#time-display');
const projectFormEl = $('#project-form');
const projectNameInputEl = $('#project-name-input');
const projectDescriptionInputEl = $('#project-description-input');
const projectDateInputEl = $('#taskDueDate');
const showFormBtn = $('#show-form-btn');
const formSection = $('#form-section');

// Helper function to display the current time
function displayTime() {
  const rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

// Reads projects from localStorage
function readProjectsFromStorage() {
  let projects = JSON.parse(localStorage.getItem('projects'));
  if (!projects) {
    projects = [];
  }
  return projects;
}

// Saves projects to localStorage
function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Creates a project card for display
function createProjectCard(project) {
  const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id', project.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(project.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(project.description);
  const cardDueDate = $('<p>').addClass('card-text').text(project.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', project.id);
  cardDeleteBtn.on('click', handleDeleteProject);

  // Color code based on the due date
  if (project.dueDate && project.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(project.dueDate, 'YYYY-MM-DD');

    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
    }
  }

  // Append the elements to the card
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  
  return taskCard;
}

// Prints project data into respective columns
function printProjectData() {
  const projects = readProjectsFromStorage();

  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for (let project of projects) {
    if (project.status === 'to-do') {
      todoList.append(createProjectCard(project));
    } else if (project.status === 'in-progress') {
      inProgressList.append(createProjectCard(project));
    } else if (project.status === 'done') {
      doneList.append(createProjectCard(project));
    }
  }

  // Make tasks draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Handles project deletion
function handleDeleteProject() {
  const projectId = $(this).attr('data-project-id');
  let projects = readProjectsFromStorage();

  projects = projects.filter((project) => project.id !== projectId);

  saveProjectsToStorage(projects);
  printProjectData();
}

// Handles form submission for a new project
function handleProjectFormSubmit(event) {
  event.preventDefault();

  const projectName = projectNameInputEl.val().trim();
  const projectDescription = projectDescriptionInputEl.val().trim();
  const projectDate = projectDateInputEl.val();

  if (!projectName || !projectDescription || !projectDate) {
    alert("Please fill out all fields.");
    return;
  }

  const newProject = {
    id: crypto.randomUUID(),
    name: projectName,
    description: projectDescription,
    dueDate: projectDate,
    status: 'to-do',
  };

  const projects = readProjectsFromStorage();
  projects.push(newProject);

  saveProjectsToStorage(projects);
  printProjectData();

  // Clear form inputs
  projectNameInputEl.val('');
  projectDescriptionInputEl.val('');
  projectDateInputEl.val('');

  // Hide the form after submission
  formSection.addClass('d-none');
  showFormBtn.removeClass('d-none');
}

// Handles the drop event for dragging tasks between lanes
function handleDrop(event, ui) {
  const projects = readProjectsFromStorage();
  const taskId = ui.draggable[0].dataset.projectId;
  const newStatus = event.target.id;

  for (let project of projects) {
    if (project.id === taskId) {
      project.status = newStatus;
    }
  }
  saveProjectsToStorage(projects);
  printProjectData();
}

// Show the form when the "Add Project" button is clicked
showFormBtn.on('click', function() {
  formSection.removeClass('d-none');
  showFormBtn.addClass('d-none');
});

// Set up form submission event listener
projectFormEl.on('submit', handleProjectFormSubmit);

// Display time on page load and every second
displayTime();
setInterval(displayTime, 1000);

// Initialize everything on page load
$(document).ready(function () {
  printProjectData();

  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});
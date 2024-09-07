Project Tracker Web App

Table of Contents

	•	Project Overview
	•	Features
	•	Technologies Used
	•	Installation
	•	Usage
	•	Folder Structure
	•	Contributing
	•	License

    Project Overview

The Project Tracker is a web application designed to help users organize and manage their tasks efficiently. It allows users to add new tasks, track them in various progress stages (To Do, In Progress, Done), and store task data persistently in the browser’s localStorage. Tasks can be added with relevant details such as a project name, description, and due date. Additionally, users can drag and drop tasks between columns representing different task states.

Features

	•	Add New Projects: Users can add new tasks by filling in the project name, description, and a due date.
	•	Drag-and-Drop Interface: Tasks can be moved between columns (To Do, In Progress, Done) by dragging and dropping them.
	•	Color-Coded Due Dates: Tasks are highlighted in different colors based on their due date:
	•	Yellow for tasks due today.
	•	Red for overdue tasks.
	•	Persistent Data: All tasks are saved in localStorage, ensuring that task data is retained even after refreshing the page.
	•	Delete Tasks: Users can delete tasks, and the deletion is reflected in localStorage.
	•	Responsive Design: The app is built with a responsive layout using Bootstrap, ensuring compatibility with various screen sizes.

    Technologies Used

    	•	HTML5: Structure and layout of the web page.
	•	CSS3: Custom styles along with Bootstrap 5 for responsive design.
	•	JavaScript: Core functionality, including task management, localStorage integration, and drag-and-drop features.
	•	jQuery: Simplifying DOM manipulation and event handling.
	•	jQuery UI: Drag-and-drop functionality for tasks.
	•	Bootstrap 5: Responsive design and UI components.
	•	Day.js: Handling and formatting dates for task deadlines.
	•	LocalStorage: Persisting data between sessions.

    Installation

    	1.	Clone the repository:
    
    git clone https://github.com/your-repo/project-tracker.git

    	2.	Navigate to the project directory:

        cd project-tracker

    	3.	Open the index.html file in a web browser:
        
        You can open it directly by double-clicking the index.html file or use a local server. Alternatively, you can use a tool like Live Server in Visual Studio Code to serve the project locally.

Usage

    1.	Adding a Task:
	•	Click the Add Project button at the top.
	•	Enter the project name, project description, and due date in the form that appears.
	•	Click the Add Project button to save the task. The task will appear under the To Do column.
	2.	Moving Tasks:
	•	Drag and drop tasks between the To Do, In Progress, and Done columns.
	•	The task’s status will automatically update and persist after refreshing.
	3.	Deleting Tasks:
	•	Click the Delete button on any task to remove it from the project list.
	4.	Task Color Coding:
	•	Yellow: Indicates the task is due today.
	•	Red: Indicates the task is overdue.
        
Folder Structure

project-tracker/
│
├── assets/
│   ├── css/
│   │   └── style.css     
│   └── js/
│       └── script.js     
├── index.html            
└── README.md            

Contributing

Contributions are welcome! To contribute to this project, follow these steps:
	1.	Fork the repository.
	2.	Create a new branch (git checkout -b feature/your-feature).
	3.	Make your changes and commit (git commit -m 'Add some feature').
	4.	Push to the branch (git push origin feature/your-feature).
	5.	Open a pull request to the main branch.

License

This project is licensed under the MIT License. See the LICENSE file for more details.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

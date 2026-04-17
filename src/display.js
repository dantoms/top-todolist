export function displayProjects(projects) {
  const aside = document.querySelector("aside");
  const newProjectBtn = document.querySelector("#new-project-btn");
  const projectsList = document.createElement("ul");
  projectsList.setAttribute("id", "projects-list");

  projects.forEach((project) => {
    const listItem = document.createElement("li");
    listItem.textContent = project;
    projectsList.appendChild(listItem);
  });
  aside.insertBefore(projectsList, newProjectBtn);
}

export function displayTasks(tasks) {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    // Create list element.
    const listItem = document.createElement("li");
    // Create input and add attributes.
    // The id attribute will be the unique uuid of the task.
    const input = document.createElement("input");
    input.setAttribute("id", task.id);
    input.setAttribute("type", "checkbox");
    // Create label and also set for == task id
    const label = document.createElement("label");
    label.setAttribute("for", task.id);
    label.textContent = task.title;
    // Add input and label to listItem.
    listItem.append(input, label);
    taskList.append(listItem);
  });
}

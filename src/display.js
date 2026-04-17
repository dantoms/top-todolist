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

import { pubsub } from "./pubsub.js";
import { tasks, projects } from "./data.js";
import { DateTime } from "luxon";

export default (() => {
  const taskList = document.querySelector("#task-list");
  const projectsList = document.querySelector("#projects");
  const newProjectBtn = document.querySelector("#new-project-btn");

  const renderTasks = (tasks) => {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      const mainDetail = document.createElement("div");
      mainDetail.setAttribute("class", "task-main-detail");

      const taskDiv = document.createElement("div");

      const input = document.createElement("input");
      input.setAttribute("id", task._id);
      input.setAttribute("type", "checkbox");
      if (task._complete) {
        input.checked = true;
      }

      const label = document.createElement("label");
      label.setAttribute("for", task._id);
      label.textContent = task._title;

      const due = document.createElement("p");
      due.textContent = DateTime.fromISO(task._dueDate).toLocaleString(
        { month: "short", day: "numeric" },
        // DateTime.DATE_MED,
      );

      taskDiv.append(input, label);
      mainDetail.append(taskDiv, due);
      li.append(mainDetail);
      taskList.append(li);
    });
  };

  const renderProjects = (projects) => {
    projectsList.innerHTML = "";
    const ul = document.createElement("ul");

    projects.forEach((project) => {
      const li = document.createElement("li");
      li.setAttribute("id", project._id);
      li.textContent = project._name;

      ul.append(li);
    });
    projectsList.append(ul);
  };

  newProjectBtn.addEventListener("click", () => {
    const newProjectName = prompt("Enter a name for your new project");
    pubsub.publish("UiNewProject", newProjectName);
  });

  pubsub.subscribe("taskAdded", renderTasks);
  pubsub.subscribe("projectAdded", renderProjects);

  renderTasks(tasks.tasks);
  renderProjects(projects.projects);
})();

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
      li.setAttribute("class", "project");
      li.textContent = project._name;

      ul.append(li);
    });
    projectsList.append(ul);
  };

  const newProject = () => {
    const colors = ["red", "gold", "green", "blue", "lavender", "grey"];
    let selectedColor = "grey";
    const newProjectInputContainer = document.createElement("div");
    newProjectInputContainer.setAttribute("id", "new-project-input-container");
    const newProjectInput = document.createElement("input");
    newProjectInput.setAttribute("type", "text");
    newProjectInput.setAttribute("placeholder", "New project name");

    const newProjectSubmitBtn = document.createElement("button");
    newProjectSubmitBtn.setAttribute("type", "submit");
    newProjectSubmitBtn.textContent = "add";

    const colorPicker = document.createElement("div");
    colorPicker.classList.add("color-picker");
    colors.forEach((color) => {
      const button = document.createElement("button");
      button.setAttribute("type", "button");
      button.classList.add("color-btn", color);

      if (color === selectedColor) {
        button.classList.add("selected");
      }

      button.addEventListener("click", () => {
        colorPicker
          .querySelectorAll(".color-btn")
          .forEach((btn) => btn.classList.remove("selected"));

        button.classList.add("selected");

        selectedColor = color;
      });
      colorPicker.append(button);
    });

    newProjectInputContainer.append(newProjectInput, newProjectSubmitBtn);
    projectsList.append(newProjectInputContainer, colorPicker);
    newProjectInput.focus();

    newProjectSubmitBtn.addEventListener("click", () => {
      let newProjectName = newProjectInput.value;

      if (newProjectName == "") {
        return;
      }
      newProjectName = newProjectName.trim();
      pubsub.publish("UiNewProject", {
        name: newProjectName,
        color: selectedColor,
      });
    });
  };

  newProjectBtn.addEventListener("click", () => {
    newProject();
  });

  pubsub.subscribe("taskAdded", renderTasks);
  pubsub.subscribe("projectAdded", renderProjects);

  renderTasks(tasks.tasks);
  renderProjects(projects.projects);
})();

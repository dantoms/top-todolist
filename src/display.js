import { pubsub } from "./pubsub.js";
import { tasks } from "./data.js";

export default (() => {
  const taskList = document.querySelector("#task-list");
  const renderTasks = (tasks) => {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.setAttribute("id", task._id);
      input.setAttribute("type", "checkbox");
      if (task._complete) {
        input.checked = true;
      }

      const label = document.createElement("label");
      label.setAttribute("for", task._id);
      label.textContent = task._title;

      li.append(input, label);
      taskList.append(li);
    });
  };

  pubsub.subscribe("taskAdded", renderTasks);

  renderTasks(tasks.tasks);
})();

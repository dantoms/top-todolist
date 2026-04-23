import { pubsub } from "./pubsub.js";
import { tasks } from "./data.js";
import { DateTime } from "luxon";

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

      const due = document.createElement("p");
      due.textContent = DateTime.fromISO(task._dueDate).toLocaleString(
        { month: "short", day: "numeric" },
        // DateTime.DATE_MED,
      );

      li.append(input, label, due);
      taskList.append(li);
    });
  };

  pubsub.subscribe("taskAdded", renderTasks);

  renderTasks(tasks.tasks);
})();

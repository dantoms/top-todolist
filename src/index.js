import "./styles.css";
import { getData } from "./data.js";
import { displayProjects, displayTasks } from "./display.js";
import { task } from "./tasks.js";

const data = getData();
displayProjects(data.projects);
displayTasks(data.tasks);
const newTask = task(
  "New task created with factory",
  "desc",
  "due",
  "priority",
  "Inbox",
);
data.tasks.push(newTask);
console.log(data);
console.log(new Date(data.tasks[1].createdAt).toLocaleDateString());

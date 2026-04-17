import { task } from "./tasks.js";

export function getData() {
  let data = localStorage.getItem("data");
  if (data === null) {
    data = {
      projects: ["Inbox"],
      tasks: [{ title: "Mark as complete" }],
    };
    const newTask = task(
      "Complete this task",
      "desc",
      "due",
      "priority",
      "Inbox",
    );

    data.tasks.push(newTask);

    storeData(data);
  } else {
    data = JSON.parse(data);
  }

  return data;
}

export function storeData(data) {
  const dataString = JSON.stringify(data);
  localStorage.setItem("data", dataString);
  return "Data saved";
}

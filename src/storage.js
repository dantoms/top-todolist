import { pubsub } from "./pubsub.js";
import { projects, Project, tasks, Task } from "./data.js";

export class StorageController {
  constructor() {
    if (localStorage.getItem("data")) {
      this.loadData();
    } else {
      new Project("Inbox");
      new Task("title", "desc", "priority");
      this._currentData = { projects: projects.projects, tasks: tasks.tasks };
      pubsub.publish("newData", "New data structure created");
      this.saveData();
    }
  }

  saveData() {
    const stringifiedData = JSON.stringify(this._currentData);
    localStorage.setItem("data", stringifiedData);
    pubsub.publish("newData", "Current data saved to local storage");
  }

  loadData() {
    const data = localStorage.getItem("data");
    this._currentData = JSON.parse(data);
    this._currentData.projects.forEach((p) => {
      new Project(p.name, p.id);
    });
    this._currentData.tasks.forEach((t) => {
      new Task(
        t.title,
        t.description,
        t.priority,
        t.id,
        new Date(t.created),
        t.dueDate,
        t.project,
      );
    });
    pubsub.publish("newData", `Data read from localStorage ${data}`);
  }
}

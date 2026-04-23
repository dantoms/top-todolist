import { pubsub } from "./pubsub.js";
import { projects, Project, tasks, Task } from "./data.js";
import { DateTime } from "luxon";

export class StorageController {
  constructor() {
    if (localStorage.getItem("data")) {
      this.loadData();
    } else {
      const defaultProject = new Project("Inbox");
      new Task(
        "The developer's birthday!",
        "Happy Birthday Developer",
        "priority",
        DateTime.local(2026, 5, 6),
        defaultProject._id,
      );
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
      new Project(p._name, p._id);
    });
    this._currentData.tasks.forEach((t) => {
      new Task(
        t._title,
        t._description,
        t._priority,
        t._dueDate,
        t._project,
        t._id,
        new Date(t._created),
        t._complete,
      );
    });
    pubsub.publish("newData", `Data read from localStorage.`);
  }
}

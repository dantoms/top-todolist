import { pubsub } from "./pubsub.js";
import { projects, Project, tasks, Task } from "./data.js";
import { DateTime } from "luxon";

export class StorageController {
  constructor() {
    if (localStorage.getItem("data")) {
      this.loadData();
    } else {
      const defaultProject = new Project("Inbox", "grey");
      new Task(
        "The developer's birthday!",
        "Happy Birthday Developer",
        "priority",
        DateTime.local(2026, 5, 6),
        defaultProject._id,
      );
      this._currentData = { projects: projects.projects, tasks: tasks.tasks };
      this.saveData();
    }
  }

  saveData() {
    const newData = { projects: projects.projects, tasks: tasks.tasks };
    const stringifiedData = JSON.stringify(newData);
    localStorage.setItem("data", stringifiedData);
  }

  loadData() {
    const data = localStorage.getItem("data");
    this._currentData = JSON.parse(data);
    this._currentData.projects.forEach((p) => {
      new Project(p._name, p._color, p._id);
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
  }
}

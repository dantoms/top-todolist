import { pubsub } from "./pubsub.js";

class Projects {
  constructor() {
    this._projects = [];
  }

  get projects() {
    return this._projects;
  }

  addProject(project) {
    this._projects.push(project);
    pubsub.publish("projectAdded", this._projects);
  }
}

export class Project {
  constructor(name) {
    this._name = name;
    this._id = crypto.randomUUID();
    projects.addProject(this);
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }
}

class Tasks {
  constructor() {
    this._tasks = [];
  }

  get tasks() {
    return this._tasks;
  }

  addTask(task) {
    this._tasks.push(task);
    pubsub.publish("taskAdded", this._tasks);
  }
}

export class Task {
  constructor(
    title,
    description,
    priority,
    dueDate = new Date(Date.now()),
    project = projects.projects[0].id,
  ) {
    this._id = crypto.randomUUID();
    this._created = Date.now();
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._project = project;

    tasks.addTask(this);
  }
}

export const projects = new Projects();
export const tasks = new Tasks();

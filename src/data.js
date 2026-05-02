import { pubsub } from "./pubsub.js";

class Projects {
  constructor() {
    this._projects = [];
  }

  get projects() {
    return this._projects;
  }

  getProjectNameById(id) {
    let projectFound = "";
    this._projects.forEach((project) => {
      if (project._id === id) {
        projectFound = project;
      }
    });
    return projectFound;
  }

  getProjectIdByName(name) {
    let projectFound = "";
    this._projects.forEach((project) => {
      if (project._name === name) {
        projectFound = project;
      }
    });
    return projectFound._id;
  }

  addProject(project) {
    this._projects.push(project);
    pubsub.publish("projectAdded", this._projects);
  }

  deleteProject(id) {
    this._projects = this._projects.filter((project) => project.id !== id);
    pubsub.publish("projectDeleted", this._projects);
  }
}

export class Project {
  constructor(name, color, id) {
    this._name = name;
    this._color = color;
    this._id = id ?? crypto.randomUUID();
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

  deleteTask(id) {
    console.log("deleteTask");
    this._tasks = this._tasks.filter((task) => {
      task.id !== id;
    });
    pubsub.publish("taskDeleted", this._tasks);
  }

  toggleComplete(id) {
    this._tasks.forEach((task) => {
      if (task._id === id) {
        task._complete = !task._complete;
        console.log(task);
        pubsub.publish("taskChanged", this._tasks);
      }
    });
  }
}

export class Task {
  constructor(
    title,
    priority,
    dueDate,
    project,
    id,
    created,
    complete = false,
  ) {
    this._title = title;
    this._priority = priority;
    this._dueDate = dueDate ?? new Date(Date.now());
    this._project = project ?? projects.projects[0].id;
    this._id = id ?? crypto.randomUUID();
    this._created = created ?? Date.now();
    this._complete = complete;

    tasks.addTask(this);
  }
}

export const projects = new Projects();
export const tasks = new Tasks();

pubsub.subscribe("UiNewProject", (projectData) => {
  new Project(projectData.name, projectData.color);
});

pubsub.subscribe("projectDelete", (id) => {
  projects.deleteProject(id);
});

pubsub.subscribe("taskDelete", (id) => {
  tasks.deleteTask(id);
});

pubsub.subscribe("UiNewTask", (taskData) => {
  const projectId = projects.getProjectIdByName(taskData.project);
  new Task(taskData.title, taskData.priority, taskData.dueDate, projectId);
});

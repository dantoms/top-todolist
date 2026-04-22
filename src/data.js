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

}
export const projects = new Projects();

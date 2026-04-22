import "./styles.css";
import { pubsub } from "./pubsub.js";
import { Project, Task } from "./data.js";
import { StorageController } from "./storage.js";

function dataRecieved(data) {
  console.log(data);
}

pubsub.subscribe("newData", dataRecieved);
const storageController = new StorageController();

new Project("Inbox");
new Task("another title", "desc", "priority");

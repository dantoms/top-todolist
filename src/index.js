import "./styles.css";
import { pubsub } from "./pubsub.js";
import { Project, Task } from "./data.js";

function dataRecieved(data) {
  console.log(data);
}

pubsub.subscribe("projectAdded", dataRecieved);
pubsub.subscribe("taskAdded", dataRecieved);

new Project("Inbox");
new Task("title", "desc", "priority");
new Task("another title", "desc", "priority");

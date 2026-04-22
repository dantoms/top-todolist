import "./styles.css";
import { pubsub } from "./pubsub.js";
import { Project, Task } from "./data.js";

function dataRecieved(data) {
  console.log(data);
}

pubsub.subscribe("projectAdded", dataRecieved);

new Project("Inbox");

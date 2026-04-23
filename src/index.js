import "./styles.css";
import { pubsub } from "./pubsub.js";
import { StorageController } from "./storage.js";
import "./display.js";

function dataRecieved(data) {
  console.warn(data);
}

pubsub.subscribe("newData", dataRecieved);
const storageController = new StorageController();

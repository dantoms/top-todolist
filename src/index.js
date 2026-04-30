import "./styles.css";
import { pubsub } from "./pubsub.js";
import { StorageController } from "./storage.js";
import "./display.js";

const storageController = new StorageController();
pubsub.subscribe("projectAdded", () => storageController.saveData());
pubsub.subscribe("taskAdded", () => storageController.saveData());

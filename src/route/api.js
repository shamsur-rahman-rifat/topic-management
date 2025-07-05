import express from "express";
import topicController from "../controller/topicController.js";

const router = express.Router();

router.post("/createTopic", topicController.createTopic);
router.get("/readTopic", topicController.readTopic);
router.get("/readTopicById/:id", topicController.readTopicById);
router.put("/updateTopic/:id", topicController.updateTopic);
router.delete("/deleteTopic/:id", topicController.deleteTopic);

export default router;
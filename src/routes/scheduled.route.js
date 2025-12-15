import express from "express";
import { ScheduledService } from "../services/scheduled.service";

const scheduledService = new ScheduledService();
const router = express.Router();
router.use(express.json());

router.post("/", async (req, res, next) => {
  try {
    const result = await scheduledService.storeScheduled(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await scheduledService.getAllByUserId(userId);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await scheduledService.deleteById(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

export default router;

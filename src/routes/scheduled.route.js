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

export default router;

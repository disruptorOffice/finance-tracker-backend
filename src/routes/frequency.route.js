import express from "express";
import { FrequencyService } from "../services/frequency.service";

const frequencyService = new FrequencyService();
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await frequencyService.getAllFrequencies();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

export default router;

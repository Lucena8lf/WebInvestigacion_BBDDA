import { Router } from "express";
import {
  getPapers,
  getPaper,
  createPaper,
  updatePaper,
  deletePaper,
} from "../controllers/papers.js";

const router = Router();

router.get("/papers", getPapers);

router.get("/papers/:doi", getPaper);

router.post("/papers", createPaper);

router.put("/papers/:doi", updatePaper);

router.delete("/papers/:doi", deletePaper);

export default router;

import { Router } from "express";
import {
  index as todoIndex,
  create as todoCreate,
  read as todoRead,
  update as todoUpdate,
  destroy as todoDestroy,
} from "../controllers/Todos";
const router = Router();

router.get("/", todoIndex);
router.post("/", todoCreate);
router.put("/:id", todoUpdate);
router.get("/:id", todoRead);
router.delete("/:id", todoDestroy);

export default router;

// auth.route.ts
import { Router } from "express";
import { 
  CLogin, 
  CCreateAdmin, 
  CUpdateAdmin, 
  CDeleteAdmin 
} from "../controllers/auth.controller";
import { MValidate } from "../middlewares/validation.middleware";
import { createAdminSchema, updateAdminSchema } from "../validations/admin.validation";

const router = Router();

router.post("/login", CLogin);

router.post("/create", MValidate(createAdminSchema), CCreateAdmin);
router.put("/:id", MValidate(updateAdminSchema), CUpdateAdmin);
router.delete("/:id", CDeleteAdmin);

export default router;
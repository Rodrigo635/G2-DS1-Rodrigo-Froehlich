// src/routes/addressRoutes.ts
import { Router } from "express";
import addressController from "../controllers/addressController";
import { validateAddress } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateAddress, addressController.createAddress);
router.get("/user/:user_id", addressController.getAllAddressesByUserId);
router.delete("/:id", addressController.deleteAddress);

export default router;

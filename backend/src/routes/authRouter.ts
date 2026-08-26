import { Router } from "express";
import AuthFactory from "../factories/authFactory";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter = Router();
const authController = AuthFactory.createController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMiddleware, authController.getMe);

export default authRouter;

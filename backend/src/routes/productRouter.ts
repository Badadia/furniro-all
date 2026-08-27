import Router, { Request, Response } from "express";
import productFactory from "../factories/productFactory";
import { authMiddleware } from "../middlewares/authMiddleware";

const productRouter = Router();
const productController = productFactory.createController();

// Public routes
productRouter.get("/", (req: Request, res: Response) =>
  productController.getAll(req, res),
);
productRouter.get("/slug/:slug", (req: Request, res: Response) =>
  productController.findBySlug(req, res),
);
productRouter.get("/:id", (req: Request, res: Response) =>
  productController.findById(req, res),
);

// Protected routes (require JWT authentication)
productRouter.post("/", authMiddleware, (req: Request, res: Response) =>
  productController.create(req, res),
);
productRouter.put("/:id", authMiddleware, (req: Request, res: Response) =>
  productController.update(req, res),
);
productRouter.delete("/:id", authMiddleware, (req: Request, res: Response) =>
  productController.delete(req, res),
);

export default productRouter;

import express, { Request, Response } from "express";
import productsRouter from "./routes/productRouter";
import errorHandler from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/loggerMiddleware";

const app = express();
app.use(express.json());
app.use(requestLogger);

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Health OK");
});

app.use("/products", productsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

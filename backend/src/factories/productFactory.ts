import ProductController from "../controllers/productController";
import ProductService from "../services/productsService";
import { PrismaProductRepository } from "../repositories/prismaProductRepository";
import { prisma } from "../lib/prisma";

export default class ProductFactory {
  static createController(): ProductController {
    const productRepository = new PrismaProductRepository(prisma);
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    return productController;
  }
}

import AppError from "../exceptions/appError";
import {
  PaginatedResult,
  Product,
  ProductCreateDTO,
  ProductQueryParams,
  ProductUpdateDTO,
} from "../model/product";
import Service from "./iService";
import Repository from "../repositories/iRepository";

export default class ProductService implements Service<
  Product,
  ProductCreateDTO,
  ProductUpdateDTO
> {
  constructor(
    private productRepository: Repository<
      Product,
      ProductCreateDTO,
      ProductUpdateDTO
    >,
  ) {}

  async create(item: ProductCreateDTO): Promise<Product> {
    if (!item.name || !item.price || !item.category) {
      throw new AppError(
        "Missing required fields: name, price, and category are required.",
        400,
      );
    }
    const createdItem = await this.productRepository.create(item);
    return createdItem;
  }

  async getAll(query: ProductQueryParams): Promise<PaginatedResult<Product>> {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 12;

    if (limit > 100) {
      throw new AppError("Limit cannot exceed 100 items per page.", 400);
    }

    return this.productRepository.findAll({ ...query, page, limit });
  }

  async findById(id: string): Promise<Product | null> {
    if (!id) {
      throw new AppError("ID is required to find a product.", 400);
    }
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError(`Product with ID ${id} not found.`, 404);
    }
    return product;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    if (!slug) {
      throw new AppError("Slug is required to find a product.", 400);
    }
    const product = await this.productRepository.findBySlug(slug);

    if (!product) {
      throw new AppError(`Product with slug ${slug} not found.`, 404);
    }
    return product;
  }

  async update(id: string, item: ProductUpdateDTO): Promise<Product | null> {
    if (!id) {
      throw new AppError("ID is required to find a product.", 400);
    }
    if (
      item.name === undefined &&
      item.price === undefined &&
      item.category === undefined
    ) {
      throw new AppError(
        "At least one field (name, price, or category) must be provided to update a product.",
        400,
      );
    }

    const updatedProduct = await this.productRepository.update(id, item);
    if (!updatedProduct) {
      throw new AppError(`Product with ID ${id} not found.`, 404);
    }
    return updatedProduct;
  }

  delete(id: string): Promise<boolean> {
    if (!id) {
      throw new AppError("ID is required to delete a product.", 400);
    }
    return this.productRepository.delete(id);
  }
}

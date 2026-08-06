import { PaginatedResult, ProductQueryParams } from "../model/product";

export default interface Repository<T, CreateDTO = T, UpdateDTO = Partial<T>> {
  create(item: CreateDTO): Promise<T>;
  findAll(query: ProductQueryParams): Promise<PaginatedResult<T>>;
  findById(id: string): Promise<T | null>;
  findBySlug(slug: string): Promise<T | null>;
  update(id: string, item: UpdateDTO): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

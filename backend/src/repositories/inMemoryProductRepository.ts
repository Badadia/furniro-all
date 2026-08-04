export default class InMemoryProductRepository implements Repository<Product> {
  private products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: number): Promise<Product | null> {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return null;
    }
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return false;
    }
    this.products.splice(index, 1);
    return true;
  }
}

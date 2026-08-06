export class ProductApiError extends Error {
  constructor(message = "Something went wrong. Please try again.") {
    super(message);
    this.name = "ProductApiError";
  }
}
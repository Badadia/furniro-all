export class ProductApiError extends Error {
  constructor(message = "Something went wrong. Please try again.") {
    super(message);
    this.name = "ProductApiError";
  }
}

export class ProductContractError extends Error {
  constructor(details: string) {
    super(`API response does not match the expected contract.\n${details}`);
    this.name = "ProductContractError";
  }
}

export class ProductNotFoundError extends Error {
  constructor(message = "Product not found.") {
    super(message);
    this.name = "ProductNotFoundError";
  }
}

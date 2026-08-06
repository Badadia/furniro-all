export class ProductContractError extends Error {
  constructor(details: string) {
    super(`API response does not match the expected contract.\n${details}`);
    this.name = "ProductContractError";
  }
}
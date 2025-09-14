export class CustomError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message = "Resource not found") {
      super(message, 404);
    }
  }
  
  export class ValidationError extends CustomError {
    constructor(message = "Validation failed") {
      super(message, 400);
    }
  }
  
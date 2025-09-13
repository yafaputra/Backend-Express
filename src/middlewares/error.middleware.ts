// error.middleware.ts
import { NextFunction, Request, Response } from "express";
import { IGlobalResponse } from "../interfaces/global.interface";

export const MErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);
  
  const isDevelopment = process.env.NODE_ENV === "development";
  
  try {
    if (Array.isArray(err)) {
      const response: IGlobalResponse = {
        status: false,
        message: "Validation error",
        error: err,
      };
      res.status(400).json(response);
      return;
    }
    
    const response: IGlobalResponse = {
      status: false,
      message: err.message || "An unexpected error occurred",
    };
    
    const errorObj: any = { 
      message: err.message || "Internal server error" 
    };
    
    if (err.name) {
      errorObj.name = err.name;
    }
    
    if (isDevelopment && err.stack) {
      errorObj.detail = err.stack;
    }
    
    response.error = errorObj;
    
    res.status(500).json(response);
  } catch {
    const response: IGlobalResponse = {
      status: false,
      message: "An unexpected error occurred",
      error: {
        message: "Internal server error",
        ...(isDevelopment && { detail: err.stack }),
      },
    };
    
    res.status(500).json(response);
  }
};
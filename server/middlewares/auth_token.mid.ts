import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs'; 

const JWT_KEY = process.env.JWT_KEY || "";

export interface JwtUserType {
  userId: string;
  email: string,
  name: string,
  gender: string
}

export const auth_token: RequestHandler<
  ParamsDictionary, 
  any,              
  any,              
  ParsedQs,         
  Record<string, any> 
> = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Вы не авторизованы" });
    return; 
  }

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Вы не авторизованы" });
      return; 
    }
    if (typeof decoded === "object" && decoded !== null) {
      res.locals.user = decoded as JwtUserType;
      next();
      return; 
    } else {
      res.status(401).json({ message: "Неверный формат токена" });
      return; 
    }
  });
};
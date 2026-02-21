// types/express/index.d.ts

// Получаем тип через import type-стиль внутри декларации
type JwtUserType = import("../../middlewares/auth_token.mid").JwtUserType;

declare global {
  namespace Express {
    interface Locals {
      user?: JwtUserType;
      [key: string]: any;
    }
  }
}

export {};
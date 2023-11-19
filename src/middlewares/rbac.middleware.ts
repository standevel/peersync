/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RbacMiddleware implements NestMiddleware {
  constructor(private reflector: Reflector) { }

  use(req: Request, res: Response, next: NextFunction) {
    const handlerRoles = this.reflector.get<string[]>('roles', req.route?.stack[0]?.parent?.name);
    const methodRoles = this.reflector.get<string[]>('roles', req.route?.stack[0]?.method);
    console.log('methodRoles: ', methodRoles);
    console.log('handlerRoles: ', handlerRoles);
    const requiredRoles = handlerRoles || methodRoles;

    // Fetch user roles from token or session
    const userRoles = req['user']['roles'] || [];

    const hasAccess = userRoles.some(role => requiredRoles.includes(role));

    if (hasAccess) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  }
}

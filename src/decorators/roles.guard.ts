/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/enum/user-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<UserRole[]>(
            'roles',
            context.getHandler(),
        );
        console.log('required roles: ', requiredRoles);
        if (!requiredRoles) {
            return true; // No role requirement, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Assuming user information is stored in the request

        return requiredRoles.some(role => user.roles.includes(role));
    }
}

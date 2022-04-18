import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // what is required role?

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('---> ', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    // const { user } = context.switchToHttp().getRequest(); // for authentication

    const user = {
      name: 'Mubarak',
      roles: [Role.ADMIN],
    };
    // what does the current user making request have thos required role

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}

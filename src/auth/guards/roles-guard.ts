import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../entities/user.entity';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflectors: Reflector) {}
  // we are implemet the roles-guard
  canActivate(context: ExecutionContext): boolean {
    // retrive the roles metadata set the roles decorator
    const requiredRoles = this.reflectors.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    const hasRequiredRoles = requiredRoles.some((role) => user.role === role);

    if (!hasRequiredRoles) {
      throw new ForbiddenException('Insufficient permission');
    }
    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthRequest } from '../models/AuthRequest';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Se não tiver roles exigidas, deixa passar
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    // Se for ADMIN, permite acesso a tudo
    if (user.role === Role.ADMIN) {
      return true;
    }

    const hasPermission = requiredRoles.includes(user.role as Role);

    if (!hasPermission) {
      throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
    }

    return true;
  }
}

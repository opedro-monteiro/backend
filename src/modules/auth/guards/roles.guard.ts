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

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    if (!user) throw new ForbiddenException('Usuário não autenticado.');

    if (user.role === Role.ADMIN) return true;

    // Se a rota não tiver roles definidas, exige ADMIN implicitamente
    if (!requiredRoles || requiredRoles.length === 0)
      throw new ForbiddenException('Acesso negado. Apenas ADMIN pode acessar esta rota.');

    const hasPermission = requiredRoles.includes(user.role as Role);

    if (!hasPermission) {
      throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
    }

    return true;
  }
}

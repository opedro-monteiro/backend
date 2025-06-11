import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Usuario => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);

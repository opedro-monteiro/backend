import { PrismaService } from '@database/PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    return await this.prisma.usuario.update({
      where: { id: userId },
      data: {
        refreshToken: hashedRefreshToken
      }
    })
  }
}

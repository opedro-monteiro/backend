import { PrismaService } from '@database/PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicIdGenerator {
    constructor(private readonly prisma: PrismaService) { }

    async generate(prefix: string, tenantId?: string): Promise<string> {
        const lastRecord = await this.prisma.cliente.findFirst({
            where: tenantId ? { tenantId } : {},
            orderBy: { createdAt: 'desc' },
            select: { publicId: true },
        });

        const sequentialNumber = this.getNextSequential(lastRecord?.publicId, prefix);
        return `${prefix}-${new Date().getFullYear()}-${sequentialNumber.toString().padStart(4, '0')}`;
    }

    private getNextSequential(lastPublicId: string | undefined, prefix: string): number {
        if (!lastPublicId) return 1;

        const parts = lastPublicId.split('-');
        if (parts[0] !== prefix) return 1;

        return parseInt(parts[2]) + 1;
    }
}
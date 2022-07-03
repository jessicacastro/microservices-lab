import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly prismaService: PrismaService) {}

  getPurchases() {
    return this.prismaService.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

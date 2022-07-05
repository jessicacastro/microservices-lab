import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  getStudents() {
    return this.prismaService.student.findMany();
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prismaService.student.findUnique({
      where: { authUserId },
    });
  }

  getStudentById(id: string) {
    return this.prismaService.student.findUnique({ where: { id } });
  }

  createStudent({ authUserId }: CreateStudentParams) {
    return this.prismaService.student.create({
      data: { authUserId },
    });
  }
}

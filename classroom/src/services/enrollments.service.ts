import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface getByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prismaService: PrismaService) {}

  getEnrollmentByCourseAndStudentId({
    courseId,
    studentId,
  }: getByCourseAndStudentIdParams) {
    return this.prismaService.enrollment.findFirst({
      where: { courseId, studentId, canceledAt: null },
    });
  }

  getEnrollments() {
    return this.prismaService.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getEnrollmentsByStudent(studentId: string) {
    return this.prismaService.enrollment.findMany({
      where: { studentId, canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }
}

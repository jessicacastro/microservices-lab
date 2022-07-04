import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prismaService: PrismaService) {}

  getCourses() {
    return this.prismaService.course.findMany();
  }

  getCourseById(id: string) {
    return this.prismaService.course.findUnique({ where: { id } });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const course = await this.prismaService.course.findUnique({
      where: { slug },
    });

    if (course) {
      throw new Error('Another course with same slug already exists.');
    }

    return this.prismaService.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}

import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser, AuthUser } from '../../auth/current-user';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private courseService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.courseService.getCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() { sub }: AuthUser) {
    const student = await this.studentsService.getStudentByAuthUserId(sub);

    if (!student) {
      throw new Error('Student not found.');
    }

    const enrollment =
      await this.enrollmentsService.getEnrollmentByCourseAndStudentId({
        courseId: id,
        studentId: student.id,
      });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.courseService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') { title }: CreateCourseInput) {
    return this.courseService.createCourse({ title });
  }
}

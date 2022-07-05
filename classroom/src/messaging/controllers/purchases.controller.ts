import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';

interface Customer {
  authUserId: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
}

interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(
    @Payload('value') { customer, product }: PurchaseCreatedPayload,
  ) {
    let student = await this.studentsService.getStudentByAuthUserId(
      customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: customer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(product.slug);

    if (!course) {
      course = await this.coursesService.createCourse({
        title: product.title,
        slug: product.slug,
      });
    }

    await this.enrollmentsService.createEnrollment({
      studentId: student.id,
      courseId: course.id,
    });
  }
}

import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchase';

// Name of representation of entity in GraphQL (to gateway)
@ObjectType('User')
// Tell to GraphQL what is the common key of something (user) in different microservices
@Directive('@key(fields: "authUserId")')
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}

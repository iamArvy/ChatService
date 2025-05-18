import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateGroupInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Text Content' })
  name: string;
}

@InputType()
export class AddParticipantsInput {
  @IsArray()
  @IsNotEmpty()
  @Field(() => [String], { description: 'users' })
  users: string[];
}

@ArgsType()
export class AddUsersToGroupArgs {
  @Field(() => String)
  cid: string;

  @Field(() => [String])
  users: string[];
}

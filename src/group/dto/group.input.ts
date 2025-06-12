import { IsNotEmpty, IsString } from 'class-validator';

class CreateGroupData {
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class CreateGroupInput {
  user_id: string;
  data: CreateGroupData;
}

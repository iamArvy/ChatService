import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}

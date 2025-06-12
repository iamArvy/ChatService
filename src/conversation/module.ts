import { ConversationController } from './conversation.controller';
import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [ConversationController],
  imports: [DbModule],
  providers: [ConversationService],
})
export class ConversationModule {}

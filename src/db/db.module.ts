import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { FriendRepository } from './repositories/friend.repository';
import { ConversationRepository } from './repositories/conversation.repository';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_DB_URL ||
        'mongodb://root:example@localhost:27017/auth?authSource=admin',
    ),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [PrismaService],
  exports: [FriendRepository, ConversationRepository],
})
export class DbModule {}

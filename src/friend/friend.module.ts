import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FriendService, PrismaService],
  exports: [FriendService],
})
export class FriendModule {}

import { Global, Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ParticipantService, PrismaService],
  exports: [ParticipantService],
})
@Global()
export class ParticipantModule {}

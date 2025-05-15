import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Participant, Prisma } from '@prisma/client';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ParticipantCreateInput) {
    return await this.prisma.participant.create({
      data,
    });
  }

  async createMany(
    data: Prisma.ParticipantCreateManyArgs,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.participant.createMany(data);
  }

  participants(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ParticipantWhereUniqueInput;
    where?: Prisma.ParticipantWhereInput;
    orderBy?: Prisma.ParticipantOrderByWithRelationInput;
    select?: Prisma.ParticipantSelect;
  }): Promise<Participant[] | []> {
    return this.prisma.participant.findMany(params);
  }

  participant(params: {
    where: Prisma.ParticipantWhereUniqueInput;
    select?: Prisma.ParticipantSelect;
  }): Promise<Participant | null> {
    try {
      return this.prisma.participant.findUnique(params);
    } catch (error) {
      throw new Error(error as string);
      // handlePrismaError(error, modelName);
    }
  }

  getParticipantWithUserAndConversation(
    uid: string,
    cid: string,
  ): Promise<Participant | null> {
    return this.prisma.participant.findUniqueOrThrow({
      where: {
        user_id_conversation_id: {
          user_id: uid,
          conversation_id: cid,
        },
      },
    });
  }

  update(params: {
    where: Prisma.ParticipantWhereUniqueInput;
    data: Prisma.ParticipantUpdateInput;
  }) {
    return this.prisma.participant.update(params);
  }

  async delete(
    where: Prisma.ParticipantWhereUniqueInput,
  ): Promise<Participant> {
    return this.prisma.participant.delete({
      where,
    });
  }

  async isAdmin(uid: string, cid: string): Promise<boolean> {
    const user = await this.getParticipantWithUserAndConversation(uid, cid);
    if (user?.is_admin) return true;
    return false;
  }
  // async create(data: Partial<Participant>) {
  //   return await this.participantModel.create(data);
  // }

  // participants(filters: FilterQuery<Participant>) {
  //   return this.participantModel.find(filters);
  // }

  // participant(id): Promise<ParticipantDocument | null> {
  //   try {
  //     return this.participantModel.findById(id);
  //   } catch (error) {
  //     throw new Error(error as string);
  //     // handlePrismaError(error, modelName);
  //   }
  // }

  // getParticipantWithUserAndConversation(
  //   uid: string,
  //   cid: string,
  // ): Promise<ParticipantDocument | null> {
  //   return this.participantModel.findOne({
  //     user_id: uid,
  //     conversation_id: cid,
  //   });
  // }

  // update(id: string, data: Partial<Participant>) {
  //   return this.participantModel.findByIdAndUpdate(id, data);
  // }

  // async delete(id): Promise<ParticipantDocument | null> {
  //   return this.participantModel.findByIdAndDelete(id);
  // }

  // async isAdmin(uid: string, cid: string): Promise<boolean> {
  //   const user = await this.getParticipantWithUserAndConversation(uid, cid);
  //   if (user?.isAdmin) return true;
  //   return false;
  // }
}

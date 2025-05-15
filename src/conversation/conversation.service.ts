import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Conversation } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  // private model = this.prisma.conversation;

  async create(data: Prisma.ConversationCreateInput): Promise<Conversation> {
    return await this.prisma.conversation.create({
      data,
    });
  }

  async conversations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConversationWhereUniqueInput;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput;
    select?: Prisma.ConversationSelect;
  }): Promise<Conversation[] | []> {
    return await this.prisma.conversation.findMany(params);
  }

  async conversation(params: {
    where: Prisma.ConversationWhereUniqueInput;
    select?: Prisma.ConversationSelect;
  }): Promise<Conversation | null> {
    // await this.checkIfUserInConversation(cid, uid);
    return await this.prisma.conversation.findUnique(params);
  }

  update(params: {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.ConversationUpdateInput;
  }) {
    return this.prisma.conversation.update(params);
  }

  async delete(
    where: Prisma.ConversationWhereUniqueInput,
  ): Promise<Conversation> {
    return this.prisma.conversation.delete({
      where,
    });
  }

  async isOwner(cid: string, uid: string): Promise<boolean> {
    const conversation = await this.conversation({
      where: {
        id: cid,
        creator_id: uid,
      },
    });

    if (conversation) return true;

    return false;
  }
}

import { ParticipantService } from './participant/participant.service';
import { ConversationService } from './conversation/conversation.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessageService } from './message/message.service';
import { Message } from './message/message.schema';
import { Conversation, Participant } from '@prisma/client';
import { UserService } from './user/user.service';
import { CreateGroupInput } from './conversation/conversation.input';

@Injectable()
export class AppService {
  constructor(
    private readonly participant: ParticipantService,
    private readonly message: MessageService,
    private readonly conversation: ConversationService,
    private readonly user: UserService,
  ) {}

  async startNewConversation(uid: string, rid: string): Promise<Conversation> {
    const user = await this.user.user({ where: { user_id: rid } });

    if (!user) throw new ForbiddenException('Recipient does not exist');

    const conversation = await this.conversation.create({
      participant: {
        createMany: { data: [{ user_id: uid }, { user_id: rid }] },
      },
    });

    return conversation;
  }

  async createGroup(
    uid: string,
    data: CreateGroupInput,
  ): Promise<Conversation> {
    return await this.conversation.create({
      participant: {
        create: { user_id: uid, is_admin: true },
      },
      group: true,
      creator: { connect: { user_id: uid } },
      name: data.name,
    });
  }

  async addUsersToGroup(
    uid: string,
    users: string[],
    cid: string,
  ): Promise<Conversation | null> {
    await this.participant.isAdmin(uid, cid);
    await this.participant.createMany({
      data: users.map((user_id) => ({
        user_id,
        conversation_id: cid,
      })),
    });
    return await this.conversation.conversation({ where: { id: cid } });
  }

  async sendMessage(
    cid: string,
    uid: string,
    text: string,
    rid?: string,
  ): Promise<Message> {
    await this.participant.getParticipantWithUserAndConversation(uid, cid);
    return await this.message.create({
      sender_id: uid,
      text: text,
      reply_id: rid ?? undefined,
      conversation_id: cid,
    });
  }

  async updateMessage(
    cid: string,
    mid: string,
    uid: string,
    text: string,
  ): Promise<Message | null> {
    await this.participant.getParticipantWithUserAndConversation(uid, cid);
    await this.message.isSender(mid, uid);
    return await this.message.update(mid, { text }).lean();
  }

  async deleteMessage(uid: string, mid: string, cid: string): Promise<boolean> {
    const isAdmin = await this.participant.isAdmin(uid, cid);
    const isSender = await this.message.isSender(mid, uid);

    if (!isAdmin || !isSender) throw new UnauthorizedException();
    await this.message.deleteMessage(mid);
    return true;
  }

  async getUserConversations(uid: string): Promise<Conversation[]> {
    return await this.conversation.conversations({
      where: {
        participant: {
          some: {
            user_id: uid,
          },
        },
      },
    });
  }

  async getConversation(uid: string, cid: string) {
    const inConversation =
      await this.participant.getParticipantWithUserAndConversation(uid, cid);
    if (!inConversation)
      throw new UnauthorizedException('User not in conversation');

    return await this.conversation.conversation({ where: { id: cid } });
  }

  async getConversationMessages(
    uid: string,
    cid: string,
  ): Promise<Message[] | []> {
    const inConversation =
      await this.participant.getParticipantWithUserAndConversation(uid, cid);
    if (!inConversation) throw new UnauthorizedException();
    return this.message.conversationMessages(cid);
  }

  async getConversationParticipants(
    uid: string,
    cid: string,
  ): Promise<Participant[] | []> {
    const inConversation =
      await this.participant.getParticipantWithUserAndConversation(uid, cid);
    if (!inConversation) throw new UnauthorizedException();
    return await this.participant.participants({
      where: {
        conversation_id: cid,
      },
    });
  }

  async removeUserFromGroup(
    uid: string,
    cid: string,
    pid: string,
  ): Promise<Participant> {
    const isAdmin = await this.participant.isAdmin(uid, cid);
    if (!isAdmin)
      throw new UnauthorizedException('Only Admins can remove users');
    const participant = await this.participant.participant({
      where: { id: pid },
    });
    if (!participant) throw new NotFoundException('User not found in group');
    const isOwner = await this.conversation.isOwner(cid, uid);
    if (isOwner)
      throw new UnauthorizedException('Cannot Delete Owner from group');
    return await this.participant.delete({
      id: pid,
    });
  }

  async leaveGroup(uid: string, cid: string): Promise<Participant> {
    const participant =
      await this.participant.getParticipantWithUserAndConversation(uid, cid);
    if (!participant) throw new NotFoundException();
    return await this.participant.delete({
      id: uid,
    });
  }

  async deleteGroup(uid: string, cid: string): Promise<Conversation | null> {
    const isOwner = await this.conversation.isOwner(cid, uid);
    if (!isOwner)
      throw new UnauthorizedException('Only Owners can delete groups');
    return await this.conversation.delete({
      id: cid,
    });
  }

  async makeAdmin(uid: string, cid: string, pid: string) {
    const isAdmin = await this.participant.isAdmin(uid, cid);
    if (!isAdmin)
      throw new UnauthorizedException('Only Admins can make others Admins');

    await this.participant.getParticipantWithUserAndConversation(pid, cid);

    // if (!participant) throw new NotFoundException('User not found in group');
    return await this.participant.update({
      where: { id: pid },
      data: {
        is_admin: true,
      },
    });
  }

  async removeAdmin(uid: string, cid: string, pid: string) {
    const isAdmin = await this.participant.isAdmin(uid, cid);
    if (!isAdmin)
      throw new UnauthorizedException('Only Admins can delete other admins');

    const participant = await this.participant.participant({
      where: {
        user_id_conversation_id: {
          user_id: uid,
          conversation_id: cid,
        },
      },
    });

    if (!participant) throw new NotFoundException('User not found in group');
    const isOwner = await this.conversation.isOwner(cid, uid);
    if (!isOwner)
      throw new UnauthorizedException('Owners can not be removed from admin');
    if (!participant.is_admin) return participant;
    return await this.participant.update({
      where: { id: pid, user_id: uid, conversation_id: cid },
      data: {
        is_admin: false,
      },
    });
  }

  async changeOwnership(uid: string, cid: string, pid: string) {
    const participant = await this.participant.participant({
      where: {
        user_id_conversation_id: {
          user_id: uid,
          conversation_id: cid,
        },
      },
    });

    if (!participant) throw new NotFoundException('User not found in group');

    return await this.conversation.update({
      where: {
        id: cid,
        creator_id: uid,
      },
      data: {
        creator: {
          connect: { user_id: pid },
        },
      },
    });
  }
}

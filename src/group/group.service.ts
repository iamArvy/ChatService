import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  // async create(
  //   uid: string,
  //   data: CreateGroupInput,
  // ): Promise<Conversation> {
  //   return await this.conversationRepo.createGroup(uid, data.name);
  // }
  // async deleteGroup(
  //   cid: string,
  //   is_owner: boolean,
  //   is_group: boolean,
  // ): Promise<Conversation> {
  //   if (!is_group) throw new BadRequestException('Conversation not a group');
  //   if (!is_owner)
  //     throw new UnauthorizedException('Only Owners can delete groups');
  //   return await this.prisma.conversation.delete({
  //     where: { id: cid },
  //   });
  // }
  // updateGroupInfo();
  // updateGroupVisibility();
  // async makeOwner(uid: string, id: string, pid: string, is_owner: boolean) {
  //   const conversation = this.conversationRepo.getByIdOrThrow(id);
  //   const participant = this.participantService.getConversationParticipant(
  //     uid,
  //     id,
  //   );
  //   if (!is_owner)
  //     throw new UnauthorizedException('Only Owners can change Ownership');
  //   return await this.prisma.conversation.update({
  //     where: {
  //       id: cid,
  //       creator_id: uid,
  //     },
  //     data: {
  //       creator: {
  //         connect: { user_id: pid },
  //       },
  //     },
  //   });
  // }
}

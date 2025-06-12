import { Controller } from '@nestjs/common';
// import { GrpcMethod } from '@nestjs/microservices';
// import { CreateGroupInput } from './dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private service: GroupService) {}

  // @GrpcMethod('GroupService')
  // createGroup({ user_id, data }: CreateGroupInput) {
  //   return this.service.createGroup(user_id, data);
  // }
  updateInfo() {}
  updateVisibility() {}
  // @GrpcMethod('GroupService')
  // async deleteGroup(
  //   @Req() req: Request & { user: string },
  //   @Param('cid') cid: string,
  // ) {
  //   await this.participantService.getConversationParticipant(req.user, cid);
  //   const conversation = await this.service.getConversation(cid);
  //   await this.service.deleteGroup(
  //     cid,
  //     conversation.creator_id === req.user,
  //     conversation.group ?? false,
  //   );
  //   return true;
  // }

  // @GrpcMethod('GroupService')
  // async makeOwner(
  //   @Req() req: Request & { user: string },
  //   @Param('cid') cid: string,
  //   @Param('pid') pid: string,
  // ) {
  //   await this.participantService.getConversationParticipant(req.user, cid);
  //   await this.participantService.getConversationParticipant(pid, cid);
  //   const conversation = await this.service.getConversation(req.user);
  //   await this.service.changeOwnership(
  //     req.user,
  //     cid,
  //     pid,
  //     conversation.creator_id === req.user,
  //   );
  //   return true;
  // }

  // generateInviteLink() {}
  // acceptInviteRequest() {}
  // rejectInviteRequest() {}
  // joinWithLink() {}

  // @GrpcMethod('GroupService')
  // async addUsers(
  //   @Req() req: Request & { user: string },
  //   @Param('cid') cid: string,
  //   @Body('data') data: AddParticipantsInput,
  // ) {
  //   const participant = await this.service.getConversationParticipant(
  //     req.user,
  //     cid,
  //   );
  //   const conversation = await this.conversationService.getConversation(
  //     req.user,
  //   );
  //   await this.service.addUsersToGroup(
  //     req.user,
  //     data.users,
  //     cid,
  //     participant.is_admin,
  //     conversation.group ?? false,
  //   );
  //   return true;
  // }

  // @GrpcMethod('GroupService')
  // async getParticipants(
  //   @Req() req: Request & { user: string },
  //   @Param('cid') cid: string,
  // ) {
  //   await this.service.getConversationParticipant(req.user, cid);
  //   return await this.service.getConversationParticipants(cid);
  // }

  // async makeAdmin(
  //   @Req() req: Request & { user: string },
  //   @Param('cid') cid: string,
  //   @Param('pid') pid: string,
  // ) {
  //   const user = await this.service.getConversationParticipant(req.user, cid);
  //   const participant = await this.service.getConversationParticipant(pid, cid);
  //   await this.conversationService.getConversation(cid);
  //   await this.service.makeAdmin(pid, user.is_admin, participant.is_admin);
  //   return true;
  // }

  // async removeAdmin(
  //   @Req() req: Request & { user: string },
  //   @Param('cid') cid: string,
  //   @Param('pid') pid: string,
  // ) {
  //   const user = await this.service.getConversationParticipant(req.user, cid);
  //   const participant = await this.service.getConversationParticipant(pid, cid);
  //   const conversation = await this.conversationService.getConversation(cid);
  //   await this.service.removeAdmin(
  //     pid,
  //     user.is_admin,
  //     participant.is_admin,
  //     conversation.creator_id === pid,
  //   );
  //   return true;
  // }

  // async removeUser(
  //   @Req() req: Request & { user: string },
  //   @Param('cid') cid: string,
  //   @Param('pid') pid: string,
  // ) {
  //   const user = await this.service.getConversationParticipant(req.user, cid);
  //   await this.service.getConversationParticipant(pid, cid);
  //   const conversation = await this.conversationService.getConversation(cid);
  //   return await this.service.removeUserFromGroup(
  //     cid,
  //     pid,
  //     user.is_admin,
  //     conversation.creator_id === pid,
  //   );
  // }

  // async leaveGroup(
  //   @Req() req: Request & { user: string },
  //   @Param('cid') cid: string,
  // ) {
  //   await this.service.getConversationParticipant(req.user, cid);
  //   const conversation = await this.conversationService.getConversation(cid);
  //   await this.service.leaveGroup(
  //     req.user,
  //     cid,
  //     conversation.creator_id === req.user,
  //   );
  //   return true;
  // }
}

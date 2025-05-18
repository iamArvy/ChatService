import { JwtAuthGuard } from './guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddParticipantsInput,
  CreateGroupInput,
} from './conversation/conversation.input';
import { ApiBearerAuth, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import {
  ConversationResponse,
  MessageResponse,
  ParticipantResponse,
} from './app.respose';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @ApiOkResponse({
    description: 'The created conversation',
    type: ConversationResponse,
  })
  @Post('chat/new/:id')
  async startNewConversation(
    @Req() req: Request & { user: string },
    @Param('id') recipient: string,
  ) {
    return await this.service.startNewConversation(req.user, recipient);
  }

  @ApiOkResponse({
    description: 'The created Group',
    type: ConversationResponse,
  })
  @Post('group/create')
  async createGroup(
    @Req() req: Request & { user: string },
    @Body('data') data: CreateGroupInput,
  ) {
    return await this.service.createGroup(req.user, data);
  }

  @ApiOkResponse({
    description: 'The Conversation',
    type: ConversationResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @Post('group/:cid/add_users')
  async addUsersToGroup(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
    @Body('data') data: AddParticipantsInput,
  ) {
    return await this.service.addUsersToGroup(req.user, data.users, cid);
  }

  @ApiOkResponse({
    description: 'Array of users conversation',
    type: [ConversationResponse],
  })
  @Get('conversations')
  async getConversations(@Req() req: Request & { user: string }) {
    return await this.service.getUserConversations(req.user);
  }

  @ApiOkResponse({
    description: 'The Conversation',
    type: ConversationResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @Get('chat/:cid')
  async getConversion(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
  ) {
    return await this.service.getConversation(req.user, cid);
  }

  @ApiOkResponse({
    description: 'Array of Conversation Messages',
    type: [MessageResponse],
  })
  @ApiParam({
    name: 'id',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @Get('conversation/:cid/messages')
  async getConversionMessages(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
  ) {
    return await this.service.getConversationMessages(req.user, cid);
  }

  @ApiOkResponse({
    description: 'Array of Conversation Participants',
    type: [ParticipantResponse],
  })
  @ApiParam({
    name: 'id',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @Get('group/:cid/participants')
  async getConversationParticipants(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
  ) {
    return await this.service.getConversationParticipants(req.user, cid);
  }

  @ApiOkResponse({
    description: 'Participant that was removed',
    type: ParticipantResponse,
  })
  @ApiParam({
    name: 'cid',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @ApiParam({
    name: 'pid',
    description: 'Participant ID',
    example: '6827da23872f1493c7232389',
  })
  @Delete('group/:cid/remove/:pid')
  async removeUserFromGroup(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
    @Param('pid') pid: string,
  ) {
    return await this.service.removeUserFromGroup(req.user, cid, pid);
  }

  @ApiOkResponse({
    description: 'True or False',
    type: Boolean,
  })
  @ApiParam({
    name: 'cid',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @Delete('user/leave/:cid')
  async leaveGroup(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
  ) {
    await this.service.leaveGroup(req.user, cid);
    return true;
  }

  @ApiOkResponse({
    description: 'Boolean',
    type: Boolean,
  })
  @ApiParam({
    name: 'cid',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @Delete('group/:cid/delete')
  async deleteGroup(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
  ) {
    await this.service.deleteGroup(req.user, cid);
    return true;
  }

  @ApiOkResponse({
    description: 'Boolean',
    type: Boolean,
  })
  @ApiParam({
    name: 'cid',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @ApiParam({
    name: 'pid',
    description: 'Participant ID',
    example: '6827da23872f1493c7232389',
  })
  @Post('group/:cid/make_admin/:pid')
  async makeAdmin(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
    @Param('pid') pid: string,
  ) {
    await this.service.makeAdmin(req.user, cid, pid);
    return true;
  }

  @ApiOkResponse({
    description: 'Boolean',
    type: Boolean,
  })
  @ApiParam({
    name: 'cid',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @ApiParam({
    name: 'pid',
    description: 'Participant ID',
    example: '6827da23872f1493c7232389',
  })
  @Post('group/:cid/remove_admin/:pid')
  async removeAdmin(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
    @Param('pid') pid: string,
  ) {
    await this.service.makeAdmin(req.user, cid, pid);
    return true;
  }

  @ApiOkResponse({
    description: 'Boolean',
    type: Boolean,
  })
  @ApiParam({
    name: 'cid',
    description: 'Conversation ID',
    example: '6827da23872f1493c7232389',
  })
  @ApiParam({
    name: 'pid',
    description: 'Participant ID',
    example: '6827da23872f1493c7232389',
  })
  @Post('group/:cid/change_ownership/:pid')
  async changeOwnership(
    @Req() req: Request & { user: string },
    @Param('cid') cid: string,
    @Param('pid') pid: string,
  ) {
    await this.service.changeOwnership(req.user, cid, pid);
    return true;
  }
}

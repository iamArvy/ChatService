import { Conversation, Participant } from '@prisma/client';
import { Message } from './message/message.schema';

export class ConversationResponse implements Conversation {
  id: string;
  name: string | null;
  group: boolean | null;
  creator_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export class MessageResponse implements Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  text: string;
  created_at: Date;
  updated_at: Date;
}

export class ParticipantResponse implements Participant {
  id: string;
  user_id: string;
  is_admin: boolean;
  conversation_id: string;
  created_at: Date;
  updated_at: Date;
}

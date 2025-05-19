import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { MessageModule } from 'src/message/module';
import { ParticipantModule } from 'src/participant/module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [MessageModule, ParticipantModule, JwtModule, UserModule],
  providers: [Gateway],
})
export class GatewayModule {}

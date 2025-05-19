import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/module';
import { ParticipantModule } from './participant/module';
import { MessageModule } from './message/module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './strategies';
import { ConfigModule } from '@nestjs/config';
import { FriendModule } from './friend/module';
import { GatewayModule } from './gateway/module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_DB_URL ||
        'mongodb://root:example@localhost:27017/auth?authSource=admin',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
    }),
    ConversationModule,
    MessageModule,
    ParticipantModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FriendModule,
    GatewayModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

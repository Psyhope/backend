import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ArticleModule } from './article/article.module';
import { InfograficModule } from './infografic/infografic.module';
import { EventModule } from './event/event.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/providers/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
    }),
    UserModule,
    ArticleModule,
    InfograficModule,
    EventModule,
    BookingModule,
  ],
  controllers: [AuthController, AppController],
  providers: [AppService],
})
export class AppModule { }

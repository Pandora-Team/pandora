import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./users/users.module";
import {EventsModule} from "./events/events.module";
import {PaymentsModule} from "./payments/payments.module";
import {AuthModule} from "./auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local' }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    EventsModule,
    PaymentsModule,
    JwtModule.register({
      secret: `${process.env.S_KEY}`,
      signOptions: {expiresIn: '60s'}
    }),
  ],
})
export class AppModule {}

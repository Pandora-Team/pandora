import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./auth.controller";
import {JwtStrategy} from "./jwt.strategy";
import {UsersModule} from "../users/users.module";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: `${configService.get<string>('JWT_EXPIRES_IN')}s`},
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: function(req) {
                var token = null;
                if (req && req.cookies)
                {
                    token = req.cookies['at'];
                }
                return token;
            },
            ignoreExpiration: false,
            secretOrKey: `${process.env.S_KEY}`,
        });
    }

    async validate(payload: any) {
        return {
            id:   payload._id,
        }
    }
}
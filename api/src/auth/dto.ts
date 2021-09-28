export class RegisterDto {
    readonly name: string;
    readonly phone: string;
    readonly pass: string;
}

export class LoginDto {
    readonly phone: string;
    readonly pass: string;
}
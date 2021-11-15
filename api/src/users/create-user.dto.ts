export class CreateUserDto {
    readonly pass: string;
    readonly name: string;
    readonly phone: string;
    role?: string;
    readonly birthday?: string;
    avatar?: string;
    readonly surname: string
}
export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly name: string;
    readonly phone?: string;
    role?: string;
    readonly birthday: string;
}
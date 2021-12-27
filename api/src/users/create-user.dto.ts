export class CreateUserDto {
    readonly pass: string;
    readonly name: string;
    readonly phone: string;
    role?: string;
    readonly birthday?: string;
    avatar?: string;
    readonly surname: string
    readonly reg_date?: string
    readonly visit_date?: string
    vk?: string
    telegram?: string
    instagram?: string
}

export class UpdateUserDto {
    readonly vk?: string
    readonly telegram?: string
    readonly instagram?: string
    readonly name?: string
    readonly surname?: string
    readonly birthday?: string
}
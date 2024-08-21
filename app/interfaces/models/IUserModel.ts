export interface IUserModel {
    id: number,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    imageUrl?: string,
    state?: number
}
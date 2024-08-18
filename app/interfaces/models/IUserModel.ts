export interface IUserModel {
    id: number,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    image_url?: string,
    state?: number
}
export interface IUserModel {
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    image_url?: string,
    state?: number
}
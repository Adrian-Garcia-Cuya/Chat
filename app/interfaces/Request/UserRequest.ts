import { Request } from "express";
import User from "../../models/userModel";

export interface validatedUser extends Request {
    id: string,
    user: User
}
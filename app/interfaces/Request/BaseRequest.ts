import { Request } from "express";
import User from "../../models/userModel";

export interface BaseRequest<P, A, B, Q> extends Request<P, A, B, Q> {
    id?: string,
    user?: User
}
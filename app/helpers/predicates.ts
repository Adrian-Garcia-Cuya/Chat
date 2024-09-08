import { Payload } from "../types/auth/Payload";
import jwt from 'jsonwebtoken';

const isPayload = ( payload: jwt.JwtPayload|string|Payload ): payload is Payload => {
    return (payload as Payload).userId !== undefined;
}

const isString = ( word: string | string[] | undefined ): word is string => {
    return typeof word === 'string';
}

export {
    isPayload,
    isString
}
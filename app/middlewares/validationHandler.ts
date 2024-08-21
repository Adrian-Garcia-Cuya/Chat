import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import User from "../models/userModel";
import { ContactRequest } from "../interfaces/Request/Contact/IContactRequest";
import Friend from "../models/friendModel";

const checkValidationErrors = ( req: Request, res: Response, next: NextFunction ): void => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    
    next();
}

const checkContactExistence = async( req: ContactRequest, res: Response, next: NextFunction ): Promise<void> => {

    const phoneNumber = req.body.phoneNumber ?? req.params.phoneNumber;

    try {
        const friend = await User.findOne({ where: { phone_number: phoneNumber } });
        if (!friend) {
            res.status(404).json({
                msg: `El usuario con el número ${phoneNumber} no existe.`
            });
            return;
        }
        if (friend.state === 2) {
            res.status(403).json({
                msg: `El número ${phoneNumber} tiene la cuenta inactiva.`
            });
            return;
        }

        req.friendId = friend.id;
        next();
    } catch ( error ) {
        console.error( error );
        next( error );
    }
}

const checkContactIsFriend = async( req: ContactRequest, res: Response, next: NextFunction ): Promise<void> => {

    try {
        const isFriend = await Friend.findOne({
                where: {
                    user_id: req.id,
                    friend_id: req.friendId
                }
            }
        );
        if ( isFriend ) {
            res.status(403).json({
                msg: 'Ya tienes registrado a este contacto.'
            });
            return;
        }
        next();
    } catch ( error ) {
        console.log( error );
        next( error );
    }
}

export {
    checkValidationErrors,
    checkContactExistence,
    checkContactIsFriend
};
import { Response } from "express";
import Friend from "../models/friendModel";
import { ContactRequest } from "../interfaces/Request/Contact/IContactRequest";

const store = async ( req: ContactRequest, res: Response): Promise<void> => {

    const friendId = req.friendId!;
    const userId = req.id!;
    try {
        await Friend.create({
            user_id: userId,
            friend_id: friendId
        });

        res.status(200).json({
            message: 'Registro exitoso.',
        });
        return;
    } catch( error: any ) {
        res.status(400).json({
            message: error.message
        });
        return;
    }
}

const destroy = async( req: ContactRequest, res: Response ): Promise<void> => {
    
    const friendId = req.friendId!;
    const userId = req.id!;

    try {
        const [ affectedRows ] = await Friend.update(
            { state: 2 },
            { where: {
                user_id: userId,
                friend_id: friendId
            }}
        );

        if ( affectedRows === 0 ) {
            res.status(404).json({
                message: 'No tienes agregado a este usuario.'
            });
            return;
        }

        res.status(200).json({
            message: 'Bloqueado con exito.'
        });
        return;
    } catch ( error: any ) {
        console.error( error );
        res.status(400).json({
            message: error.message
        });
        return;
    }
}

export {
    store,
    destroy
}
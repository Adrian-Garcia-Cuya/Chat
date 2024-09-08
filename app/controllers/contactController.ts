import { Response } from "express";
import Friend from "../models/friendModel";
import { ContactRequest } from "../interfaces/Request/Contact/IContactRequest";
import FriendConfiguration from "../models/friendConfigurationModel";
import User from "../models/userModel";

const index = async (req: ContactRequest, res: Response): Promise<void> => {
    try {
        const { user } = req;

        if ( !user ) {
            throw new Error( 'Acceso denegado.' );
        }

        const friends: Friend[] = await Friend.findAll({
            where: {
                user_id: user.id
            }
        });

        if ( !friends ) {
            res.status(404).json({ 
                msg: 'No hay amigos registrados'
            });
            return;
        }

        const listFriends = await Promise.all(
            friends.map( async ( friend ) => {
                const friendConfiguration = await FriendConfiguration.findByPk( friend.id );
                const user = await User.findByPk( friend.friend_id, {
                    attributes: ['id', 'name', 'phoneNumber', 'image_url']
                } );
                return { friend, user, friendConfiguration }
                
            })
            
        );
        

        res.status(200).json({ listFriends });
        return;
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ 
            msg: 'Internal Server Error'
        });
    }
}

const store = async ( req: ContactRequest, res: Response): Promise<void> => {

    const friendId = req.friendId!;
    const userId = req.id!;
    try {
        await Friend.create({
            user_id: userId,
            friend_id: friendId
        });

        res.status(200).json({
            msg: 'Registro exitoso.',
        });
        return;
    } catch( error: any ) {
        res.status(400).json({
            msg: error.message
        });
        return;
    }
}

const destroy = async( req: ContactRequest, res: Response ): Promise<void> => {
    
    const friendId = req.friendId;
    const userId = req.id;

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
            msg: error.message
        });
        return;
    }
}

export {
    index,
    store,
    destroy
}
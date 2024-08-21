import { Payload } from '../types/auth/Payload';
import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import User from '../models/userModel';
import { BaseRequest } from '../interfaces/Request/BaseRequest';

const checkJWT = async( req: BaseRequest<{},{},{},{}>, res: Response, next: NextFunction ): Promise<void> => {

    const token = req.header('x-token');
    if( !token ) {
        res.status(401).json({
            msg: 'No hay ningun token en la solicitud.'
        });
        return;
    }

    try {
        const secretKey: Secret|undefined = process.env.SECRET_KEY
        if ( !secretKey ) {
            res.status(401).json({
                msg: 'La llave secreta no está definida.'
            });
            return;
        }
        
        const payload = jwt.verify( token, secretKey );
        if ( !isPayload(payload) ){
            res.status(404).json({
                msg: 'No se encontró el id del usuario en el payload.'
            });
            return;
        }
        const userId = payload.userId;

        const user = await User.findByPk( userId );
        if ( !user ) {
            res.status(401).json({
                msg: 'Token invalido/ Usuario no existe.'
            });
            return;
        }
        if ( !user.state ) {
            res.status(401).json({
                msg: 'Esta cuenta esta desactivada.'
            });
            return;
        }
        
        req.id = userId;
        req.user = user;

        next();
        
    } catch( error ){
        console.error( error );
        res.status(401).json({
            msg: 'Token no valido.'
        });
    }
}

const isPayload = ( payload: jwt.JwtPayload|string|Payload ): payload is Payload => {
    return (payload as Payload).userId !== undefined;
}

export {
    checkJWT
}
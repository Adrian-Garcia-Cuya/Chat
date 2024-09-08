import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';

import User from '../models/userModel';
import { BaseRequest } from '../interfaces/Request/BaseRequest';
import { isPayload } from '../helpers/predicates';

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

export {
    checkJWT
}